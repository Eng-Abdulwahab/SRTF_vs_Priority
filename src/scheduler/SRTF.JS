export function srtfScheduling(processes) {
    let procs = processes.map(p => ({
        ...p,
        remaining: p.burst,
        start: null,
        firstResponse: null // عشان نحسب الـ RT صح
    }));

    let time = 0, completed = 0, n = procs.length;
    let gantt = [], result = [];
    let lastPid = null, segmentStart = 0;

    while (completed < n) {
        let idx = -1;
        let minRemaining = Infinity;

        for (let i = 0; i < n; i++) {
            if (procs[i].arrival <= time && procs[i].remaining > 0) {
                if (procs[i].remaining < minRemaining) {
                    minRemaining = procs[i].remaining;
                    idx = i;
                } else if (procs[i].remaining === minRemaining) {
                    // لو تساووا في الوقت المتبقي، نختار اللي وصل الأول
                    if (procs[i].arrival < procs[idx].arrival) idx = i;
                }
            }
        }

        if (idx === -1) {
            if (lastPid !== "IDLE") {
                if (lastPid !== null) gantt.push({ pid: lastPid, start: segmentStart, end: time });
                segmentStart = time;
                lastPid = "IDLE";
            }
            time++;
            continue;
        }

        let p = procs[idx];
        
        // تسجيل أول مرة البروسيس مسكت الـ CPU لحساب الـ RT
        if (p.firstResponse === null) p.firstResponse = time;

        // لو حصل تبديل (Preemption)
        if (lastPid !== p.pid) {
            if (lastPid !== null) {
                gantt.push({ pid: lastPid, start: segmentStart, end: time });
            }
            segmentStart = time;
            lastPid = p.pid;
        }

        p.remaining--;
        time++;

        if (p.remaining === 0) {
            completed++;
            let ct = time;
            let tat = ct - p.arrival;
            let wt = tat - p.burst;
            let rt = p.firstResponse - p.arrival; // RT = First Start - Arrival

            result.push({ ...p, ct, tat, wt, rt });
            
            // قفل الشريحة الحالية
            gantt.push({ pid: p.pid, start: segmentStart, end: time });
            lastPid = null; 
            segmentStart = time;
        }
    }
    return { result, gantt };
}