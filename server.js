<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>DCM — บันทึกการตัดสินใจฝ่ายบริหาร</title>
<style>
:root {
  --dark:#1A1A2E; --orange:#E07B39; --orange-l:#F5E6D8;
  --green:#2D7A4F; --green-l:#D4EDDA;
  --red:#C0392B;   --red-l:#FDE8E6;
  --yellow-l:#FFF9E6; --blue-l:#EBF5FB;
  --bg:#F4F5F7; --surface:#fff; --surface2:#F8F9FA;
  --border:#E0E2E6; --text:#1A1A2E; --grey:#5F6B7A; --muted:#9AA3AE;
  --radius:8px; --shadow:0 1px 3px rgba(0,0,0,.08);
  --shadow-md:0 4px 12px rgba(0,0,0,.12);
}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Tahoma','Segoe UI',sans-serif;background:var(--bg);color:var(--text);font-size:14px;line-height:1.6}

/* HEADER */
.header{background:var(--dark);color:#fff;padding:0 24px;display:flex;align-items:center;justify-content:space-between;height:56px;position:sticky;top:0;z-index:50;box-shadow:var(--shadow-md)}
.header-logo{display:flex;align-items:center;gap:10px;font-weight:700;font-size:15px}
.badge-dcm{background:var(--orange);color:#fff;padding:3px 8px;border-radius:4px;font-size:12px;font-weight:700;letter-spacing:1px}
.clock{font-size:13px;color:#a0aec0;font-variant-numeric:tabular-nums}
.live-label{font-size:12px;color:#48bb78;font-weight:600;display:flex;align-items:center;gap:5px}
.live-dot{width:8px;height:8px;background:#48bb78;border-radius:50%;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}

/* TABS */
.container{max-width:1200px;margin:0 auto;padding:20px 16px}
.tabs{display:flex;gap:0;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:4px;margin-bottom:20px;box-shadow:var(--shadow)}
.tab{flex:1;padding:9px 12px;border:none;background:none;border-radius:6px;cursor:pointer;font-size:13px;font-family:inherit;color:var(--grey);font-weight:500;transition:all .15s;display:flex;align-items:center;justify-content:center;gap:6px}
.tab:hover{background:var(--bg);color:var(--text)}
.tab.active{background:var(--dark);color:#fff}
.tab svg{width:16px;height:16px;flex-shrink:0}
.section{display:none}.section.active{display:block}

/* CARD */
.card{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:20px;margin-bottom:16px;box-shadow:var(--shadow)}
.card-title{font-size:14px;font-weight:700;color:var(--dark);margin-bottom:16px;display:flex;align-items:center;gap:8px;padding-bottom:10px;border-bottom:2px solid var(--orange)}
.sec-badge{background:var(--orange);color:#fff;padding:2px 10px;border-radius:20px;font-size:11px;font-weight:700}

/* FORM */
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.form-grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
.form-grid-4{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:12px}
@media(max-width:700px){.form-grid,.form-grid-3,.form-grid-4{grid-template-columns:1fr}}
.field{display:flex;flex-direction:column;gap:4px}
.field.full{grid-column:1/-1}
label{font-size:11px;font-weight:700;color:var(--grey);text-transform:uppercase;letter-spacing:.5px}
input,select,textarea{width:100%;padding:9px 12px;font-size:14px;font-family:inherit;border:1px solid var(--border);border-radius:var(--radius);background:var(--surface2);color:var(--text);transition:border-color .15s,box-shadow .15s}
input:focus,select:focus,textarea:focus{outline:none;border-color:var(--orange);box-shadow:0 0 0 3px rgba(224,123,57,.15)}
input.highlight,select.highlight{background:var(--yellow-l);border-color:var(--orange);font-weight:700}
select.mgr-highlight{background:var(--orange-l);border-color:var(--dark)}
textarea{resize:vertical;min-height:80px}
.pct-display{background:var(--blue-l);border:1px solid #bee3f8;border-radius:var(--radius);padding:9px 12px;font-size:15px;font-weight:700;color:var(--dark);text-align:center}

/* PHOTO UPLOAD */
.photo-drop{border:2px dashed var(--border);border-radius:10px;padding:24px;text-align:center;cursor:pointer;background:var(--surface2);transition:all .2s;position:relative}
.photo-drop:hover,.photo-drop.drag-over{border-color:var(--orange);background:var(--orange-l)}
.photo-drop svg{width:40px;height:40px;color:var(--muted);margin-bottom:8px}
.photo-drop p{color:var(--grey);font-size:13px}
.photo-drop input[type=file]{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%}
.photo-preview{position:relative;display:inline-block}
.photo-preview img{max-height:200px;max-width:100%;border-radius:8px;border:2px solid var(--border)}
.photo-preview .remove-photo{position:absolute;top:-8px;right:-8px;background:var(--red);color:#fff;border:none;border-radius:50%;width:22px;height:22px;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center}

/* ALIGNMENT BOX */
.alignment-box{padding:12px 16px;border-radius:8px;font-weight:700;font-size:14px;text-align:center;margin-top:4px}
.alignment-box.match{background:var(--green-l);color:var(--green);border:1px solid #b2dfcc}
.alignment-box.mismatch{background:var(--red-l);color:var(--red);border:1px solid #f5b7b1}
.alignment-box.pending{background:var(--blue-l);color:#2b7eb0;border:1px solid #bee3f8}

/* BUTTONS */
.btn{display:inline-flex;align-items:center;gap:6px;padding:9px 18px;font-size:14px;font-family:inherit;font-weight:600;border:1px solid var(--border);border-radius:var(--radius);cursor:pointer;background:var(--surface);color:var(--text);transition:all .15s}
.btn:hover{background:var(--bg)}
.btn.primary{background:var(--orange);color:#fff;border-color:var(--orange)}
.btn.primary:hover{background:#c96a2a}
.btn.success{background:var(--green);color:#fff;border-color:var(--green)}
.btn.danger{background:none;color:var(--red);border-color:var(--red)}
.btn.danger:hover{background:var(--red-l)}
.btn.sm{padding:5px 12px;font-size:12px}
.btn svg{width:15px;height:15px}
.btn-row{display:flex;gap:8px;justify-content:flex-end;margin-top:16px;flex-wrap:wrap}

/* STATS */
.stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px}
@media(max-width:700px){.stat-row{grid-template-columns:repeat(2,1fr)}}
.stat{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:16px;text-align:center;box-shadow:var(--shadow)}
.stat-num{font-size:32px;font-weight:700;line-height:1;margin-bottom:4px}
.stat-label{font-size:11px;color:var(--grey);font-weight:600}
.stat.total .stat-num{color:var(--dark)}
.stat.ok .stat-num{color:var(--green)}
.stat.bad .stat-num{color:var(--red)}
.stat.warn .stat-num{color:#b7770d}

/* FILTERS */
.filter-row{display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap;align-items:center}
.filter-row input,.filter-row select{flex:1;min-width:130px;max-width:200px;padding:8px 10px;font-size:13px}
.filter-row .btn.sm{flex-shrink:0}

/* RECORDS LIST */
.record-card{background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:14px 16px;margin-bottom:10px;box-shadow:var(--shadow);transition:box-shadow .15s}
.record-card:hover{box-shadow:var(--shadow-md)}
.record-card.mismatch{border-left:4px solid var(--red)}
.record-card.match{border-left:4px solid var(--green)}
.record-card.pending{border-left:4px solid #5dade2}
.rec-header{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:10px}
.rec-title{font-size:15px;font-weight:700}
.rec-meta{display:flex;flex-wrap:wrap;gap:6px;font-size:12px;color:var(--grey);margin-top:4px}
.chip{background:var(--surface2);border:1px solid var(--border);border-radius:4px;padding:2px 8px;display:inline-flex;align-items:center;gap:3px}
.badge{display:inline-flex;align-items:center;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700}
.badge.match{background:var(--green-l);color:var(--green)}
.badge.mismatch{background:var(--red-l);color:var(--red)}
.badge.pending{background:var(--blue-l);color:#2b7eb0}
.rec-photo{margin-top:10px}
.rec-photo img{max-height:140px;border-radius:6px;border:1px solid var(--border);cursor:pointer;transition:transform .2s}
.rec-photo img:hover{transform:scale(1.03)}
.rec-expand{font-size:12px;color:var(--orange);cursor:pointer;margin-top:8px;display:inline-flex;align-items:center;gap:4px}
.rec-detail{display:none;margin-top:10px;padding-top:10px;border-top:1px solid var(--border)}
.rec-detail.open{display:block}
.detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:13px}
@media(max-width:600px){.detail-grid{grid-template-columns:1fr}}
.detail-row{display:flex;flex-direction:column;gap:2px}
.detail-lbl{font-size:11px;font-weight:700;color:var(--grey);text-transform:uppercase}
.detail-val{color:var(--text)}
.rec-actions{display:flex;gap:6px;margin-top:10px;justify-content:flex-end}

/* BREAKDOWN TABLE */
.breakdown-table{width:100%;border-collapse:collapse;font-size:13px}
.breakdown-table th{background:var(--dark);color:#fff;padding:8px 10px;text-align:center;font-size:12px}
.breakdown-table th:first-child{text-align:left}
.breakdown-table td{padding:7px 10px;border-bottom:1px solid var(--border);text-align:center}
.breakdown-table td:first-child{font-weight:700;text-align:left;background:var(--surface2)}
.breakdown-table tr:hover td{background:var(--orange-l)}
.breakdown-table .total-row td{background:var(--dark);color:#fff;font-weight:700}

/* EMPTY */
.empty{text-align:center;padding:40px 20px;color:var(--muted)}
.empty svg{width:48px;height:48px;margin-bottom:12px;opacity:.3}

/* MODAL */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;z-index:200;padding:16px}
.modal{background:var(--surface);border-radius:12px;padding:24px;width:100%;max-width:380px;box-shadow:0 20px 60px rgba(0,0,0,.2);animation:modalIn .2s ease}
@keyframes modalIn{from{transform:scale(.95);opacity:0}to{transform:scale(1);opacity:1}}
.modal h3{font-size:16px;font-weight:700;margin-bottom:16px}

/* LIGHTBOX */
.lightbox{position:fixed;inset:0;background:rgba(0,0,0,.88);display:flex;align-items:center;justify-content:center;z-index:300;cursor:zoom-out}
.lightbox img{max-width:90vw;max-height:90vh;border-radius:8px}

/* TOAST */
.toast-container{position:fixed;bottom:20px;right:20px;z-index:400;display:flex;flex-direction:column;gap:8px}
.toast{background:var(--dark);color:#fff;padding:12px 18px;border-radius:8px;font-size:13px;font-weight:500;box-shadow:var(--shadow-md);animation:toastIn .3s ease;display:flex;align-items:center;gap:8px;max-width:300px}
.toast.success{background:var(--green)}.toast.error{background:var(--red)}
@keyframes toastIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}

/* SPINNER */
.spinner{width:20px;height:20px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin 1s linear infinite;display:inline-block}
@keyframes spin{to{transform:rotate(360deg)}}
.loading-overlay{display:none;position:fixed;inset:0;background:rgba(255,255,255,.7);z-index:100;align-items:center;justify-content:center}
.loading-overlay.show{display:flex}
.loading-box{background:var(--dark);color:#fff;padding:20px 32px;border-radius:12px;display:flex;align-items:center;gap:12px;font-size:14px}

hr{border:none;border-top:1px solid var(--border);margin:16px 0}
.section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.section-header h2{font-size:16px;font-weight:700;color:var(--dark)}
</style>
</head>
<body>

<header class="header">
  <div class="header-logo">
    <span class="badge-dcm">DCM</span>
    บันทึกการตัดสินใจฝ่ายบริหาร
  </div>
  <div style="display:flex;align-items:center;gap:12px">
    <span class="live-label"><span class="live-dot"></span>LIVE</span>
    <span class="clock" id="clock">--:--:--</span>
  </div>
</header>

<div class="loading-overlay" id="loading">
  <div class="loading-box"><div class="spinner"></div>กำลังโหลด...</div>
</div>

<div class="container">

  <div class="tabs">
    <button class="tab active" onclick="switchTab('form')">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
      บันทึกใหม่
    </button>
    <button class="tab" onclick="switchTab('search')">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
      ค้นหา / ย้อนหลัง
    </button>
    <button class="tab" onclick="switchTab('dashboard')">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
      Dashboard
    </button>
  </div>

  <!-- ===== FORM ===== -->
  <div id="tab-form" class="section active">

    <!-- Section A -->
    <div class="card">
      <div class="card-title"><span class="sec-badge">A</span> ข้อมูลเอกสาร | Document Info</div>
      <div class="form-grid-4">
        <div class="field"><label>เลขที่เอกสาร / Doc No.</label><input id="f-docNo" placeholder="DCM-QC-2026-001"></div>
        <div class="field"><label>วันที่ / Date</label><input type="date" id="f-date"></div>
        <div class="field"><label>กะ / Shift</label>
          <select id="f-shift"><option value="">— เลือก —</option><option>Day</option><option>Night</option></select></div>
        <div class="field"><label>Model / Part No.</label><input id="f-model" placeholder="เช่น 7303"></div>
        <div class="field"><label>Line / สถานีงาน</label><input id="f-line" placeholder="Line A"></div>
        <div class="field"><label>Lot No.</label><input id="f-lotNo"></div>
        <div class="field"><label>Qty พบปัญหา (pcs)</label><input type="number" id="f-qtyDefect" min="0" value="0" oninput="calcPct()"></div>
        <div class="field"><label>NCR Ref. No.</label><input id="f-ncrRef"></div>
      </div>
    </div>

    <!-- Section B -->
    <div class="card">
      <div class="card-title"><span class="sec-badge">B</span> ประเภทงานเสีย | Defect Category</div>
      <div class="form-grid-4">
        <div class="field">
          <label>ประเภทงานเสีย *</label>
          <select id="f-defectCategory" class="highlight">
            <option value="">— เลือกประเภท —</option>
            <option>ตัดสาย</option><option>ขั้วต่อ MC</option><option>SR</option>
            <option>เชื่อมสาย/บัดกรี</option><option>สวมท่ออบ</option>
            <option>ฉลาก</option><option>พันสาย</option>
          </select>
        </div>
        <div class="field"><label>Defect Type / ลักษณะ NG</label><input id="f-defectType" placeholder="เช่น Crimp Height NG"></div>
        <div class="field"><label>Qty NG (pcs)</label><input type="number" id="f-qtyNG" min="0" value="0" oninput="calcPct()"></div>
        <div class="field"><label>% Defect</label><div class="pct-display" id="pct-display">0.0%</div></div>
        <div class="field full"><label>รายละเอียดปัญหา / Problem Description</label>
          <textarea id="f-problemDesc" placeholder="อธิบายลักษณะปัญหาที่พบ..."></textarea></div>
      </div>
    </div>

    <!-- Section C -->
    <div class="card">
      <div class="card-title"><span class="sec-badge">C</span> รูปภาพหลักฐาน (Before) | Evidence Photo</div>
      <div id="photo-drop-area" class="photo-drop" onclick="document.getElementById('photo-input').click()">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
        <p>คลิกหรือลากรูปภาพมาวางที่นี่<br><small style="color:var(--muted)">JPG, PNG, WEBP — ไม่เกิน 8 MB</small></p>
        <input type="file" id="photo-input" accept="image/*" style="display:none" onchange="previewPhoto(this)">
      </div>
      <div id="photo-preview-wrap" style="margin-top:12px;display:none">
        <div class="photo-preview">
          <img id="photo-preview-img" src="" alt="preview">
          <button class="remove-photo" onclick="removePhoto()">✕</button>
        </div>
      </div>
    </div>

    <!-- Section D -->
    <div class="card">
      <div class="card-title"><span class="sec-badge">D</span> การตัดสินใจพนักงาน | Employee Decision</div>
      <div class="form-grid-4">
        <div class="field"><label>ชื่อพนักงาน *</label><input id="f-empName"></div>
        <div class="field"><label>รหัสพนักงาน</label><input id="f-empId" placeholder="EMP001"></div>
        <div class="field"><label>แผนก / Dept</label>
          <select id="f-empDept">
            <option value="">— เลือก —</option>
            <option>QC / QE</option><option>IQC</option><option>IPQC</option>
            <option>OQC</option><option>Production</option><option>อื่นๆ</option>
          </select></div>
        <div class="field"><label>ตำแหน่ง / Position</label><input id="f-empPosition"></div>
        <div class="field full">
          <label>การตัดสินใจของพนักงาน *</label>
          <select id="f-empDecision" class="highlight" onchange="updateAlignment()">
            <option value="">— เลือกการตัดสินใจ —</option>
            <option>ใช้งานต่อ (Use As-Is)</option><option>Rework / แก้ไข</option>
            <option>Scrap / ทิ้ง</option><option>Hold / รอตัดสินใจ</option>
            <option>ส่งคืน Supplier</option>
          </select>
        </div>
        <div class="field full"><label>Remark พนักงาน</label><input id="f-empRemark"></div>
      </div>
    </div>

    <!-- Section E -->
    <div class="card">
      <div class="card-title"><span class="sec-badge">E</span> การตัดสินใจฝ่ายบริหาร | Management Decision</div>
      <div class="form-grid-4">
        <div class="field"><label>ชื่อผู้บริหาร *</label><input id="f-mgrName"></div>
        <div class="field"><label>ตำแหน่ง / Position</label><input id="f-mgrPosition"></div>
        <div class="field"><label>วันที่ตัดสินใจ</label><input type="date" id="f-decisionDate"></div>
        <div class="field"><label>วันที่เกิดปัญหา</label><input type="date" id="f-problemDate"></div>
        <div class="field full">
          <label>การตัดสินใจของฝ่ายบริหาร *</label>
          <select id="f-mgrDecision" class="mgr-highlight" onchange="updateAlignment()">
            <option value="">— เลือกการตัดสินใจ —</option>
            <option>ใช้งานต่อ (Use As-Is)</option><option>Rework / แก้ไข</option>
            <option>Scrap / ทิ้ง</option><option>Hold / รอตัดสินใจ</option>
            <option>ส่งคืน Supplier</option>
          </select>
        </div>
        <div class="field full"><label>Remark ผู้บริหาร</label><input id="f-mgrRemark"></div>
        <div class="field full">
          <label>ผลเปรียบเทียบ / Alignment Result</label>
          <div id="alignment-display" class="alignment-box pending">— กรุณาเลือกการตัดสินใจทั้งสองฝ่าย —</div>
        </div>
      </div>
      <div class="btn-row">
        <button class="btn" onclick="clearForm()">ล้างข้อมูล</button>
        <button class="btn primary" onclick="submitRecord()">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:15px;height:15px"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          บันทึก
        </button>
      </div>
    </div>
  </div>

  <!-- ===== SEARCH ===== -->
  <div id="tab-search" class="section">
    <div class="card">
      <div class="card-title">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:18px;height:18px;color:var(--orange)"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        เงื่อนไขการค้นหา
      </div>
      <div class="filter-row">
        <input id="s-search" placeholder="🔍 ค้นหา ชื่อ / Doc No. / Lot / อุปกรณ์" oninput="searchRecords()">
        <select id="s-defect" onchange="searchRecords()">
          <option value="">ประเภทงานเสียทั้งหมด</option>
          <option>ตัดสาย</option><option>ขั้วต่อ MC</option><option>SR</option>
          <option>เชื่อมสาย/บัดกรี</option><option>สวมท่ออบ</option>
          <option>ฉลาก</option><option>พันสาย</option>
        </select>
        <select id="s-mgrDecision" onchange="searchRecords()">
          <option value="">การตัดสินใจผู้บริหารทั้งหมด</option>
          <option>ใช้งานต่อ (Use As-Is)</option><option>Rework / แก้ไข</option>
          <option>Scrap / ทิ้ง</option><option>Hold / รอตัดสินใจ</option>
          <option>ส่งคืน Supplier</option>
        </select>
        <select id="s-alignment" onchange="searchRecords()">
          <option value="">Alignment ทั้งหมด</option>
          <option value="✅ ตรงกัน">✅ ตรงกัน</option>
          <option value="⚠ ไม่ตรงกัน">⚠ ไม่ตรงกัน</option>
        </select>
        <select id="s-shift" onchange="searchRecords()">
          <option value="">กะทั้งหมด</option>
          <option>Day</option><option>Night</option>
        </select>
        <button class="btn sm" onclick="clearSearch()">ล้าง</button>
      </div>
    </div>
    <div class="section-header">
      <h2>ผลการค้นหา (<span id="search-count">0</span> รายการ)</h2>
    </div>
    <div id="search-list"></div>
  </div>

  <!-- ===== DASHBOARD ===== -->
  <div id="tab-dashboard" class="section">
    <div class="stat-row">
      <div class="stat total"><div class="stat-num" id="d-total">—</div><div class="stat-label">รายการทั้งหมด</div></div>
      <div class="stat ok"><div class="stat-num" id="d-aligned">—</div><div class="stat-label">✅ ตรงกัน</div></div>
      <div class="stat bad"><div class="stat-num" id="d-misaligned">—</div><div class="stat-label">⚠ ไม่ตรงกัน</div></div>
      <div class="stat warn"><div class="stat-num" id="d-pending">—</div><div class="stat-label">รอตัดสินใจ</div></div>
    </div>
    <div class="card">
      <div class="card-title">สรุปตามประเภทงานเสีย | Breakdown by Defect Type</div>
      <div style="overflow-x:auto"><table class="breakdown-table" id="breakdown-table">
        <thead><tr>
          <th>ประเภทงานเสีย</th><th>รวม</th><th>✅ ตรงกัน</th><th>⚠ ไม่ตรงกัน</th>
          <th>Use As-Is</th><th>Rework</th><th>Scrap</th><th>Hold</th><th>ส่งคืน</th>
        </tr></thead>
        <tbody id="breakdown-body"><tr><td colspan="9" style="padding:20px;color:var(--muted);text-align:center">กำลังโหลด...</td></tr></tbody>
      </table></div>
    </div>
  </div>

</div>

<!-- ADMIN MODAL -->
<div class="modal-overlay" id="modal" style="display:none" onclick="if(event.target===this)closeModal()">
  <div class="modal">
    <h3>🔐 ยืนยัน Admin</h3>
    <div class="field" style="margin-bottom:12px">
      <label>รหัส Admin</label>
      <input type="password" id="admin-pass" placeholder="กรอกรหัส" maxlength="8"
             onkeydown="if(event.key==='Enter')confirmAdmin()">
      <div id="admin-err" style="color:var(--red);font-size:12px;margin-top:4px;display:none"></div>
    </div>
    <div class="btn-row">
      <button class="btn" onclick="closeModal()">ยกเลิก</button>
      <button class="btn primary" onclick="confirmAdmin()">ยืนยัน</button>
    </div>
  </div>
</div>

<!-- LIGHTBOX -->
<div class="lightbox" id="lightbox" style="display:none" onclick="closeLightbox()">
  <img id="lightbox-img" src="" alt="photo">
</div>

<!-- TOAST -->
<div class="toast-container" id="toast-container"></div>

<script>
// ── State ────────────────────────────────────────────────────
let pendingAction = null;
let photoFile = null;
let allRecords = [];

// ── Clock ────────────────────────────────────────────────────
function updateClock(){document.getElementById('clock').textContent=new Date().toLocaleTimeString('th-TH',{hour12:false})}
setInterval(updateClock,1000); updateClock();

// ── Loading ──────────────────────────────────────────────────
function showLoading(){document.getElementById('loading').classList.add('show')}
function hideLoading(){document.getElementById('loading').classList.remove('show')}

// ── Tabs ─────────────────────────────────────────────────────
function switchTab(t){
  ['form','search','dashboard'].forEach((tab,i)=>{
    document.querySelectorAll('.tab')[i].classList.toggle('active',tab===t);
    document.getElementById('tab-'+tab).classList.toggle('active',tab===t);
  });
  if(t==='search') searchRecords();
  if(t==='dashboard') loadDashboard();
}

// ── % Defect ─────────────────────────────────────────────────
function calcPct(){
  const total=parseFloat(document.getElementById('f-qtyDefect').value)||0;
  const ng=parseFloat(document.getElementById('f-qtyNG').value)||0;
  const pct=total>0?(ng/total*100).toFixed(1)+'%':'0.0%';
  document.getElementById('pct-display').textContent=pct;
}

// ── Alignment preview ────────────────────────────────────────
function updateAlignment(){
  const emp=document.getElementById('f-empDecision').value;
  const mgr=document.getElementById('f-mgrDecision').value;
  const el=document.getElementById('alignment-display');
  if(!emp||!mgr){el.className='alignment-box pending';el.textContent='— กรุณาเลือกการตัดสินใจทั้งสองฝ่าย —'}
  else if(emp===mgr){el.className='alignment-box match';el.textContent='✅ ตรงกัน — '+mgr}
  else{el.className='alignment-box mismatch';el.textContent='⚠ ไม่ตรงกัน  |  พนักงาน: '+emp+'   |   ผู้บริหาร: '+mgr}
}

// ── Photo ────────────────────────────────────────────────────
function previewPhoto(input){
  if(!input.files||!input.files[0])return;
  photoFile=input.files[0];
  const reader=new FileReader();
  reader.onload=e=>{
    document.getElementById('photo-preview-img').src=e.target.result;
    document.getElementById('photo-preview-wrap').style.display='block';
    document.getElementById('photo-drop-area').style.display='none';
  };
  reader.readAsDataURL(photoFile);
}
function removePhoto(){
  photoFile=null;
  document.getElementById('photo-input').value='';
  document.getElementById('photo-preview-wrap').style.display='none';
  document.getElementById('photo-drop-area').style.display='block';
}

// Drag & drop
const dropArea=document.getElementById('photo-drop-area');
['dragover','dragleave','drop'].forEach(ev=>{
  dropArea.addEventListener(ev,e=>{
    e.preventDefault();
    if(ev==='dragover')dropArea.classList.add('drag-over');
    else dropArea.classList.remove('drag-over');
    if(ev==='drop'&&e.dataTransfer.files[0]){
      document.getElementById('photo-input').files=e.dataTransfer.files;
      previewPhoto(document.getElementById('photo-input'));
    }
  });
});

// ── SUBMIT ───────────────────────────────────────────────────
async function submitRecord(){
  const required=[
    ['f-defectCategory','ประเภทงานเสีย'],
    ['f-empName','ชื่อพนักงาน'],
    ['f-empDecision','การตัดสินใจพนักงาน'],
    ['f-mgrName','ชื่อผู้บริหาร'],
    ['f-mgrDecision','การตัดสินใจฝ่ายบริหาร'],
  ];
  for(const[id,label]of required){
    if(!document.getElementById(id).value.trim()){
      showToast('กรุณากรอก: '+label,'error'); return;
    }
  }
  showLoading();
  try{
    const fd=new FormData();
    const fields=['docNo','date','shift','model','line','lotNo','qtyDefect','ncrRef',
      'defectCategory','defectType','qtyNG','problemDesc',
      'empName','empId','empDept','empPosition','empDecision','empRemark',
      'mgrName','mgrPosition','mgrDecision','mgrRemark','decisionDate','problemDate'];
    fields.forEach(f=>{
      const el=document.getElementById('f-'+f);
      if(el) fd.append(f, el.value||'');
    });
    if(photoFile) fd.append('photo', photoFile);
    const r=await fetch('/api/records',{method:'POST',body:fd});
    const data=await r.json();
    if(!r.ok) throw new Error(data.error||'Error');
    showToast('บันทึกสำเร็จ','success');
    clearForm();
    switchTab('search');
  }catch(e){showToast('Error: '+e.message,'error')}
  finally{hideLoading()}
}

// ── CLEAR FORM ───────────────────────────────────────────────
function clearForm(){
  ['docNo','date','shift','model','line','lotNo','qtyDefect','ncrRef',
   'defectCategory','defectType','qtyNG','problemDesc',
   'empName','empId','empDept','empPosition','empDecision','empRemark',
   'mgrName','mgrPosition','mgrDecision','mgrRemark','decisionDate','problemDate'
  ].forEach(f=>{
    const el=document.getElementById('f-'+f);
    if(el){el.value=el.type==='number'?'0':'';}
  });
  removePhoto();
  calcPct();
  updateAlignment();
}

// ── SEARCH ───────────────────────────────────────────────────
async function searchRecords(){
  showLoading();
  try{
    const params=new URLSearchParams();
    const search=document.getElementById('s-search').value.trim();
    const defect=document.getElementById('s-defect').value;
    const mgrDec=document.getElementById('s-mgrDecision').value;
    const align=document.getElementById('s-alignment').value;
    const shift=document.getElementById('s-shift').value;
    if(search) params.set('search',search);
    if(defect) params.set('defectCategory',defect);
    if(mgrDec) params.set('mgrDecision',mgrDec);
    if(align)  params.set('alignment',align);
    if(shift)  params.set('shift',shift);
    const r=await fetch('/api/records?'+params);
    allRecords=await r.json();
    renderSearch(allRecords);
  }catch(e){showToast('โหลดข้อมูลไม่ได้: '+e.message,'error')}
  finally{hideLoading()}
}

function clearSearch(){
  ['s-search','s-defect','s-mgrDecision','s-alignment','s-shift'].forEach(id=>{
    document.getElementById(id).value='';
  });
  searchRecords();
}

function renderSearch(records){
  document.getElementById('search-count').textContent=records.length;
  const el=document.getElementById('search-list');
  if(!records.length){
    el.innerHTML=`<div class="empty">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      <p>ไม่พบข้อมูลที่ตรงกับเงื่อนไข</p></div>`;
    return;
  }
  el.innerHTML=records.map(r=>recordCardHTML(r)).join('');
}

function recordCardHTML(r){
  const alignClass=r.alignment.includes('✅')?'match':r.alignment.includes('⚠')?'mismatch':'pending';
  const badgeClass=alignClass;
  const badgeText=r.alignment.includes('✅')?'✅ ตรงกัน':r.alignment.includes('⚠')?'⚠ ไม่ตรงกัน':'⏳ รอตัดสินใจ';
  const pct=r.qtyDefect>0?((r.qtyNG/r.qtyDefect)*100).toFixed(1)+'%':'—';
  const photoSrc = r.photoPath && (r.photoPath.startsWith('http') ? r.photoPath : '');
  const photoHTML = photoSrc
    ? `<div class="rec-photo"><img src="${photoSrc}" alt="Before" onclick="openLightbox('${photoSrc}')" title="คลิกเพื่อขยาย"></div>`
    : '<div style="font-size:12px;color:var(--muted);margin-top:6px">ไม่มีรูปภาพ</div>';

  return `<div class="record-card ${alignClass}">
    <div class="rec-header">
      <div>
        <div class="rec-title">${esc(r.defectCategory||'—')} ${r.defectType?'— '+esc(r.defectType):''}</div>
        <div class="rec-meta">
          <span class="chip">📄 ${esc(r.docNo||'—')}</span>
          <span class="chip">📅 ${esc(r.date||'—')} ${esc(r.shift||'')}</span>
          <span class="chip">🏭 ${esc(r.model||'—')} | ${esc(r.line||'—')}</span>
          <span class="chip">📦 Lot: ${esc(r.lotNo||'—')}</span>
          <span class="chip">NG: ${r.qtyNG||0}/${r.qtyDefect||0} pcs (${pct})</span>
        </div>
      </div>
      <span class="badge ${badgeClass}">${badgeText}</span>
    </div>

    ${photoHTML}

    <div class="rec-expand" onclick="toggleDetail('${r.id}')">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:14px;height:14px"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
      ดูรายละเอียด
    </div>
    <div class="rec-detail" id="detail-${r.id}">
      <div class="detail-grid">
        <div class="detail-row"><span class="detail-lbl">ชื่อพนักงาน</span><span class="detail-val">${esc(r.empName||'—')} (${esc(r.empId||'—')}) — ${esc(r.empDept||'—')}</span></div>
        <div class="detail-row"><span class="detail-lbl">การตัดสินใจพนักงาน</span><span class="detail-val" style="font-weight:700;color:var(--orange)">${esc(r.empDecision||'—')}</span></div>
        <div class="detail-row"><span class="detail-lbl">Remark พนักงาน</span><span class="detail-val">${esc(r.empRemark||'—')}</span></div>
        <div class="detail-row"><span class="detail-lbl">ชื่อผู้บริหาร</span><span class="detail-val">${esc(r.mgrName||'—')} — ${esc(r.mgrPosition||'—')}</span></div>
        <div class="detail-row"><span class="detail-lbl">การตัดสินใจผู้บริหาร</span><span class="detail-val" style="font-weight:700;color:var(--dark)">${esc(r.mgrDecision||'—')}</span></div>
        <div class="detail-row"><span class="detail-lbl">Remark ผู้บริหาร</span><span class="detail-val">${esc(r.mgrRemark||'—')}</span></div>
        <div class="detail-row"><span class="detail-lbl">NCR Ref.</span><span class="detail-val">${esc(r.ncrRef||'—')}</span></div>
        <div class="detail-row"><span class="detail-lbl">วันที่ตัดสินใจ</span><span class="detail-val">${esc(r.decisionDate||'—')}</span></div>
        <div class="detail-row full"><span class="detail-lbl">รายละเอียดปัญหา</span><span class="detail-val">${esc(r.problemDesc||'—')}</span></div>
        <div class="detail-row full">
          <span class="detail-lbl">Alignment Result</span>
          <div class="alignment-box ${alignClass}" style="margin-top:4px">${esc(r.alignment)}</div>
        </div>
      </div>
      <div class="rec-actions">
        <button class="btn danger sm" onclick="doDelete('${r.id}')">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width:14px;height:14px"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          ลบ
        </button>
      </div>
    </div>
  </div>`;
}

function toggleDetail(id){
  const el=document.getElementById('detail-'+id);
  el.classList.toggle('open');
}

// ── DELETE ───────────────────────────────────────────────────
function doDelete(id){pendingAction={type:'delete',id};showModal()}

// ── DASHBOARD ────────────────────────────────────────────────
async function loadDashboard(){
  showLoading();
  try{
    const r=await fetch('/api/stats');
    const data=await r.json();
    document.getElementById('d-total').textContent=data.total;
    document.getElementById('d-aligned').textContent=data.aligned;
    document.getElementById('d-misaligned').textContent=data.misaligned;
    document.getElementById('d-pending').textContent=data.pending;

    const DEFECTS=['ตัดสาย','ขั้วต่อ MC','SR','เชื่อมสาย/บัดกรี','สวมท่ออบ','ฉลาก','พันสาย'];
    const byDef=Object.fromEntries((data.byDefect||[]).map(d=>[d._id,d.count]));

    // Need per-defect detailed stats: fetch all records once
    const allR=await fetch('/api/records?');
    const recs=await allR.json();

    const tbody=document.getElementById('breakdown-body');
    let rows='';
    let totals={total:0,match:0,mis:0,uas:0,rework:0,scrap:0,hold:0,ret:0};

    DEFECTS.forEach(def=>{
      const defRecs=recs.filter(r=>r.defectCategory===def);
      const total=defRecs.length;
      const match=defRecs.filter(r=>r.alignment.includes('✅')).length;
      const mis=defRecs.filter(r=>r.alignment.includes('⚠')).length;
      const uas=defRecs.filter(r=>(r.mgrDecision||'').includes('Use As-Is')).length;
      const rework=defRecs.filter(r=>(r.mgrDecision||'').includes('Rework')).length;
      const scrap=defRecs.filter(r=>(r.mgrDecision||'').includes('Scrap')).length;
      const hold=defRecs.filter(r=>(r.mgrDecision||'').includes('Hold')).length;
      const ret=defRecs.filter(r=>(r.mgrDecision||'').includes('Supplier')).length;
      totals.total+=total; totals.match+=match; totals.mis+=mis;
      totals.uas+=uas; totals.rework+=rework; totals.scrap+=scrap;
      totals.hold+=hold; totals.ret+=ret;
      rows+=`<tr>
        <td>${esc(def)}</td><td>${total}</td><td style="color:var(--green)">${match}</td>
        <td style="color:var(--red)">${mis}</td><td>${uas}</td><td>${rework}</td>
        <td>${scrap}</td><td>${hold}</td><td>${ret}</td></tr>`;
    });
    rows+=`<tr class="total-row"><td>รวมทั้งหมด</td><td>${totals.total}</td>
      <td>${totals.match}</td><td>${totals.mis}</td><td>${totals.uas}</td>
      <td>${totals.rework}</td><td>${totals.scrap}</td><td>${totals.hold}</td><td>${totals.ret}</td></tr>`;
    tbody.innerHTML=rows||'<tr><td colspan="9" style="padding:20px;color:var(--muted);text-align:center">ยังไม่มีข้อมูล</td></tr>';
  }catch(e){showToast('โหลด Dashboard ไม่ได้','error')}
  finally{hideLoading()}
}

// ── MODAL ────────────────────────────────────────────────────
function showModal(){
  document.getElementById('admin-pass').value='';
  document.getElementById('admin-err').style.display='none';
  document.getElementById('modal').style.display='flex';
  setTimeout(()=>document.getElementById('admin-pass').focus(),100);
}
function closeModal(){document.getElementById('modal').style.display='none';pendingAction=null}
async function confirmAdmin(){
  const pass=document.getElementById('admin-pass').value;
  const errEl=document.getElementById('admin-err');
  if(!pass){errEl.textContent='กรุณากรอกรหัส';errEl.style.display='block';return}
  closeModal();
  if(!pendingAction)return;
  const{type,id}=pendingAction; pendingAction=null;
  if(type==='delete'){
    showLoading();
    try{
      const r=await fetch('/api/records/'+id,{method:'DELETE',headers:{'Content-Type':'application/json','x-admin-pass':pass},body:JSON.stringify({adminPass:pass})});
      const data=await r.json();
      if(!r.ok)throw new Error(data.error||'Error');
      showToast('ลบรายการแล้ว','success');
      searchRecords();
    }catch(e){showToast('Error: '+e.message,'error')}
    finally{hideLoading()}
  }
}

// ── LIGHTBOX ─────────────────────────────────────────────────
function openLightbox(src){
  document.getElementById('lightbox-img').src=src;
  document.getElementById('lightbox').style.display='flex';
}
function closeLightbox(){document.getElementById('lightbox').style.display='none'}

// ── TOAST ────────────────────────────────────────────────────
function showToast(msg,type='info'){
  const t=document.createElement('div');
  t.className=`toast ${type==='success'?'success':type==='error'?'error':''}`;
  t.textContent=msg;
  document.getElementById('toast-container').appendChild(t);
  setTimeout(()=>{t.style.animation='none';t.style.opacity='0';t.style.transform='translateX(100%)';setTimeout(()=>t.remove(),300)},3000);
}

// ── ESCAPE HTML ──────────────────────────────────────────────
function esc(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',()=>{
  const today=new Date().toISOString().split('T')[0];
  document.getElementById('f-date').value=today;
  document.getElementById('f-decisionDate').value=today;
});
</script>
</body>
</html>
