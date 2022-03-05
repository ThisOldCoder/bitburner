import { NS } from '@ns'
import { ServerFacade } from '/scripts/server_facade'

export class Scanner {
    ns;			                            // Netscript handle
    serverList = Array<ServerFacade>();     // Periodically updated list of servers
    fourHours = 14400000;                   // 4 hours in milliseconds

    constructor (ns: NS) {
        this.ns = ns;
    }

    async scanLoop(): Promise<void> {
        while (true) {
            this.scanServers();
            await this.ns.sleep(this.fourHours);
        }
    }

    scanServers(): void {
        this.analyzeServers(['home']);
        this.serverList.sort(function(a: ServerFacade, b: ServerFacade) {
            return b.rating - a.rating
        });
    }

    analyzeServers(servers: Array<string>): void {
        const hackLevel = this.ns.getHackingLevel();
        for (let i = 0; i < servers.length; i++) {
            const hackRequired = this.ns.getServerRequiredHackingLevel(servers[i]);
            if (servers[i] != 'home' && (hackLevel / 2) >= hackRequired) {
                this.addOrUpdateServer(servers[i])
            }
            const nearest = this.ns.scan(servers[i]);
            if (servers[0] != 'home')
                nearest.shift();
            if (nearest.length > 0)
                this.analyzeServers(nearest);
        }
    }

    addOrUpdateServer(server: string): void {
        const existing = this.serverList.find( ({ serverName }) => serverName === server );
        if (existing === undefined)
            this.serverList.push(new ServerFacade(this.ns, server));
        else
            existing.deriveRating();
    }

    // Max number of ports the player can currently hack based on available programs.
    maxHackablePorts(): number {
		const hackPrograms = [
			"BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"];
        let count = 0;
		for (const program in hackPrograms)
			if (this.ns.fileExists(program, "home"))
                count++;

        return count;
    }
}