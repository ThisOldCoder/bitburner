// Checks all servers for available RAM to execute requested script across
// requested threads, spanning servers if needed.
export class ThreadMaster {
    ns; // Netscript handle
    scriptPath; // path to script to execute
    targetName; // name of server to hack
    threadCount; // number of threads required
    constructor(ns, scriptPath, targetName, threadCount) {
        this.ns = ns;
        this.scriptPath = scriptPath;
        this.targetName = targetName;
        this.threadCount = threadCount;
    }
    assignAndStartThreads() {
    }
    // Finds the best host or set of hosts for the given script.
    findHosts() {
        let hostList = [];
        // First try to put all threads on one server.
        hostList = this.allInOneHost();
        // Then try to spread them out.
        if (hostList.length == 0)
            hostList = this.spanHosts();
        return hostList;
    }
    allInOneHost() {
        const hostList = [];
        for (const serverName of this.serverNameList()) {
            if (this.threadCount <= this.maxThreadsOnServer(serverName)) {
                const threadAssignment = {
                    serverName: serverName,
                    threadCount: this.threadCount
                };
                hostList.push(threadAssignment);
            }
        }
        return hostList;
    }
    spanHosts() {
        const hostList = [];
        let unassignedThreads = this.threadCount;
        for (const serverName of this.serverNameList()) {
            const maxThreads = this.maxThreadsOnServer(serverName);
            if (maxThreads > 0) {
                const assignedThreads = Math.min(maxThreads, unassignedThreads);
                const threadAssignment = {
                    serverName: serverName,
                    threadCount: assignedThreads
                };
                hostList.push(threadAssignment);
                unassignedThreads -= assignedThreads;
            }
            if (unassignedThreads == 0)
                break;
        }
        return hostList;
    }
    // List existing personal servers, as well as home. home comes last,
    // as I want to save that, where possible, for preparing fresh,
    // unhacked servers due to the extra cores.
    serverNameList() {
        const list = [];
        for (let i = 1; i <= 25; i++) {
            const name = 'pserv-' + i;
            if (this.ns.serverExists(name))
                list.push(name);
        }
        list.push('home');
        return list;
    }
    // The most threads for the given script that can curently be run on the
    // given server considering available RAM.
    maxThreadsOnServer(serverName) {
        const host = this.ns.getServer(serverName);
        const scriptRam = this.ns.getScriptRam('/scripts/workers/weaken.js', 'home');
        const hostRam = this.ns.getServerMaxRam(host.hostname) - this.ns.getServerUsedRam(host.hostname);
        return Math.trunc(hostRam / scriptRam);
    }
    // Copy script to server.
    async deployScript(serverName) {
        await this.ns.scp(this.scriptPath, serverName);
    }
    // Initiate scripts on host with target and thread count.
    initiateScript(serverName, threadCount) {
        this.ns.exec(this.scriptPath, this.targetName, threadCount);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWFkX21hc3Rlci5qcyIsInNvdXJjZVJvb3QiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc291cmNlcy8iLCJzb3VyY2VzIjpbInRocmVhZF9tYXN0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUUEsMEVBQTBFO0FBQzFFLGlEQUFpRDtBQUNqRCxNQUFNLE9BQU8sWUFBWTtJQUNyQixFQUFFLENBQUMsQ0FBTyxtQkFBbUI7SUFDN0IsVUFBVSxDQUFDLENBQUssNEJBQTRCO0lBQzVDLFVBQVUsQ0FBQyxDQUFLLHlCQUF5QjtJQUN6QyxXQUFXLENBQUMsQ0FBSSw2QkFBNkI7SUFFN0MsWUFBYSxFQUFNLEVBQUUsVUFBa0IsRUFBRSxVQUFrQixFQUFFLFdBQW1CO1FBQzVFLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDbkMsQ0FBQztJQUVELHFCQUFxQjtJQUVyQixDQUFDO0lBRUQsNERBQTREO0lBQzVELFNBQVM7UUFDTCxJQUFJLFFBQVEsR0FBNEIsRUFBRSxDQUFDO1FBRTNDLDhDQUE4QztRQUM5QyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRS9CLCtCQUErQjtRQUMvQixJQUFJLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQztZQUNwQixRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWhDLE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxZQUFZO1FBQ1IsTUFBTSxRQUFRLEdBQTRCLEVBQUUsQ0FBQztRQUU3QyxLQUFJLE1BQU0sVUFBVSxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRTtZQUMzQyxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVB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