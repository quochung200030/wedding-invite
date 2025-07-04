// Xử lý gửi lời chúc lên Google Sheets
document.getElementById("guestForm").addEventListener("submit", function(e){
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();

  if(name && message){
    fetch("https://script.google.com/macros/s/AKfycbxCCNSPpVBpES6TQeVVR9ENzuKYDs_RGOXf6Gk9wSi36uJJN-RaOXOZX2GNOzL9Zb_xeA/exec", {
      method: "POST",
      body: JSON.stringify({ name, message }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.status === "success"){
        addMessage(name, message);
        this.reset();
      } else {
        alert("Lưu lời chúc thất bại. Vui lòng thử lại.");
      }
    })
    .catch(() => alert("Không thể kết nối. Vui lòng thử lại sau."));
  } else {
    alert("Vui lòng nhập đầy đủ họ tên và lời chúc.");
  }
});

// Thêm lời chúc vào giao diện
function addMessage(name, message) {
  const msgDiv = document.createElement("div");
  msgDiv.className = "message-item";
  msgDiv.innerHTML = `<strong>${name}</strong><br>${message}`;
  document.getElementById("messages").prepend(msgDiv);
}

// Hiệu ứng hoa rơi
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let petals = [];
for (let i = 0; i < 50; i++) {
  petals.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 5 + 2,
    d: Math.random() * 1 + 0.5
  });
}


function drawPetals() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#d2b48c"; // nâu nhạt
  ctx.beginPath();
  for (let p of petals) {
    ctx.moveTo(p.x, p.y);
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
  }
  ctx.fill();
  updatePetals();
}

function updatePetals() {
  for (let p of petals) {
    p.y += p.d;
    p.x += Math.sin(p.y * 0.01);
    if (p.y > canvas.height) {
      p.y = 0;
      p.x = Math.random() * canvas.width;
    }
  }
}

setInterval(drawPetals, 30);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Tự phát nhạc khi click
document.addEventListener("click", () => {
  const music = document.getElementById("bg-music");
  if (music.paused) {
    music.play();
  }
});
