import { PlayerFacade } from '/scripts/player_facade';
// Facade for NS server object. Responsible for preparing the server to be 
// hacked, providing useful information on the server, its state, etc.
// Used for all kinds of servers, hack targets, script hosts, both, etc.
export class ServerFacade {
    ns; // Netscript handle
    serverName; // Name of server
    server; // Actual server object
    player; // Player object
    cores; // Cores available
    rating = 0; // Estimating how fat this.server is, higher is better
    openPorts = 0; // Num of ports which have been hacked
    constructor(ns, serverName) {
        this.ns = ns;
        this.serverName = serverName;
        this.server = ns.getServer(serverName);
        this.player = new PlayerFacade(ns);
        this.cores = this.server.cpuCores;
    }
    prepareServer() {
        this.hackPorts();
    }
    hackPorts() {
        const hackPrograms = [
            "BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"
        ];
        for (let i = 0; i < hackPrograms.length; ++i) {
            if (this.ns.fileExists(hackPrograms[i], "home")) {
                if (i === 0 && !this.server.sshPortOpen) {
                    this.ns.brutessh(this.serverName);
                }
                if (i === 1 && !this.server.ftpPortOpen) {
                    this.ns.ftpcrack(this.serverName);
                }
                if (i === 2 && !this.server.smtpPortOpen) {
                    this.ns.relaysmtp(this.serverName);
                }
                if (i === 3 && !this.server.httpPortOpen) {
                    this.ns.httpworm(this.serverName);
                }
                if (i === 4 && !this.server.sqlPortOpen) {
                    this.ns.sqlinject(this.serverName);
                }
            }
        }
        this.openPorts = this.server.openPortCount;
    }
    isHackable() {
        if (this.server.numOpenPortsRequired > this.server.openPortCount)
            return false;
        return true;
    }
    threadCountToWeaken() {
        const securityLevel = this.ns.getServerSecurityLevel(this.serverName);
        const minSecurityLevel = this.ns.getServerMinSecurityLevel(this.serverName);
        const securityDiff = securityLevel - minSecurityLevel;
        return securityDiff / this.weakenFactor();
    }
    weakenFactor() {
        return this.ns.weakenAnalyze(1, this.cores);
    }
    deriveRating() {
        const hackLevel = this.ns.getHackingLevel();
        const hackRequired = this.ns.getServerRequiredHackingLevel(this.serverName);
        const maxMoney = this.ns.getServerMaxMoney(this.serverName);
        const hackP = (hackLevel - hackRequired) / hackLevel;
        const timeToWeaken = this.ns.formulas.hacking.weakenTime(this.server, this.player.player);
        const hackC = this.ns.formulas.hacking.hackChance(this.server, this.player.player);
        this.rating = maxMoney * hackP * hackC / timeToWeaken;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyX2ZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc291cmNlcy8iLCJzb3VyY2VzIjpbInNjcmlwdHMvc2VydmVyX2ZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFdEQsMkVBQTJFO0FBQzNFLHNFQUFzRTtBQUN0RSx3RUFBd0U7QUFDeEUsTUFBTSxPQUFPLFlBQVk7SUFDeEIsRUFBRSxDQUFDLENBQUksbUJBQW1CO0lBQzFCLFVBQVUsQ0FBQyxDQUFFLGlCQUFpQjtJQUM5QixNQUFNLENBQVMsQ0FBQyx1QkFBdUI7SUFDdkMsTUFBTSxDQUFDLENBQUcsZ0JBQWdCO0lBQzFCLEtBQUssQ0FBQyxDQUFHLGtCQUFrQjtJQUMzQixNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUUsc0RBQXNEO0lBQ25FLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxzQ0FBc0M7SUFFckQsWUFBYSxFQUFNLEVBQUUsVUFBa0I7UUFDdEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ25DLENBQUM7SUFFRCxhQUFhO1FBQ1osSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxTQUFTO1FBQ1IsTUFBTSxZQUFZLEdBQUc7WUFDcEIsY0FBYyxFQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsY0FBYyxFQUFFLGVBQWU7U0FBQyxDQUFDO1FBQ25GLEtBQUss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