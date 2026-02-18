const table = document.getElementById("empTable");
const message = document.getElementById("message");
const form = document.getElementById("empForm");

let xmlDoc;

// READ → Fetch XML data
function loadEmployees() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "employees.xml", true);

  xhr.onload = function () {
    if (xhr.status === 200) {

      xmlDoc = xhr.responseXML;

      if (!xmlDoc) {
        showMessage("Malformed XML file", "error");
        return;
      }

      const employees = xmlDoc.getElementsByTagName("employee");

      if (employees.length === 0) {
        showMessage("No employee records found", "error");
        return;
      }

      displayEmployees(employees);
      showMessage("Employees loaded successfully", "success");

    } else {
      showMessage("Error loading XML", "error");
    }
  };

  xhr.send();
}

// Display employees in table
function displayEmployees(employees) {
  table.innerHTML = "";

  for (let emp of employees) {

    const id = emp.getElementsByTagName("id")[0].textContent;
    const name = emp.getElementsByTagName("name")[0].textContent;
    const dept = emp.getElementsByTagName("department")[0].textContent;
    const salary = emp.getElementsByTagName("salary")[0].textContent;

    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${id}</td>
      <td>${name}</td>
      <td>${dept}</td>
      <td>${salary}</td>
      <td>
        <button onclick="editEmployee('${id}')">Edit</button>
        <button onclick="deleteEmployee('${id}')">Delete</button>
      </td>
    `;

    table.appendChild(row);
  }
}

// CREATE → Add new employee node
form.addEventListener("submit", e => {
  e.preventDefault();

  const emp = xmlDoc.createElement("employee");

  const id = createNode("id", empId.value);
  const name = createNode("name", empName.value);
  const dept = createNode("department", empDept.value);
  const salary = createNode("salary", empSalary.value);

  emp.append(id, name, dept, salary);
  xmlDoc.documentElement.appendChild(emp);

  loadEmployees();
  showMessage("Employee added successfully", "success");
  form.reset();
});

// Helper to create XML node
function createNode(tag, value) {
  const node = xmlDoc.createElement(tag);
  node.textContent = value;
  return node;
}

// UPDATE → Edit department or salary
function editEmployee(id) {
  const employees = xmlDoc.getElementsByTagName("employee");

  for (let emp of employees) {
    if (emp.getElementsByTagName("id")[0].textContent === id) {

      const newDept = prompt("Enter new department:");
      const newSalary = prompt("Enter new salary:");

      if (newDept)
        emp.getElementsByTagName("department")[0].textContent = newDept;

      if (newSalary)
        emp.getElementsByTagName("salary")[0].textContent = newSalary;

      showMessage("Employee updated", "success");
      loadEmployees();
      break;
    }
  }
}

// DELETE → Remove employee node
function deleteEmployee(id) {
  const employees = xmlDoc.getElementsByTagName("employee");

  for (let emp of employees) {
    if (emp.getElementsByTagName("id")[0].textContent === id) {
      emp.remove();
      showMessage("Employee deleted", "success");
      loadEmployees();
      break;
    }
  }
}

// Messages
function showMessage(msg, type) {
  message.textContent = msg;
  message.className = type;
}

// Initial load
loadEmployees();
