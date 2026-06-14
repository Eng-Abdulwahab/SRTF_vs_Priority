CPU Scheduling Simulator

A modern web-based simulator for comparing CPU Scheduling Algorithms using interactive visualizations and performance analysis.

---

Overview

This project simulates and compares two CPU scheduling algorithms:

- Priority Scheduling
- Shortest Remaining Time First (SRTF)

The simulator allows users to:

- Add custom processes
- Run scheduling simulations
- View Gantt charts
- Analyze scheduling performance
- Compare algorithm efficiency

---

Features

- Interactive modern UI
- Add / delete processes dynamically
- Real-time simulation
- Gantt chart visualization
- Performance comparison dashboard
- Calculates CT, WT, TAT, RT
- Smart efficiency analysis
- Responsive design

---

Algorithms

Priority Scheduling

- Non-preemptive
- Lower number = higher priority

SRTF

- Preemptive
- Shortest remaining time first

---

Technologies

- HTML5
- CSS3
- JavaScript (ES6 Modules)
- Chart.js
- SweetAlert2
- Font Awesome

---

Project Structure

```text
 Project Root
├──  assets
│   ├──  .gitkeep
│   └──  screenshots
│       ├──  .gitkeep
│       ├──  case1.png
│       ├──  case2.png
│       ├──  case3.png
│       ├──  case4.png
│
├──  src
│   ├── gui
│   │   ├──  index.html
│   │   ├──  script.js
│   │   └──  style.css
│   │
│   ├──  metrics
│   │   ├──  .gitkeep
│   │   └──  Calculator.js
│   │
│   ├──  model
│   │   ├──  .gitkeep
│   │   └── Process.js
│   │
│   ├──  scheduler
│   │   ├──  .gitkeep
│   │   ├──  Priority.js
│   │   └──  SRTF.js
│   │
│   └──  util
│       ├──  .gitkeep
│       └──  ChartHelper.js
│
├──   test-cases
│   ├──  .gitkeep
│   ├──  case1.txt
│   ├──  case2.txt
│   ├──  case3.txt
│   └──  case4.txt
│
└──  README.md
```

---

Each test case is designed to demonstrate a specific scheduling behavior:

- Case 1: Basic scheduling comparison
- Case 2: Preemption effect in SRTF
- Case 3: Starvation in Priority scheduling
- Case 4: Identical behavior when inputs are uniform

Screnshots
["case1" (screenshots/case1.png)]
["case2" (screenshots/case2.png)]
["case3" (screenshots/case3.png)]
["case4" (screenshots/case4.png)]

---

How to Run

git clone YOUR_REPOSITORY_LINK

- Open project folder
- Run using Live Server IN VSC

---

Example Scenario

Input

Process| Arrival| Burst | Priority
P1 | 0 | 5 | 2
P2 | 1 | 3 | 1
P3 | 2 | 8 | 4

---

Output (Priority)

Process| CT| TAT| WT| RT
P1 | 5 | 5 | 0 | 0
P2 | 8 | 7 | 4 | 4
P3 | 16| 14 | 6 | 6

---

Output (SRTF)

Process| CT | TAT| WT | RT
P2 | 4 | 3 | 0 | 0
P1 | 8 | 8 | 3 | 0
P3 | 16 | 14 | 6 | 6

---

Metrics

- Completion Time (CT)
- Turnaround Time (TAT)
- Waiting Time (WT)
- Response Time (RT)

---
