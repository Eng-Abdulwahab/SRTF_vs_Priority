export function priorityScheduling(processes) {

    let procs = processes.map(p => ({ ...p, done: false }));

    let time = 0;
    let completed = 0;
    let n = procs.length;

    let gantt = [];
    let result = [];

    while (completed < n) {

        let idx = -1;
        let best = Infinity;

        for (let i = 0; i < n; i++) {
            if (!procs[i].done && procs[i].arrival <= time) {
                if (procs[i].priority < best) {
                    best = procs[i].priority;
                    idx = i;
                }
            }
        }

if (idx === -1) {
    gantt.push({
        pid: "IDLE",
        start: time,
        end: time + 1
    });
    time++;
    continue;
}

        let p = procs[idx];

        let start = time;
        time += p.burst;
        p.done = true;
        completed++;

        let ct = time;
        let tat = ct - p.arrival;
        let wt = tat - p.burst;
        let rt = start - p.arrival;

        result.push({ ...p, ct, tat, wt, rt });

        gantt.push({
            pid: p.pid,
            start,
            end: time
        });
    }

    return { result, gantt };
}