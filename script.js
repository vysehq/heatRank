let currentSortKey = "heat";   // 默认按热度
let sortDirection = "desc";    // desc = 降序


const users = [
  { name: "Alice", likes: 120, comments: 30 },
  { name: "Bob", likes: 80, comments: 50 },
  { name: "Chris", likes: 200, comments: 10 },
  { name: "Daisy", likes: 60, comments: 40 }
];

const tbody = document.getElementById("ranking-body");

// 👉 更新时间
function updateTime() {
  const now = new Date();
  const timeStr = now.toLocaleString('zh-CN');
  document.getElementById("timeInfo").textContent = `最后更新: ${timeStr}`;
}

// 👉 统一的渲染函数
function renderRanking() {
  // 1. 计算热度
  users.forEach(user => {
    user.heat = user.likes + user.comments * 2;
  });

  // 2. 排序
users.sort((a, b) => {
  if (sortDirection === "asc") {
    return a[currentSortKey] - b[currentSortKey];
  } else {
    return b[currentSortKey] - a[currentSortKey];
  }
});

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
      <td><button onclick="deleteUser(${index})">删除</button></td>
    `;
    tbody.appendChild(tr);
  });

  // 5. 更新时间
  updateTime();
}

//加删除按钮
function deleteUser(index) {
  users.splice(index, 1);
  renderRanking();
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
//自动每5秒刷新时间
setInterval(updateTime, 5000);

//数据存进本地存储
//刷新页面不丢数据
localStorage.setItem("users", JSON.stringify(users));
//页面加载时读取
const saved = localStorage.getItem("users");
if (saved) {
  users = JSON.parse(saved);
}

//添加点击事件
document.querySelectorAll(".sortable").forEach(th => {
  th.addEventListener("click", () => {
    const key = th.dataset.key;

    // 如果点击的是当前排序字段 → 切换方向
    if (currentSortKey === key) {
      sortDirection = sortDirection === "asc" ? "desc" : "asc";
    } else {
      currentSortKey = key;
      sortDirection = "desc"; // 默认降序
    }

    renderRanking();
  });
});