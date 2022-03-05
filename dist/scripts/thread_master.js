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
        this.ns.tprint("foo");
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
        if (!this.ns.fileExists(this.scriptPath, serverName))
            await this.ns.scp(this.scriptPath, serverName);
    }
    // Initiate scripts on host with target and thread count.
    initiateScript(serverName, threadCount) {
        this.ns.exec(this.scriptPath, this.targetName, threadCount);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyZWFkX21hc3Rlci5qcyIsInNvdXJjZVJvb3QiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc291cmNlcy8iLCJzb3VyY2VzIjpbInNjcmlwdHMvdGhyZWFkX21hc3Rlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFTQSwwRUFBMEU7QUFDMUUsaURBQWlEO0FBQ2pELE1BQU0sT0FBTyxZQUFZO0lBQ3JCLEVBQUUsQ0FBQyxDQUFPLG1CQUFtQjtJQUM3QixVQUFVLENBQUMsQ0FBSyw0QkFBNEI7SUFDNUMsVUFBVSxDQUFDLENBQUsseUJBQXlCO0lBQ3pDLFdBQVcsQ0FBQyxDQUFJLDZCQUE2QjtJQUU3QyxZQUFhLEVBQU0sRUFBRSxVQUFrQixFQUFFLFVBQWtCLEVBQUUsV0FBbUI7UUFDNUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUNuQyxDQUFDO0lBRUQscUJBQXFCO1FBQ2pCLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCw0REFBNEQ7SUFDNUQsU0FBUztRQUNMLElBQUksUUFBUSxHQUE0QixFQUFFLENBQUM7UUFFM0MsOENBQThDO1FBQzlDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFL0IsK0JBQStCO1FBQy9CLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQ3BCLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFaEMsT0FBTyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUVELFlBQVk7UUFDUixNQUFNLFFBQVEsR0FBNEIsRUFBRSxDQUFDO1FBRTdDLEtBQUksTUFBTSxVQUFVLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxF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