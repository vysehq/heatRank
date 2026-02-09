const users = [
  { name: "Alice", likes: 120, comments: 30 },
  { name: "Bob", likes: 80, comments: 50 },
  { name: "Chris", likes: 200, comments: 10 },
  { name: "Daisy", likes: 60, comments: 40 }
];

const tbody = document.getElementById("ranking-body");

// 👉 统一的渲染函数
function renderRanking() {
  // 1. 计算热度
  users.forEach(user => {
    user.heat = user.likes + user.comments * 2;
  });

  // 2. 排序
  users.sort((a, b) => b.heat - a.heat);

  // 3. 清空表格
  tbody.innerHTML = "";

  // 4. 重新渲染
  users.forEach((user, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${user.name}</td>
      <td>${user.likes}</td>
      <td>${user.comments}</td>
      <td>${user.heat}</td>
    `;
    tbody.appendChild(tr);
  });
}

// 👉 初次渲染
renderRanking();

// 👉 添加用户
document.getElementById("addBtn").addEventListener("click", () => {
  const name = document.getElementById("nameInput").value;
  const likes = Number(document.getElementById("likesInput").value);
  const comments = Number(document.getElementById("commentsInput").value);

  if (!name) return alert("请输入用户名");

  users.push({ name, likes, comments });

  renderRanking();

  // 清空输入框
  document.getElementById("nameInput").value = "";
  document.getElementById("likesInput").value = "";
  document.getElementById("commentsInput").value = "";
});
