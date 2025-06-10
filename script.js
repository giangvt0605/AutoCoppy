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

document.getElementById("loadCSVBtn").addEventListener("click", function () {
  const fileInput = document.getElementById("csvFile");
  const file = fileInput.files[0];

  if (!file) {
    alert("❌ Vui lòng chọn 1 file CSV");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const csvText = e.target.result;
    const lines = csvText.split("\n").map(line => line.trim());

    const keywords = ["SPXVN", "TO", "KT", "ABC"];
    const filtered = lines
      .map(line => line.split(",").slice(1, 5)) // Cột B–E
      .flat()
      .filter(cell =>
        keywords.some(keyword => cell.trim().startsWith(keyword))
      );

    if (filtered.length === 0) {
      alert("⚠️ Không tìm thấy dòng nào khớp từ khóa.");
    }

    document.getElementById("inputData").value = filtered.join("\n");
    alert("✅ Đã tải và lọc dữ liệu thành công!");
  };

  reader.onerror = function () {
    alert("❌ Lỗi khi đọc file CSV");
  };

  reader.readAsText(file);
});
document.getElementById("loadTXTBtn").addEventListener("click", function () {
  const fileInput = document.getElementById("txtFile");
  const file = fileInput.files[0];

  if (!file) {
    alert("❌ Vui lòng chọn 1 file TXT");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const textContent = e.target.result;
    const lines = textContent.split("\n").map(line => line.trim()).filter(line => line !== "");

    if (lines.length === 0) {
      alert("⚠️ File không có dòng nào hợp lệ.");
      return;
    }

    document.getElementById("inputData").value = lines.join("\n");
    alert("✅ Đã tải dữ liệu từ file TXT thành công!");
  };

  reader.onerror = function () {
    alert("❌ Lỗi khi đọc file TXT");
  };

  reader.readAsText(file);
});
