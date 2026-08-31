const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },

  // Section A: Document Info
  docNo:      { type: String, default: '' },
  date:       { type: String, default: '' },
  shift:      { type: String, default: '' },
  model:      { type: String, default: '' },
  line:       { type: String, default: '' },
  lotNo:      { type: String, default: '' },
  qtyDefect:  { type: Number, default: 0 },
  ncrRef:     { type: String, default: '' },

  // Section B: Defect
  defectCategory: { type: String, default: '' },
  defectType:     { type: String, default: '' },
  qtyNG:          { type: Number, default: 0 },
  problemDesc:    { type: String, default: '' },

  // Section C: Photo
  photoPath:  { type: String, default: '' },

  // Section D: Employee Decision
  empName:     { type: String, default: '' },
  empId:       { type: String, default: '' },
  empDept:     { type: String, default: '' },
  empPosition: { type: String, default: '' },
  empDecision: { type: String, default: '' },
  empRemark:   { type: String, default: '' },

  // Section E: Management Decision
  mgrName:     { type: String, default: '' },
  mgrPosition: { type: String, default: '' },
  mgrDecision: { type: String, default: '' },
  mgrRemark:   { type: String, default: '' },
  decisionDate:{ type: String, default: '' },
  problemDate: { type: String, default: '' },

  // Computed
  alignment:  { type: String, default: '' },
  createdAt:  { type: Date, default: Date.now },
}, { timestamps: false });

module.exports = mongoose.model('Decision', recordSchema);
