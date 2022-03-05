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
        this.player = ns.getPlayer();
        this.cores = this.server.cpuCores;
        this.deriveRating();
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
        const timeToWeaken = this.ns.formulas.hacking.weakenTime(this.server, this.player);
        const hackC = this.ns.formulas.hacking.hackChance(this.server, this.player);
        this.rating = maxMoney * hackP * hackC / timeToWeaken;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyX2ZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc291cmNlcy8iLCJzb3VyY2VzIjpbInNjcmlwdHMvc2VydmVyX2ZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFJQSwyRUFBMkU7QUFDM0Usc0VBQXNFO0FBQ3RFLHdFQUF3RTtBQUN4RSxNQUFNLE9BQU8sWUFBWTtJQUN4QixFQUFFLENBQUMsQ0FBSSxtQkFBbUI7SUFDMUIsVUFBVSxDQUFDLENBQUUsaUJBQWlCO0lBQzlCLE1BQU0sQ0FBUyxDQUFDLHVCQUF1QjtJQUN2QyxNQUFNLENBQUMsQ0FBRyxnQkFBZ0I7SUFDMUIsS0FBSyxDQUFDLENBQUcsa0JBQWtCO0lBQzNCLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBRSxzREFBc0Q7SUFDbkUsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLHNDQUFzQztJQUVyRCxZQUFhLEVBQU0sRUFBRSxVQUFrQjtRQUN0QyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBRWxDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsYUFBYTtRQUNaLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsU0FBUztRQUNSLE1BQU0sWUFBWSxHQUFHO1lBQ3BCLGNBQWMsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxlQUFlO1NBQUMsQ0FBQztRQUNuRixLQUFLLElBQUksQ0FBQyxHQUFHLENB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