import Process from "../model/Process.js";
// import { priorityScheduling } from "../scheduler/Priority.js";
// import { srtfScheduling } from "../scheduler/SRTF.js";
import { calculateAverages } from "../metrics/Calculator.js";
// import { drawGantt, renderComparisonDashboard } from "../util/ChartHelper.js";
let processes = [];

//   ADD PROCESS

function addProcess() {
  const pid = document.getElementById("inp-pid").value.trim();
  const arrival = document.getElementById("inp-arrival").value;
  const burst = document.getElementById("inp-burst").value;
  const priority = document.getElementById("inp-priority").value;

  if (!pid || arrival === "" || burst === "" || priority === "") {
    Swal.fire({
      icon: "error",
      title: "Missing Data",
      text: "Please fill all fields before adding a process",
    });
    return;
  }

  if (arrival < 0) {
    Swal.fire("Invalid Input", "Arrival Time cannot be negative", "error");
    return;
  }

  if (burst <= 0) {
    Swal.fire("Invalid Input", "Burst Time must be greater than 0", "error");
    return;
  }

  if (priority <= 0) {
    Swal.fire("Invalid Input", "Priority must be greater than 0", "error");
    return;
  }

  const exists = processes.some((p) => p.pid === pid);
  if (exists) {
    Swal.fire("Duplicate PID", "Process ID already exists!", "error");
    return;
  }

  processes.push(
    new Process(pid, Number(arrival), Number(burst), Number(priority)),
  );

  renderTable();
  clearInputs();
  Swal.fire({
    icon: "success",
    title: "Process Added",
    text: `${pid} added successfully`,
    timer: 1200,
    showConfirmButton: false,
  });
}

//  RENDER TABLE

function renderTable() {
  const tableBody = document.getElementById("processTableBody");
  const emptyRow = document.getElementById("emptyRow");

  tableBody.querySelectorAll("tr:not(#emptyRow)").forEach((r) => r.remove());

  if (processes.length === 0) {
    emptyRow.style.display = "table-row";
  } else {
    emptyRow.style.display = "none";

    processes.forEach((p, i) => {
      const row = document.createElement("tr");

      row.innerHTML = `
                <td>${p.pid}</td>
                <td>${p.arrival}</td>
                <td>${p.burst}</td>
                <td>${p.priority}</td>
                <td>
                    <button class="btn btn-danger-ghost" onclick="deleteProcess(${i})">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;

      tableBody.appendChild(row);
    });
  }

  updateCount();
}

// DELETE

function deleteProcess(index) {
  processes.splice(index, 1);
  renderTable();
}

function deleteAll() {
  if (processes.length === 0) {
    Swal.fire({
      icon: "info",
      title: "Nothing to Delete",
      text: "The process list is already empty.",
      confirmButtonColor: "#008080",
    });
    return;
  }

  Swal.fire({
    icon: "warning",
    title: "Are you sure?",
    text: "This will delete all processes permanently.",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#046b6e",
    confirmButtonText: "Yes, delete all",
  }).then((result) => {
    if (result.isConfirmed) {
      processes = [];
      renderTable();
      clearInputs();
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "All processes have been removed.",
        confirmButtonColor: "#008080",
      });
    }
  });
}

//  COUNT
function updateCount() {
  document.getElementById("tableCount").textContent =
    `${processes.length} process${processes.length !== 1 ? "es" : ""}`;
}

//  CLEAR INPUTS

function clearInputs() {
  document.getElementById("inp-pid").value = "";
  document.getElementById("inp-arrival").value = "";
  document.getElementById("inp-burst").value = "";
  document.getElementById("inp-priority").value = "";
}

//  SWITCH VIEW

function switchView(view) {
  document.querySelectorAll(".view").forEach((v) => {
    v.style.display = "none";
    v.classList.remove("active");
  });

  const target = document.getElementById("view-" + view);
  target.style.display = "block";
  target.classList.add("active");

  document
    .querySelectorAll(".nav-btn")
    .forEach((b) => b.classList.remove("active"));
  document.getElementById("btn-" + view).classList.add("active");
}

//  RUN SIMULATION

function runSimulation() {
  if (processes.length < 2) {
    Swal.fire({
      icon: "warning",
      title: "Not Enough Processes",
      text: "You need at least 2 processes",
      confirmButtonColor: "#008080",
    });
    return;
  }
}
//  FILL TABLE
function fillTable(tableId, data) {
    const tbody = document.getElementById(tableId);

    let rows = "";
    let totalTat = 0;
    let totalWt = 0;
    let totalRt = 0;

    data.forEach(p => {
        totalTat += p.tat;
        totalWt += p.wt;
        totalRt += p.rt;

        rows += `
            <tr>
                <td>${p.pid}</td>
                <td>${p.ct}</td>
                <td>${p.tat}</td>
                <td>${p.wt}</td>
                <td>${p.rt}</td>
            </tr>
        `;
    });

    tbody.innerHTML = rows;

    const isPriority = tableId.includes("priority");

    if (isPriority) {
        document.getElementById("priority_avg_tat").textContent = (totalTat / data.length).toFixed(2);
        document.getElementById("priority_avg_wt").textContent = (totalWt / data.length).toFixed(2);
        document.getElementById("priority_avg_rt").textContent = (totalRt / data.length).toFixed(2);
    } else {
        document.getElementById("srtf_avg_tat").textContent = (totalTat / data.length).toFixed(2);
        document.getElementById("srtf_avg_wt").textContent = (totalWt / data.length).toFixed(2);
        document.getElementById("srtf_avg_rt").textContent = (totalRt / data.length).toFixed(2);
    }
}

window.addProcess = addProcess;
window.deleteProcess = deleteProcess;
window.deleteAll = deleteAll;
window.switchView = switchView;
window.runSimulation = runSimulation;

