let data = [];
let currentIndex = 0;

const inputData = document.getElementById("inputData");
const currentLineDiv = document.getElementById("currentLine");
const lineStatus = document.getElementById("lineStatus");

// Bắt đầu: tách dòng và hiển thị dòng đầu tiên
document.getElementById("startBtn").addEventListener("click", () => {
  data = inputData.value.split("\n").filter(line => line.trim() !== "");
  currentIndex = 0;
  showCurrentLine();
});

// Quay lại dòng trước
document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentIndex > 1) {
    currentIndex -= 2; // Trừ 2 vì sau showCurrentLine sẽ +1
    showCurrentLine();
  }
});

// Hiển thị dòng hiện tại và đánh dấu là đã sao chép
function showCurrentLine() {
  if (currentIndex < data.length) {
    const currentText = data[currentIndex].replace(/^✅ /, ""); // Xóa dấu ✅ nếu có
    currentLineDiv.textContent = "📋 " + currentText;
    lineStatus.textContent = `Dòng hiện tại: ${currentIndex + 1} / ${data.length}`;
    markLineAsCopied(currentIndex);
    currentIndex++;
  } else {
    currentLineDiv.textContent = "✅ Đã hoàn tất tất cả các dòng";
    lineStatus.textContent = `Dòng hiện tại: ${data.length} / ${data.length}`;
  }
}

// Sao chép dòng hiện tại vào clipboard
function copyToClipboard() {
  const text = currentLineDiv.textContent.replace(/^📋 /, "");
  if (text && !text.includes("Đã hoàn tất")) {
    navigator.clipboard.writeText(text).then(() => {
      currentLineDiv.style.backgroundColor = "#d4edda"; // màu xanh nhạt báo đã copy
      showCurrentLine(); // ✅ Tự động chuyển sang dòng tiếp theo
    });
  }
}


// Đổi màu dòng đã sao chép trong textarea
function markLineAsCopied(index) {
  const lines = inputData.value.split("\n");
  if (!lines[index].startsWith("✅ ")) {
    lines[index] = "✅ " + lines[index];
    inputData.value = lines.join("\n");
  }
}
