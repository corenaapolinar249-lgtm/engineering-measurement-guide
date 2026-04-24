const SITE_EXPIRE_AT = new Date("2026-07-01T23:59:59+08:00");

function showExpiredPage() {
  document.body.innerHTML = `
    <div style="
      min-height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      padding:24px;
      font-family:'Microsoft YaHei','PingFang SC',Arial,sans-serif;
      background:linear-gradient(180deg,#eef5fb,#dfeaf6);
    ">
      <div style="
        width:min(680px,96vw);
        background:#ffffff;
        border:1px solid #d9e4ef;
        border-radius:24px;
        box-shadow:0 14px 40px rgba(25,59,102,.12);
        padding:36px 28px;
        text-align:center;
        color:#143a67;
      ">
        <h1 style="margin:0 0 14px;font-size:32px;">工程测量实验指导</h1>
        <p style="margin:0;font-size:18px;line-height:1.9;">本站使用期限已到，当前不可继续访问。</p>
      </div>
    </div>
  `;
}

if (new Date() > SITE_EXPIRE_AT) {
  showExpiredPage();
  throw new Error("Site expired");
}

function openFile(path) {
  const normalizedPath = encodeURI(path);
  const isPdf = /\.pdf$/i.test(path);

  if (isPdf) {
    window.location.href = `viewer_image.html?file=${encodeURIComponent(path)}`;
    return;
  }

  window.open(normalizedPath, "_blank");
}

const modalOverlay = document.getElementById("modalOverlay");
const modal = document.getElementById("modal");

function showModal(html, onClose) {
  modal.innerHTML = html;
  modalOverlay.classList.remove("hidden");

  const closeHandler = () => {
    modalOverlay.classList.add("hidden");
    modal.innerHTML = "";
    if (typeof onClose === "function") onClose();
  };

  modalOverlay.onclick = (e) => {
    if (e.target === modalOverlay) closeHandler();
  };

  return closeHandler;
}

function hardCloseModal() {
  modalOverlay.classList.add("hidden");
  modal.innerHTML = "";
  modalOverlay.onclick = null;
}

function askOpenPdf(exp) {
  const close = showModal(`
    <h2>是否查看实验指导？</h2>
    <div class="btn-row">
      <button class="action-btn" id="yesPdf">是</button>
      <button class="action-btn secondary" id="noPdf">否</button>
    </div>
  `);

  document.getElementById("yesPdf").onclick = () => {
    close();
    openFile(exp.guide);
  };
  document.getElementById("noPdf").onclick = () => {
    close();
  };
}

function showVideoPlayer(exp, video, backToChooser) {
  if (video.external) {
    const embedUrl = "https://player.bilibili.com/player.html?bvid=BV1fgoVBGEWH&page=1";

    const close = showModal(`
      <h2>${video.title}</h2>
      <div class="video-area" style="position:relative;padding-top:56.25%;overflow:hidden;border-radius:16px;">
        <iframe
          src="${embedUrl}"
          title="${video.title}"
          style="position:absolute;inset:0;width:100%;height:100%;border:0;border-radius:16px;background:#000;"
          allowfullscreen="true">
        </iframe>
      </div>
      <div class="btn-row">
        <button class="action-btn" id="backChoose">返回</button>
        <button class="action-btn secondary" id="goPdfDirect">实验指导</button>
      </div>
    `);

    document.getElementById("backChoose").onclick = () => {
      close();
      backToChooser();
    };
    document.getElementById("goPdfDirect").onclick = () => {
      close();
      openFile(exp.guide);
    };
    return;
  }

  const close = showModal(`
    <h2>${video.title}</h2>
    <div class="video-area">
      <video controls autoplay>
        <source src="${encodeURI(video.file)}" type="video/mp4">
        您的浏览器不支持 video 标签。
      </video>
    </div>
    <div class="btn-row">
      <button class="action-btn" id="backChoose">返回</button>
      <button class="action-btn secondary" id="goPdfDirect">实验指导</button>
    </div>
  `);

  document.getElementById("backChoose").onclick = () => {
    close();
    backToChooser();
  };
  document.getElementById("goPdfDirect").onclick = () => {
    close();
    openFile(exp.guide);
  };
}

function showVideoChooser(exp) {
  const close = showModal(`
    <h2>请选择视频</h2>
    <div class="choice-list">
      ${exp.videos.map((v, idx) => `<button class="choice-btn" data-idx="${idx}">${v.title}</button>`).join("")}
    </div>
    <div class="btn-row">
      <button class="action-btn" id="goPdf">实验指导</button>
      <button class="action-btn secondary" id="cancelChoose">取消</button>
    </div>
  `);

  document.querySelectorAll(".choice-btn").forEach(btn => {
    btn.onclick = () => {
      const idx = Number(btn.dataset.idx);
      close();
      showVideoPlayer(exp, exp.videos[idx], () => showVideoChooser(exp));
    };
  });

  document.getElementById("goPdf").onclick = () => {
    close();
    openFile(exp.guide);
  };
  document.getElementById("cancelChoose").onclick = () => {
    close();
    askOpenPdf(exp);
  };
}

function askWatchVideo(exp) {
  showModal(`
    <h2>是否观看视频？</h2>
    <div class="btn-row">
      <button class="action-btn" id="yesVideo">是</button>
      <button class="action-btn secondary" id="noVideo">否</button>
    </div>
  `, () => askOpenPdf(exp));

  document.getElementById("yesVideo").onclick = () => {
    hardCloseModal();
    if ((exp.videos || []).length > 1) {
      showVideoChooser(exp);
    } else {
      showVideoPlayer(exp, exp.videos[0], () => showVideoChooser(exp));
    }
  };

  document.getElementById("noVideo").onclick = () => {
    hardCloseModal();
    askOpenPdf(exp);
  };
}

function buildRows() {
  const container = document.getElementById("expRows");
  experiments.forEach(exp => {
    const row = document.createElement("div");
    row.className = "resource-row row-grid";
    row.innerHTML = `
      <div class="cell label">实验${exp.id}</div>
      <button class="btn btn--main fill-btn">${exp.name}</button>
      <button class="btn btn--side guide-btn">${exp.videos ? "实验指导 / 视频" : "实验指导"}</button>
    `;

    row.querySelector(".fill-btn").onclick = () => openFile(exp.fill);
    row.querySelector(".guide-btn").onclick = () => {
      if (exp.videos) askWatchVideo(exp);
      else openFile(exp.guide);
    };

    container.appendChild(row);
  });
}

document.getElementById("topMapBtn").onclick = () => openFile(topControlMap);
document.getElementById("bottomKnownBtn").onclick = () => openFile(bottomKnownPoints);
buildRows();
