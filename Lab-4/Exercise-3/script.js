const form = document.getElementById("studentForm");
const table = document.getElementById("studentTable");
const message = document.getElementById("message");

let studentsData = [];

// READ → Load students
function fetchStudents() {
  fetch("students.json")
    .then(res => {
      if (!res.ok) throw { status: res.status };
      return res.json();
    })
    .then(data => {
      studentsData = data.students;
      renderTable();
      showMessage("Students loaded successfully", "success", 200);
    })
    .catch(err => handleError(err));
}

// Render table dynamically
function renderTable() {
  table.innerHTML = "";

  studentsData.forEach(student => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.department}</td>
      <td>${student.marks}</td>
      <td>
        <button onclick="editStudent('${student.id}')">Edit</button>
        <button onclick="deleteStudent('${student.id}')">Delete</button>
      </td>
    `;

    table.appendChild(row);
  });
}

// CREATE → Add student
form.addEventListener("submit", e => {
  e.preventDefault();

  const newStudent = {
    id: document.getElementById("id").value,
    name: document.getElementById("name").value,
    department: document.getElementById("department").value,
    marks: document.getElementById("marks").value
  };

  studentsData.push(newStudent);
  renderTable();
  showMessage("Student added successfully", "success", 200);
  form.reset();
});

// UPDATE → Edit student
function editStudent(id) {
  const student = studentsData.find(s => s.id === id);

  document.getElementById("id").value = student.id;
  document.getElementById("name").value = student.name;
  document.getElementById("department").value = student.department;
  document.getElementById("marks").value = student.marks;

  deleteStudent(id);
}

// DELETE → Remove student
function deleteStudent(id) {
  const index = studentsData.findIndex(s => s.id === id);

  if (index !== -1) {
    studentsData.splice(index, 1);
    renderTable();
    showMessage("Student deleted successfully", "success", 200);
  } else {
    showMessage("Student not found", "error", 404);
  }
}

// Success/Error messages
function showMessage(msg, type, status) {
  message.textContent = `${msg} (Status: ${status})`;
  message.className = type;
}

// HTTP error handling
function handleError(err) {
  if (err.status === 404) {
    showMessage("Resource not found", "error", 404);
  } else {
    showMessage("Server error occurred", "error", 500);
  }
}

// Initial load
fetchStudents();
