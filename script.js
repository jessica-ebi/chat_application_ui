const chatMessages = document.getElementById("chatMessages");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const typingIndicator = document.getElementById("typingIndicator");
const themeToggle = document.getElementById("themeToggle");
const emojiBtn = document.getElementById("emojiBtn");
const fileBtn = document.getElementById("fileBtn");
const fileInput = document.getElementById("fileInput");

const responses = {
  hi: "Hey there 👋! How are you?",
  hello: "Hello 😊! What can I do for you today?",
  bye: "Goodbye! 👋 See you soon.",
  thanks: "You're welcome 🙌",
};

const randomReplies = [
  "Interesting 🤔",
  "Tell me more 😄",
  "That sounds great!",
  "Cool! 🚀",
  "Hmm... I see 👀",
];

function addMessage(text, type, file = null) {
  const msg = document.createElement("div");
  msg.classList.add("message", type);

  if (file) {
    const fileLink = document.createElement("a");
    fileLink.href = URL.createObjectURL(file);
    fileLink.textContent = `📎 ${file.name}`;
    fileLink.target = "_blank";
    msg.appendChild(fileLink);
  } else {
    msg.innerHTML = `<div class="text">${text}</div>`;
  }

  const time = document.createElement("span");
  time.classList.add("time");
  time.textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const status = document.createElement("span");
  status.classList.add("status");
  status.textContent = type === "sent" ? "✓" : "✓✓";

  // 🗑️ Delete Button
  const delBtn = document.createElement("button");
  delBtn.classList.add("delete-btn");
  delBtn.innerHTML = "🗑️";
  delBtn.title = "Delete message";
  delBtn.addEventListener("click", () => {
    msg.remove();
  });

  msg.appendChild(time);
  msg.appendChild(status);
  msg.appendChild(delBtn);

  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotReply(input) {
  const msg = input.toLowerCase();
  for (let key in responses) {
    if (msg.includes(key)) return responses[key];
  }
  return randomReplies[Math.floor(Math.random() * randomReplies.length)];
}

function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;
  addMessage(text, "sent");
  messageInput.value = "";

  typingIndicator.style.display = "block";
  setTimeout(() => {
    typingIndicator.style.display = "none";
    addMessage(getBotReply(text), "received");
  }, 1000);
}

sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", (e) => e.key === "Enter" && sendMessage());

emojiBtn.addEventListener("click", () => {
  const emoji = prompt("Enter emoji to add:");
  if (emoji) messageInput.value += emoji;
});

fileBtn.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) addMessage("", "sent", file);
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});
