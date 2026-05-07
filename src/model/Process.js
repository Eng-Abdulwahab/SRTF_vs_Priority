export default class Process {
    constructor(pid, arrival, burst, priority) {
        this.pid = pid;
        this.arrival = arrival;
        this.burst = burst;
        this.priority = priority;
    }
}