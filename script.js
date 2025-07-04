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
  ctx.fillStyle = "#c68642"; // nâu caramel
  ctx.beginPath();
  for (let i = 0; i < petals.length; i++) {
    let p = petals[i];
    ctx.moveTo(p.x, p.y);
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
  }
  ctx.fill();
  updatePetals();
}

function updatePetals() {
  for (let i = 0; i < petals.length; i++) {
    let p = petals[i];
    p.y += p.d;
    p.x += Math.sin(p.y * 0.01);

    if (p.y > canvas.height) {
      petals[i] = {
        x: Math.random() * canvas.width,
        y: 0,
        r: p.r,
        d: p.d
      };
    }
  }
}

setInterval(drawPetals, 30);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

document.addEventListener("click", () => {
  const music = document.getElementById("bg-music");
  if (music.paused) {
    music.play();
  }
});
