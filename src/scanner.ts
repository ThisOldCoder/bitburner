import { NS } from '@ns'

export class Scanner {
    ns;			        // Netscript handle
    serverList = [];    // Periodically updated list of servers

    const fourHours = 14400000; // 4 hours in milliseconds

    scanLoop(): void {
        while (true) {
            this.scanServers();
            await this.ns.sleep(this.fourHours);
        }
    }

    scanServers(): void {
        analyzeServers(['home']);
        serverList.sort(function(a, b) {
            return b.rating - a.rating
        });
    }

     analyzeServers(servers: Array<string>): void {
        const hackLevel = ns.getHackingLevel();
        for (let i = 0; i < servers.length; i++) {
            const hackRequired = ns.getServerRequiredHackingLevel(servers[i]);
            if (servers[i] != 'home' && hackLevel >= hackRequired) {
                const maxMoney = ns.getServerMaxMoney(servers[i]);
                const hackP = (hackLevel - hackRequired) / hackLevel;
                const timeToWeaken = ns.formulas.hacking.weakenTime(
                    this.ns.getServer(servers[i]), this.ns.getPlayer());
                const hackC = ns.formulas.hacking.hackChance(
                    this.ns.getServer(servers[i]), this.ns.getPlayer());
                this.serverList.push({
                    server: servers[i],
                    rating: maxMoney * hackP * hackC / timeToWeaken
                })
            }
            const nearest = this.ns.scan(servers[i]);
            if (servers[0] != 'home')
                nearest.shift();
            if (nearest.length > 0)
                this.analyzeServers(nearest);
        }
    }
}