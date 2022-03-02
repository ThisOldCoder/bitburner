import { NS } from '@ns'
import { TargetServer } from '/target_server';

export class Scanner {
    ns;			                            // Netscript handle
    serverList = Array<TargetServer>();     // Periodically updated list of servers
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
        this.serverList.sort(function(a: TargetServer, b: TargetServer) {
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
        const existing = this.serverList.find( ({ targetName }) => targetName === server );
        if (existing === undefined)
            this.serverList.push(new TargetServer(this.ns, server));
        else
            existing.deriveRating();
    }
}