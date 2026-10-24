const CURRICULUM_URL = "https://www.fulek.com/data/api/supit/curriculum-list/hr";

function getNastavniPlan() {
    // The curriculum is only available to logged-in users.
    if (!getValidToken()) {
        window.location.href = "Prijava.html";
        return;
    }

    fetch(CURRICULUM_URL, {
        method: "GET",
        headers: getAuthHeaders(),
    })
        .then((response) => {
            if (response.status === 401) {
                logout(false);
                window.location.href = "Prijava.html";
                return null;
            }
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((result) => {
            if (!result) return;
            if (Array.isArray(result.data)) {
                showNastavniPlan(result.data);
            } else {
                console.error("Invalid JSON structure:", result);
            }
        })
        .catch((error) => console.error("Fetch error:", error));
}

function showNastavniPlan(data) {
    const searchBar = document.querySelector("#searchBar");
    const autocompleteList = document.querySelector("#autocomplete");
    const selectedCoursesSet = new Set();

    autocompleteList.innerHTML = "";

    searchBar.addEventListener("input", () => {
        const searchTerm = searchBar.value.trim().toLowerCase();
        autocompleteList.innerHTML = "";

        // Don't list the whole curriculum when the field is empty.
        if (searchTerm === "") return;

        const matchingCourses = data.filter(
            (course) =>
                course.kolegij &&
                course.kolegij.toLowerCase().includes(searchTerm) &&
                !selectedCoursesSet.has(course.id ?? course.kolegij)
        );

        matchingCourses.forEach((course) => {
            const liElement = document.createElement("li");
            liElement.textContent = course.kolegij;
            liElement.classList.add("list-group-item", "autocomplete-item");

            liElement.addEventListener("click", () => {
                showSelectedCourse(course, selectedCoursesSet);
                searchBar.value = "";
                autocompleteList.innerHTML = "";
                searchBar.focus();
            });

            autocompleteList.appendChild(liElement);
        });
    });

    document.addEventListener("click", (event) => {
        if (!autocompleteList.contains(event.target) && event.target !== searchBar) {
            autocompleteList.innerHTML = "";
        }
    });
}

function showSelectedCourse(course, selectedCoursesSet) {
    const columns = [
        { header: "Kolegij", key: "kolegij" },
        { header: "ECTS", key: "ects" },
        { header: "Sati", key: "sati" },
        { header: "Predavanja", key: "predavanja" },
        { header: "Vježbe", key: "vjezbe" },
        { header: "Tip", key: "tip" },
    ];
    const courseKey = course.id ?? course.kolegij;

    if (selectedCoursesSet.has(courseKey)) return;
    selectedCoursesSet.add(courseKey);

    const tableContainer = document.getElementById("table-container");
    const tableBody = document.getElementById("table-body");
    tableContainer.style.display = "block";

    const row = document.createElement("tr");
    columns.forEach(({ header, key }) => {
        const td = document.createElement("td");
        td.textContent = course[key] ?? "";
        td.setAttribute("data-column", header);
        row.appendChild(td);
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Obriši";
    deleteButton.classList.add("btn-delete");
    deleteButton.addEventListener("click", () => {
        selectedCoursesSet.delete(courseKey);
        tableBody.removeChild(row);
        updateSumRow();

        if (tableBody.children.length === 0) {
            tableContainer.style.display = "none";
        }
    });

    const tdDelete = document.createElement("td");
    tdDelete.appendChild(deleteButton);
    row.appendChild(tdDelete);

    tableBody.appendChild(row);
    updateSumRow();
}

function updateSumRow() {
    const tableBody = document.getElementById("table-body");
    const sumRow = document.getElementById("sumRow");

    const numericColumns = ["ECTS", "Sati", "Predavanja", "Vježbe"];
    const totals = numericColumns.map((column) =>
        Array.from(tableBody.querySelectorAll(`td[data-column="${column}"]`))
            .map((cell) => parseFloat(cell.textContent) || 0)
            .reduce((acc, value) => acc + value, 0)
    );

    sumRow.querySelector("#total-ects").textContent = totals[0];
    sumRow.querySelector("#total-sati").textContent = totals[1];
    sumRow.querySelector("#total-predavanja").textContent = totals[2];
    sumRow.querySelector("#total-vjezbe").textContent = totals[3];
}

document.addEventListener("DOMContentLoaded", getNastavniPlan);
