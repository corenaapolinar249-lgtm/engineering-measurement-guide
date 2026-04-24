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
    const close = showModal(`
      <h2>${video.title}</h2>
      <div class="btn-row">
        <button class="action-btn" id="openExternalVideo">打开视频</button>
        <button class="action-btn" id="backChoose">返回</button>
        <button class="action-btn secondary" id="goPdfDirect">实验指导</button>
      </div>
    `);

    document.getElementById("openExternalVideo").onclick = () => {
      window.open(video.file, "_blank");
    };
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
