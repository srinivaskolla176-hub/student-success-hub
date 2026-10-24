const form = document.getElementById("assignmentForm");
const list = document.getElementById("assignmentList");
const count = document.getElementById("assignmentCount");

let assignments = JSON.parse(
    localStorage.getItem("assignments") || "[]"
);

function renderAssignments() {
    list.replaceChildren();

    assignments.forEach((assignment, index) => {
        const item = document.createElement("li");

        item.append(
            `${assignment.title} — ${assignment.subject} — Due: ${assignment.dueDate} `
        );

        const remove = document.createElement("button");
        remove.textContent = "Delete";
        remove.style.width = "auto";

        remove.addEventListener("click", () => {
            assignments.splice(index, 1);
            saveAssignments();
        });

        item.appendChild(remove);
        list.appendChild(item);
    });

    count.textContent = assignments.length;
}

function saveAssignments() {
    localStorage.setItem("assignments", JSON.stringify(assignments));
    renderAssignments();
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    assignments.push({
        title: document.getElementById("title").value.trim(),
        subject: document.getElementById("subject").value.trim(),
        dueDate: document.getElementById("dueDate").value
    });

    saveAssignments();
    form.reset();
});

renderAssignments();
