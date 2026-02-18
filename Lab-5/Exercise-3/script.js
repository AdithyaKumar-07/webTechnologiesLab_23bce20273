const table = document.getElementById("studentTable");
const message = document.getElementById("message");
const form = document.getElementById("studentForm");

let studentsData = [];

// READ → Fetch JSON
function loadStudents() {
  fetch("students.json")
    .then(response => {
      if (!response.ok) throw new Error("Error loading JSON");
      return response.json();   // JSON parsing
    })
    .then(data => {
      studentsData = data.students;
      displayStudents();
      showMessage("Students loaded", "success");
    })
    .catch(error => {
      showMessage("JSON parsing error or file missing", "error");
      console.error(error);
    });
}

// Display table
function displayStudents() {
  table.innerHTML = "";

  studentsData.forEach(student => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.course}</td>
      <td>${student.marks}</td>
      <td>
        <button onclick="editStudent('${student.id}')">Edit</button>
        <button onclick="deleteStudent('${student.id}')">Delete</button>
      </td>
    `;

    table.appendChild(row);
  });
}

// Validation
function validateInput(id, name, course, marks) {
  if (!id || !name || !course || !marks) {
    showMessage("All fields required", "error");
    return false;
  }
  return true;
}

// CREATE → Add student
form.addEventListener("submit", e => {
  e.preventDefault();

  const id = document.getElementById("id").value;
  const name = document.getElementById("name").value;
  const course = document.getElementById("course").value;
  const marks = document.getElementById("marks").value;

  if (!validateInput(id, name, course, marks)) return;

  studentsData.push({ id, name, course, marks });
  displayStudents();
  showMessage("Student added successfully", "success");
  form.reset();
});

// UPDATE → Modify marks/course
function editStudent(id) {
  const student = studentsData.find(s => s.id === id);

  const newCourse = prompt("Enter new course:");
  const newMarks = prompt("Enter new marks:");

  if (newCourse) student.course = newCourse;
  if (newMarks) student.marks = newMarks;

  displayStudents();
  showMessage("Student updated", "success");
}

// DELETE → Remove student
function deleteStudent(id) {
  studentsData = studentsData.filter(s => s.id !== id);
  displayStudents();
  showMessage("Student deleted", "success");
}

// Messages
function showMessage(msg, type) {
  message.textContent = msg;
  message.className = type;
}

// Initial load
loadStudents();
