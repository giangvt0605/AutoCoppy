let data = [];
let currentIndex = 0;
let copiedLines = [];

const inputData = document.getElementById("inputData");
const startBtn = document.getElementById("startBtn");
const prevBtn = document.getElementById("prevBtn");
const output = document.getElementById("output");
const lineStatus = document.getElementById("lineStatus");
const currentLineBox = document.getElementById("currentLine");

function updateOutput() {
  if (data.length === 0) {
    output.value = "";
    currentLineBox.textContent = "📋 Không có dữ liệu";
    lineStatus.textContent = "Dòng hiện tại: 0 / 0";
    return;
  }
  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex >= data.length) currentIndex = data.length - 1;

  const currentText = data[currentIndex];
  output.value = currentText;
  currentLineBox.textContent = "📋 " + currentText;

  // Cập nhật trạng thái màu dòng hiện tại
  if (copiedLines.includes(currentIndex)) {
    currentLineBox.style.backgroundColor = "#d4edda"; // Xanh nhạt: đã copy
  } else {
    currentLineBox.style.backgroundColor = "#e9ecef"; // Mặc định
  }

  lineStatus.textContent = `Dòng hiện tại: ${currentIndex + 1} / ${data.length}`;
}

function nextLine() {
  if (currentIndex < data.length - 1) {
    currentIndex++;
    updateOutput();
  }
}

function prevLine() {
  if (currentIndex > 0) {
    currentIndex--;
    updateOutput();
  }
}

function copyToClipboard() {
  const text = data[currentIndex];
  navigator.clipboard.writeText(text).then(() => {
    if (!copiedLines.includes(currentIndex)) {
      copiedLines.push(currentIndex); // đánh dấu là đã copy
    }
    updateOutput();
  });
}

startBtn.addEventListener("click", () => {
  data = inputData.value.split("\n").map(line => line.trim()).filter(line => line);
  currentIndex = 0;
  copiedLines = [];
  updateOutput();

  if (data.length > 0) {
    const interval = setInterval(() => {
      if (currentIndex < data.length - 1) {
        currentIndex++;
        updateOutput();
      } else {
        clearInterval(interval);
      }
    }, 3000);
  }
});

prevBtn.addEventListener("click", prevLine);
