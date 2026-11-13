const modeButtons = [...document.querySelectorAll(".mode")];
const imagePanel = document.getElementById("imagePanel");
const promptInput = document.getElementById("prompt");
const counter = document.getElementById("counter");
const imageInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("imagePreview");
const previewImg = document.getElementById("previewImg");
const formMessage = document.getElementById("formMessage");
const jobs = document.getElementById("jobs");
const emptyState = document.getElementById("emptyState");
const jobCount = document.getElementById("jobCount");
let currentMode = "text";
let selectedImage = null;
let projectNumber = 0;

modeButtons.forEach(button => button.addEventListener("click", () => {
  currentMode = button.dataset.mode;
  modeButtons.forEach(item => {
    const active = item === button;
    item.classList.toggle("active", active);
    item.setAttribute("aria-selected", String(active));
  });
  imagePanel.classList.toggle("hidden", currentMode !== "image");
}));

promptInput.addEventListener("input", () => {
  counter.textContent = `${promptInput.value.length}/1200`;
});

imageInput.addEventListener("change", () => {
  const file = imageInput.files?.[0];
  if (!file) return;
  if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
    formMessage.textContent = "Formato não suportado. Escolha PNG, JPG ou WEBP.";
    imageInput.value = "";
    return;
  }
  if (file.size > 10 * 1024 * 1024) {
    formMessage.textContent = "A imagem ultrapassa o limite de 10 MB.";
    imageInput.value = "";
    return;
  }
  selectedImage = file;
  previewImg.src = URL.createObjectURL(file);
  imagePreview.classList.remove("hidden");
  formMessage.textContent = "";
});

document.getElementById("removeImage").addEventListener("click", () => {
  if (previewImg.src.startsWith("blob:")) URL.revokeObjectURL(previewImg.src);
  selectedImage = null;
  imageInput.value = "";
  previewImg.removeAttribute("src");
  imagePreview.classList.add("hidden");
});

document.getElementById("generateBtn").addEventListener("click", () => {
  const prompt = promptInput.value.trim();
  if (!prompt) {
    formMessage.textContent = "Escreva uma descrição antes de preparar o projeto.";
    promptInput.focus();
    return;
  }
  if (currentMode === "image" && !selectedImage) {
    formMessage.textContent = "Envie uma imagem para usar o modo Imagem → Vídeo.";
    return;
  }

  projectNumber += 1;
  const duration = document.getElementById("duration").value;
  const resolution = document.getElementById("resolution").value;
  const title = prompt.length > 58 ? prompt.slice(0, 58) + "…" : prompt;
  const card = document.createElement("article");
  card.className = "job";
  const top = document.createElement("div");
  top.className = "job-top";
  const titleEl = document.createElement("span");
  titleEl.className = "job-title";
  titleEl.textContent = `Projeto ${projectNumber}: ${title}`;
  const state = document.createElement("span");
  state.className = "job-state";
  state.textContent = "Rascunho";
  const meta = document.createElement("div");
  meta.className = "job-meta";
  meta.textContent = `${currentMode === "text" ? "Texto → Vídeo" : "Imagem → Vídeo"} · ${duration}s · ${resolution} · Motor ainda não conectado`;
  top.append(titleEl, state);
  card.append(top, meta);
  jobs.prepend(card);
  emptyState.classList.add("hidden");
  jobCount.textContent = `${projectNumber} ${projectNumber === 1 ? "projeto" : "projetos"}`;
  formMessage.textContent = "Projeto preparado localmente. A geração real será ativada após conectar o backend.";
});
