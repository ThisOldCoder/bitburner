import { NS } from '@ns'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { notStrictEqual } from 'assert';

type ThreadAssignment = {
    serverName: string,
    threadCount: number
}

// Checks all servers for available RAM to execute requested script across
// requested threads, spanning servers if needed.
export class ThreadMaster {
    ns;			    // Netscript handle
    scriptPath;     // path to script to execute
    targetName;     // name of server to hack
    threadCount;    // number of threads required

    constructor (ns: NS, scriptPath: string, targetName: string, threadCount: number) {
        this.ns = ns;
        this.scriptPath = scriptPath;
        this.targetName = targetName;
        this.threadCount = threadCount;
    }

    assignAndStartThreads(): void {
        this.ns.tprint("foo");
    }

    // Finds the best host or set of hosts for the given script.
    findHosts(): Array<ThreadAssignment> {
        let hostList: Array<ThreadAssignment> = [];

        // First try to put all threads on one server.
        hostList = this.allInOneHost();

        // Then try to spread them out.
        if (hostList.length == 0)
            hostList = this.spanHosts();

        return hostList;
    }

    allInOneHost(): Array<ThreadAssignment> {
        const hostList: Array<ThreadAssignment> = [];

        for(const serverName of this.serverNameList()) {
            if (this.threadCount <= this.maxThreadsOnServer(serverName)) {
                const threadAssignment: ThreadAssignment = {
                    serverName: serverName,
                    threadCount: this.threadCount
                }

                hostList.push(threadAssignment);
            }
        }

        return hostList;
    }

    spanHosts(): Array<ThreadAssignment> {
        const hostList: Array<ThreadAssignment> = [];

        let unassignedThreads = this.threadCount;

        for(const serverName of this.serverNameList()) {
            const maxThreads = this.maxThreadsOnServer(serverName);

            if (maxThreads > 0) {
                const assignedThreads = Math.min(maxThreads, unassignedThreads);
                const threadAssignment: ThreadAssignment = {
                    serverName: serverName,
                    threadCount: assignedThreads
                }

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
    serverNameList(): Array<string> {
        const list: Array<string> = [];

        for(let i = 1; i <= 25; i++) {
            const name = 'pserv-' + i;
            if (this.ns.serverExists(name))
                list.push(name);
        }
        list.push('home');

        return list;
    }

    // The most threads for the given script that can curently be run on the
    // given server considering available RAM.
    maxThreadsOnServer(serverName: string): number {
        const host = this.ns.getServer(serverName);
        const scriptRam = this.ns.getScriptRam('/scripts/workers/weaken.js', 'home');
        const hostRam =
            this.ns.getServerMaxRam(host.hostname) - this.ns.getServerUsedRam(host.hostname);

        return Math.trunc(hostRam / scriptRam);
    }

    // Copy script to server.
    async deployScript(serverName: string): Promise<void> {
        if (!this.ns.fileExists(this.scriptPath, serverName))
            await this.ns.scp(this.scriptPath, serverName);
    }

    // Initiate scripts on host with target and thread count.
    initiateScript(serverName: string, threadCount: number): void {
        this.ns.exec(this.scriptPath, this.targetName, threadCount);
    }
}