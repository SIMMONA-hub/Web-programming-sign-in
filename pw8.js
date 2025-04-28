var selectedRow = null;

// Show Alerts
function showAlert(message, className) {
    const existingAlert = document.querySelector(".alert");
    if (existingAlert) {
        existingAlert.remove();
    }

    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => {
        if (div) {
            div.remove();
        }
    }, 3000);
}

// Clear All Fields
function clearFields() {
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#rollNo").value = "";
}

// Add Data
document.querySelector("#student-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Get Form Values
    const firstName = document.querySelector("#firstName").value.trim();
    const lastName = document.querySelector("#lastName").value.trim();
    const rollNo = document.querySelector("#rollNo").value.trim();

    // Validate
    if (firstName === "" || lastName === "" || rollNo === "") {
        showAlert("Please fill in all fields", "danger");
    } else {
        const list = document.querySelector("#student-list");

        if (selectedRow == null) {
            // Add new student
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${rollNo}</td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                    <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
                </td>
            `;
            list.appendChild(row);
            showAlert("Student Added", "success");
        } else {
            // Edit existing student
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = rollNo;
            showAlert("Student Info Edited", "info");
            selectedRow = null;
        }

        clearFields();
    }
});

// Handle Edit and Delete Actions
document.querySelector("#student-list").addEventListener("click", (e) => {
    let target = e.target;

    if (target.classList.contains("edit")) {
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#lastName").value = selectedRow.children[1].textContent;
        document.querySelector("#rollNo").value = selectedRow.children[2].textContent;
    }

    if (target.classList.contains("delete")) {
        target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted", "danger");

        // Reset selectedRow if the deleted row was being edited
        if (selectedRow === target.parentElement.parentElement) {
            selectedRow = null;
        }
    }
});
