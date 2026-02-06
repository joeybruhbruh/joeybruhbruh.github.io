import { animate } from 'https://cdn.jsdelivr.net/npm/motion@12.33.0/+esm'

class Student {
    constructor(id, name, dob, className, gpa) {
        this.id = id;
        this.name = name;
        this.dob = dob;
        this.className = className;
        this.gpa = gpa;
    }

    updateInfo(name, dob, className, gpa) {
        this.name = name;
        this.dob = dob;
        this.className = className;
        this.gpa = gpa;
    }
}

const studentList = [];

// DOM Elements
const studentForm = document.getElementById('student-form');
const tableBody = document.getElementById('student-table-body');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const editIndexInput = document.getElementById('edit-index');

// Inputs
const idInput = document.getElementById('student-id');
const nameInput = document.getElementById('full-name');
const dobInput = document.getElementById('dob');
const classInput = document.getElementById('class-name');
const gpaInput = document.getElementById('gpa');

// Functions
function renderTable() {
    tableBody.innerHTML = '';
    studentList.forEach((student, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.dob}</td>
            <td>${student.className}</td>
            <td>${student.gpa}</td>
            <td>
                <button class="action-btn edit-btn" data-index="${index}">Edit</button>
                <button class="action-btn delete-btn" data-index="${index}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
        
        // Animate row entry
        animate(row, { opacity: [0, 1], y: [10, 0] }, { duration: 0.3, delay: index * 0.05 });
    });

    // Re-attach event listeners because innerHTML clears them
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.onclick = () => prepareEdit(parseInt(btn.dataset.index));
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.onclick = () => deleteStudent(parseInt(btn.dataset.index));
    });
}

function resetForm() {
    studentForm.reset();
    editIndexInput.value = '-1';
    formTitle.textContent = 'Add New Student';
    submitBtn.textContent = 'Add Student';
    idInput.disabled = false;
    cancelBtn.style.display = 'none';
}

function handleFormSubmit(e) {
    e.preventDefault();

    const id = idInput.value.trim();
    const name = nameInput.value.trim();
    const dob = dobInput.value;
    const className = classInput.value.trim();
    const gpa = parseFloat(gpaInput.value);

    if (!id || !name || !dob || !className || isNaN(gpa)) {
        alert('Please fill in all fields correctly.');
        return;
    }

    if (gpa < 0 || gpa > 4) {
        alert('GPA must be between 0 and 4.');
        return;
    }

    const editIndex = parseInt(editIndexInput.value);

    if (editIndex === -1) {
        if (studentList.some(s => s.id === id)) {
            alert('Student ID already exists!');
            return;
        }

        const newStudent = new Student(id, name, dob, className, gpa);
        studentList.push(newStudent);
    } else {
        const studentToUpdate = studentList[editIndex];
        studentToUpdate.updateInfo(name, dob, className, gpa);
    }

    renderTable();
    resetForm();
}

function prepareEdit(index) {
    const student = studentList[index];
    
    idInput.value = student.id;
    nameInput.value = student.name;
    dobInput.value = student.dob;
    classInput.value = student.className;
    gpaInput.value = student.gpa;

    editIndexInput.value = index;
    idInput.disabled = true;
    formTitle.textContent = 'Update Student Information';
    submitBtn.textContent = 'Update';
    cancelBtn.style.display = 'inline-block';

    animate(".form-container", { scale: [1, 1.02, 1] }, { duration: 0.3 });
}

function deleteStudent(index) {
    if (confirm('Are you sure you want to delete this student?')) {
        const row = tableBody.children[index];
        animate(row, { opacity: 0, x: 20 }, { duration: 0.2 }).then(() => {
            studentList.splice(index, 1);
            renderTable();
            if (parseInt(editIndexInput.value) === index) {
                resetForm();
            }
        });
    }
}

// Initial Animations
animate("h1", { opacity: [0, 1], y: [-20, 0] }, { duration: 0.8 });
animate(".description", { opacity: [0, 1], y: [-10, 0] }, { duration: 0.8, delay: 0.1 });
animate(".form-container", { opacity: [0, 1], y: [20, 0] }, { duration: 0.6, delay: 0.2 });
animate(".list-container", { opacity: [0, 1], y: [20, 0] }, { duration: 0.6, delay: 0.4 });

// Event Listeners
studentForm.addEventListener('submit', handleFormSubmit);
cancelBtn.addEventListener('click', () => resetForm());

// Initial Render
renderTable();