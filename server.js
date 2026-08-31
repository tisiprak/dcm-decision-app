require('dotenv').config();
const express    = require('express');
const mongoose   = require('mongoose');
const multer     = require('multer');
const path       = require('path');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const rateLimit  = require('express-rate-limit');
const Record     = require('./models/Record');

const app  = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASS = process.env.ADMIN_PASS || '1234';
const MONGO_URI  = process.env.MONGO_URI  || '';

// ── Cloudinary config ────────────────────────────────────────
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ── Middleware ────────────────────────────────────────────────
app.set('trust proxy', 1);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/', rateLimit({ windowMs: 60_000, max: 120, validate: { xForwardedForHeader: false } }));

// ── Multer + Cloudinary storage ───────────────────────────────
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'dcm-decision',
    allowed_formats: ['jpg','jpeg','png','webp','gif'],
    transformation: [{ width: 1200, crop: 'limit', quality: 'auto' }],
  },
});
const upload = multer({ storage, limits: { fileSize: 8 * 1024 * 1024 } });

// ── MongoDB ───────────────────────────────────────────────────
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// ── Auth helper ───────────────────────────────────────────────
function checkAdmin(req, res) {
  const pass = req.body?.adminPass || req.headers['x-admin-pass'] || '';
  if (pass !== ADMIN_PASS) { res.status(403).json({ error: 'รหัส Admin ไม่ถูกต้อง' }); return false; }
  return true;
}

// ── ROUTES ────────────────────────────────────────────────────
app.get('/api/records', async (req, res) => {
  try {
    const { defectCategory, mgrDecision, alignment, shift, empName, mgrName, docNo, search } = req.query;
    const q = {};
    if (defectCategory && defectCategory !== '(ทั้งหมด)') q.defectCategory = defectCategory;
    if (mgrDecision    && mgrDecision    !== '(ทั้งหมด)') q.mgrDecision    = mgrDecision;
    if (alignment      && alignment      !== '(ทั้งหมด)') q.alignment      = new RegExp(alignment === '✅ ตรงกัน' ? '✅' : '⚠', 'i');
    if (shift          && shift          !== '(ทั้งหมด)') q.shift          = shift;
    if (empName) q.empName = new RegExp(empName, 'i');
    if (mgrName) q.mgrName = new RegExp(mgrName, 'i');
    if (docNo)   q.docNo   = new RegExp(docNo,   'i');
    if (search)  q.$or = [
      { docNo: new RegExp(search,'i') },{ empName: new RegExp(search,'i') },
      { mgrName: new RegExp(search,'i') },{ defectCategory: new RegExp(search,'i') },
      { defectType: new RegExp(search,'i') },{ lotNo: new RegExp(search,'i') },
    ];
    const records = await Record.find(q).sort({ createdAt: -1 }).limit(500);
    res.json(records);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/records/:id', async (req, res) => {
  try {
    const r = await Record.findOne({ id: req.params.id });
    if (!r) return res.status(404).json({ error: 'Not found' });
    res.json(r);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/records', upload.single('photo'), async (req, res) => {
  try {
    const b = req.body;
    const empDec = b.empDecision || '';
    const mgrDec = b.mgrDecision || '';
    const alignment = !empDec || !mgrDec ? '— รอการตัดสินใจ'
                    : empDec === mgrDec   ? `✅ ตรงกัน — ${mgrDec}`
                    : `⚠ ไม่ตรงกัน | พนักงาน: ${empDec} | ผู้บริหาร: ${mgrDec}`;
    const rec = new Record({
      id: Date.now().toString() + Math.random().toString(36).slice(2,6),
      docNo: b.docNo||'', date: b.date||'', shift: b.shift||'',
      model: b.model||'', line: b.line||'', lotNo: b.lotNo||'',
      qtyDefect: Number(b.qtyDefect)||0, ncrRef: b.ncrRef||'',
      defectCategory: b.defectCategory||'', defectType: b.defectType||'',
      qtyNG: Number(b.qtyNG)||0, problemDesc: b.problemDesc||'',
      photoPath: req.file ? req.file.path : '',
      photoPublicId: req.file ? req.file.filename : '',
      empName: b.empName||'', empId: b.empId||'', empDept: b.empDept||'',
      empPosition: b.empPosition||'', empDecision: empDec, empRemark: b.empRemark||'',
      mgrName: b.mgrName||'', mgrPosition: b.mgrPosition||'',
      mgrDecision: mgrDec, mgrRemark: b.mgrRemark||'',
      decisionDate: b.decisionDate||'', problemDate: b.problemDate||'',
      alignment,
    });
    await rec.save();
    res.json({ ok: true, id: rec.id });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.delete('/api/records/:id', async (req, res) => {
  if (!checkAdmin(req, res)) return;
  try {
    const rec = await Record.findOne({ id: req.params.id });
    if (!rec) return res.status(404).json({ error: 'Not found' });
    // ลบรูปจาก Cloudinary
    if (rec.photoPublicId) {
      await cloudinary.uploader.destroy(rec.photoPublicId).catch(() => {});
    }
    await Record.deleteOne({ id: req.params.id });
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/stats', async (req, res) => {
  try {
    const total      = await Record.countDocuments();
    const aligned    = await Record.countDocuments({ alignment: /✅/ });
    const misaligned = await Record.countDocuments({ alignment: /⚠/ });
    const pending    = await Record.countDocuments({ alignment: /รอ/ });
    const byDefect   = await Record.aggregate([
      { $group: { _id: '$defectCategory', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json({ total, aligned, misaligned, pending, byDefect });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
