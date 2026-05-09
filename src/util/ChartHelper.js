export function drawGantt(gantt, containerId) {

    const container = document.getElementById(containerId);
    container.innerHTML = "";

    if (!gantt || gantt.length === 0) {

        Swal.fire({
            icon: "warning",
            title: "No Gantt Data",
            text: "No processes were scheduled. Please check input or simulation logic."
        });

        return;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "custom-gantt-container";

    gantt.forEach(block => {

        const div = document.createElement("div");
        div.className = "gantt-block";

        const duration = block.end - block.start;
        div.style.flex = Math.max(duration, 1);

        div.innerHTML = `
            <span>${block.pid}</span>
            <small>[${block.start} -> ${block.end}]</small>
        `;

        wrapper.appendChild(div);
    });

    container.appendChild(wrapper);
}
export function renderComparisonDashboard(prio, srtf) {

    const prioWT = Number(prio?.avgWt) || 0;
    const srtfWT = Number(srtf?.avgWt) || 0;

    const prioTAT = Number(prio?.avgTat) || 0;
    const srtfTAT = Number(srtf?.avgTat) || 0;

    const prioRT = Number(prio?.avgRt) || 0;
    const srtfRT = Number(srtf?.avgRt) || 0;


    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };

    setText("val-prio-wt", prioWT.toFixed(2));
    setText("val-srtf-wt", srtfWT.toFixed(2));

    setText("val-prio-tat", prioTAT.toFixed(2));
    setText("val-srtf-tat", srtfTAT.toFixed(2));

    setText("val-prio-rt", prioRT.toFixed(2));
    setText("val-srtf-rt", srtfRT.toFixed(2));



    const wtWinner = prioWT <= srtfWT ? "PRIORITY" : "SRTF";
    const tatWinner = prioTAT <= srtfTAT ? "PRIORITY" : "SRTF";
    const rtWinner = prioRT <= srtfRT ? "PRIORITY" : "SRTF";

    setText("winner-wt", wtWinner + " Wins");
    setText("winner-tat", tatWinner + " Wins");
    setText("winner-rt", rtWinner + " Wins");



    const starvationRisk =
        prioWT > 10
            ? "High starvation risk detected in Priority Scheduling"
            : "Low starvation risk in this scenario";

    const fairnessText =
        prioWT > srtfWT * 1.5
            ? "SRTF is more fair for short jobs"
            : "Priority Scheduling may reduce fairness for low priority processes";


    const analysis = document.getElementById("analysis-text-area");

    if (analysis) {

        let wtBetter = prioWT <= srtfWT ? "Priority Scheduling" : "SRTF";
        let tatBetter = prioTAT <= srtfTAT ? "Priority Scheduling" : "SRTF";
        let rtBetter = prioRT <= srtfRT ? "Priority Scheduling" : "SRTF";

        const finalWinner =
            (prioWT + prioTAT + prioRT) <= (srtfWT + srtfTAT + srtfRT)
                ? "Priority Scheduling"
                : "SRTF";

        analysis.innerHTML = `

            <div class="analysis-box">
                <h4>Waiting Time Analysis</h4>
                <p>${wtBetter} has better average waiting time (${Math.min(prioWT, srtfWT).toFixed(2)}).</p>
            </div>

            <div class="analysis-box">
                <h4>Turnaround Time Analysis</h4>
                <p>${tatBetter} has better average turnaround time (${Math.min(prioTAT, srtfTAT).toFixed(2)}).</p>
            </div>

            <div class="analysis-box">
                <h4>Response Time Analysis</h4>
                <p>${rtBetter} has better average response time (${Math.min(prioRT, srtfRT).toFixed(2)}).</p>
            </div>

            <!--  Starvation -->
            <div class="analysis-box">
                <h4>Starvation Analysis</h4>
                <p>${starvationRisk}</p>
            </div>

            <!--  Fairness -->
            <div class="analysis-box">
                <h4>Fairness Analysis</h4>
                <p>${fairnessText}</p>
            </div>

            <!--  Tie-breaking -->
            <div class="analysis-box">
                <h4>Tie-Breaking Rule</h4>
                <p>
                    If two processes have equal priority or remaining time,
                    FCFS (arrival order) is used.
                </p>
            </div>

            <div class="analysis-box">
                <h4>Final Decision</h4>
                <p>
                    Overall, ${finalWinner} performs better in this scenario
                    based on weighted comparison of WT, TAT, and RT.
                </p>
            </div>
        `;
    }


    // Chart
    const canvas = document.getElementById("comparisonChart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (window.myChart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {

        type: "bar",

        data: {

            labels: ["Waiting Time", "Turnaround Time"],

            datasets: [
                {
                    label: "Priority",
                    data: [prioWT, prioTAT],
                    backgroundColor: "#008080"
                },
                {
                    label: "SRTF",
                    data: [srtfWT, srtfTAT, srtfRT],
                    backgroundColor: "#ff8a65"
                }
            ]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
} 