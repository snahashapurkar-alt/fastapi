const API_URL = "http://127.0.0.1:8000";


// Load all students
async function loadStudents() {

    try {

        const response = await fetch(`${API_URL}/students`);

        const students = await response.json();

        displayStudents(students);

    } catch (error) {

        console.log(error);

        document.getElementById("message").innerText =
            "Unable to connect to FastAPI";

    }
}


// Display students in table
function displayStudents(students) {

    const table = document.getElementById("studentTable");

    table.innerHTML = "";

    if (students.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="3">
                    No students found
                </td>
            </tr>
        `;

        return;
    }

    students.forEach(student => {

        const row = `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.course}</td>
            </tr>
        `;

        table.innerHTML += row;

    });
}


// Add student
document
    .getElementById("studentForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const student = {

            id: Number(
                document.getElementById("studentId").value
            ),

            name:
                document.getElementById("studentName").value,

            course:
                document.getElementById("studentCourse").value
        };


        try {

            const response = await fetch(
                `${API_URL}/students`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(student)
                }
            );


            const data = await response.json();

            document.getElementById("message").innerText =
                data.message;

            document.getElementById("studentForm").reset();

            loadStudents();

        } catch (error) {

            document.getElementById("message").innerText =
                "Error adding student";

        }

    });


// Search student by ID
async function searchStudent() {

    const id =
        document.getElementById("searchId").value;

    if (!id) {

        alert("Please enter Student ID");

        return;
    }


    try {

        const response =
            await fetch(`${API_URL}/students/${id}`);

        const student = await response.json();


        if (student.id) {

            displayStudents([student]);

        } else {

            alert("Student details not found");

            displayStudents([]);

        }

    } catch (error) {

        alert("Unable to connect to FastAPI");

    }
}


// Search by course
async function searchCourse() {

    const course =
        document.getElementById("course").value;

    if (!course) {

        alert("Please enter course");

        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/students?course=${encodeURIComponent(course)}`
            );

        const students = await response.json();

        displayStudents(students);

    } catch (error) {

        alert("Unable to connect to FastAPI");

    }
}


// Load students when page opens
loadStudents();