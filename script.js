const users = [
  { name: "Alice", likes: 120, comments: 30 },
  { name: "Bob", likes: 80, comments: 50 },
  { name: "Chris", likes: 200, comments: 10 },
  { name: "Daisy", likes: 60, comments: 40 }
];

users.forEach(user => {
  user.heat = user.likes + user.comments * 2;
});

users.sort((a, b) => b.heat - a.heat);

const tbody = document.getElementById("ranking-body");

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