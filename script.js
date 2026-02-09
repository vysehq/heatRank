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
.form {
  text-align: center;
  margin-bottom: 20px;
}

.form input {
  padding: 8px 10px;
  margin: 0 4px;
  width: 120px;
}

.form button {
  padding: 8px 16px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
