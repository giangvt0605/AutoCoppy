let lines = [];
let index = 0;

function start() {
  const text = document.getElementById("inputArea").value;
  lines = text.split("\n").filter(line => line.trim() !== "");
  index = 0;
  showLine();
}

function showLine() {
  if (index < lines.length) {
    document.getElementById("currentLine").textContent = lines[index];
  } else {
    document.getElementById("currentLine").textContent = "Đã hết dữ liệu.";
  }
}

function copyCurrent() {
  if (index < lines.length) {
    navigator.clipboard.writeText(lines[index]);
    index++;
    showLine();
  }
}
