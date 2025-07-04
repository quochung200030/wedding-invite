document.getElementById("guestForm").addEventListener("submit", function(e){
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();

  if(name && message){
    fetch("URL_WEB_APP_CUA_BAN", {
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
        alert("Lỗi lưu lời chúc");
      }
    })
    .catch(() => alert("Lỗi kết nối"));
  }
});

function addMessage(name, message) {
  const msgDiv = document.createElement("div");
  msgDiv.className = "message-item";
  msgDiv.innerHTML = `<strong>${name}</strong><br>${message}`;
  document.getElementById("messages").prepend(msgDiv);
}
