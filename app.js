const models = [
  {
    name: "MSE1",
    capacity: 12,
    perTurn: 0.25,
    guide: "MSE1은 1회 회전당 0.25 mm 기준으로 기록합니다. 병원 안내에 따라 하루 권장 회전수를 초과하지 않도록 합니다.",
  },
  {
    name: "MSE2",
    capacity: 10,
    perTurn: 0.20,
    guide: "MSE2는 정해진 시간에 균등하게 회전하고, 회전 후 압박감과 통증을 함께 기록합니다.",
  },
  {
    name: "NEW MSE2",
    capacity: 11,
    perTurn: 0.20,
    guide: "NEW MSE2는 미세 조절이 필요한 모델입니다. 회전수와 증상 메모를 매일 남기는 것을 권장합니다.",
  },
  {
    name: "MSE3",
    capacity: 13,
    perTurn: 0.25,
    guide: "MSE3는 확장량 여유가 큰 모델입니다. 누적 확장량을 확인하며 병원 지시에 맞춰 진행합니다.",
  },
  {
    name: "KBE",
    capacity: 8,
    perTurn: 0.18,
    guide: "KBE는 모델 특성상 1회 확장량이 작게 계산됩니다. 불편감 발생 시 사진과 함께 보고합니다.",
  },
  {
    name: "KBE2",
    capacity: 9,
    perTurn: 0.18,
    guide: "KBE2는 KBE 대비 총 확장 가능량이 증가한 모델입니다. 좌우 압박감 차이를 메모해 주세요.",
  },
];

const patients = [
  ["MSE-2408-017", "MSE1", "3.75 mm", "오늘"],
  ["MSE2-2408-022", "MSE2", "2.40 mm", "어제"],
  ["KBE-2409-031", "KBE", "1.62 mm", "오늘"],
  ["MSE3-2410-006", "MSE3", "5.00 mm", "3일 전"],
  ["NMSE-2410-014", "NEW MSE2", "2.80 mm", "오늘"],
];

let selectedModel = models[0];
let selectedPain = 2;
let baseExpansion = 3.25;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const modelList = $("#model-list");
const painButtons = $("#pain-buttons");
const tableBody = $("#patient-table-body");

function formatMm(value) {
  return `${value.toFixed(2)} mm`;
}

function setToday() {
  const today = new Date();
  $("#record-date").value = today.toISOString().slice(0, 10);
}

function renderModels() {
  modelList.innerHTML = models
    .map(
      (model) => `
        <button class="model-option ${model.name === selectedModel.name ? "active" : ""}" type="button" data-model="${model.name}">
          <strong>${model.name}</strong>
          <span>${model.perTurn.toFixed(2)} mm / 회전</span>
        </button>
      `,
    )
    .join("");
}

function renderPainButtons() {
  painButtons.innerHTML = [1, 2, 3, 4, 5]
    .map((level) => `<button class="pain-button ${level === selectedPain ? "active" : ""}" type="button" data-pain="${level}">${level}</button>`)
    .join("");
}

function renderPatients() {
  tableBody.innerHTML = patients
    .map(
      ([code, model, total, latest]) => `
        <tr>
          <td>${code}</td>
          <td>${model}</td>
          <td>${total}</td>
          <td>${latest}</td>
        </tr>
      `,
    )
    .join("");
}

function updateModelDetails() {
  $("#capacity-text").textContent = `${selectedModel.capacity.toFixed(1)} mm`;
  $("#model-guide").textContent = selectedModel.guide;
  renderModels();
  updateExpansion();
}

function updateExpansion() {
  const sessionCount = Number($("#session-count").value || 0);
  const turnCount = Number($("#turn-count").value || 0);
  const todayExpansion = sessionCount * turnCount * selectedModel.perTurn;
  $("#today-expansion").textContent = formatMm(todayExpansion);
  $("#total-expansion").textContent = formatMm(baseExpansion + todayExpansion);
}

function showScreen(screenId) {
  $$(".screen").forEach((screen) => screen.classList.toggle("active", screen.id === screenId));
  const activeScreen = $(`#${screenId}`);
  $("#screen-title").textContent = activeScreen.dataset.title;

  const stepIndex = ["login-screen", "model-screen", "record-screen", "report-screen"].indexOf(screenId);
  $$(".progress-dot").forEach((dot, index) => dot.classList.toggle("active", index <= stepIndex));
  $$(".bottom-nav button").forEach((button) => button.classList.toggle("active", button.dataset.next === screenId));
}

function showMode(mode) {
  $$(".mode-tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.mode === mode));
  $$("[data-panel]").forEach((panel) => panel.classList.toggle("hidden", panel.dataset.panel !== mode));
}

document.addEventListener("click", (event) => {
  const nextButton = event.target.closest("[data-next]");
  if (nextButton) {
    showScreen(nextButton.dataset.next);
  }

  const modelButton = event.target.closest("[data-model]");
  if (modelButton) {
    selectedModel = models.find((model) => model.name === modelButton.dataset.model);
    updateModelDetails();
  }

  const painButton = event.target.closest("[data-pain]");
  if (painButton) {
    selectedPain = Number(painButton.dataset.pain);
    renderPainButtons();
  }

  const modeTab = event.target.closest("[data-mode]");
  if (modeTab) {
    showMode(modeTab.dataset.mode);
  }
});

$("#session-count").addEventListener("input", updateExpansion);
$("#turn-count").addEventListener("input", updateExpansion);

$("#reset-button").addEventListener("click", () => {
  showScreen("login-screen");
  $("#report-status").textContent = "사진과 메시지는 병원 서버 또는 지정 이메일로 전송됩니다.";
});

$("#save-record").addEventListener("click", () => {
  baseExpansion = Number($("#total-expansion").textContent.replace(" mm", ""));
  $("#save-record").textContent = "저장 완료";
  window.setTimeout(() => {
    $("#save-record").textContent = "기록 저장";
  }, 1200);
});

$("#send-report").addEventListener("click", () => {
  $("#report-status").textContent = "전송 완료: 병원 관리자 수신함에 보고가 등록되었습니다.";
});

setToday();
renderModels();
renderPainButtons();
renderPatients();
updateModelDetails();
showScreen("login-screen");
