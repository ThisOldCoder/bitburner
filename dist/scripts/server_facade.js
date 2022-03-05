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
    constructor(ns, serverName) {
        this.ns = ns;
        this.serverName = serverName;
        this.server = ns.getServer(serverName);
        this.player = ns.getPlayer();
        this.cores = this.server.cpuCores;
        this.deriveRating();
    }
    prepareServer() {
        this.ns.tprintf('threads: ' + this.threadCountToWeaken());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyX2ZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc291cmNlcy8iLCJzb3VyY2VzIjpbInNjcmlwdHMvc2VydmVyX2ZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSwyRUFBMkU7QUFDM0Usc0VBQXNFO0FBQ3RFLHdFQUF3RTtBQUN4RSxNQUFNLE9BQU8sWUFBWTtJQUN4QixFQUFFLENBQUMsQ0FBSSxtQkFBbUI7SUFDMUIsVUFBVSxDQUFDLENBQUUsaUJBQWlCO0lBQzlCLE1BQU0sQ0FBQyxDQUFHLHVCQUF1QjtJQUNqQyxNQUFNLENBQUMsQ0FBRyxnQkFBZ0I7SUFDMUIsS0FBSyxDQUFDLENBQUcsa0JBQWtCO0lBQzNCLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBRSxzREFBc0Q7SUFFbkUsWUFBYSxFQUFNLEVBQUUsVUFBa0I7UUFDdEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUVsQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVELGFBQWE7UUFDWixJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsbUJBQW1CO1FBQ2xCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RFLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUUsTUFBTSxZQUFZLEdBQUcsYUFBYSxHQUFHLGdCQUFnQixDQUFDO1FBQ3RELE9BQU8sWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsWUFBWTtRQUNYLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsWUFBWTtRQUNMLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDNUMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEYsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUQsTUFBTSxLQUFLLEdBQUcsQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLEdBQUcsU0FBUyxDQUFDO1FBQ3JELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkYsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsR0FBRyxLQUFLLEdBQUcsS0FBSyxHQUFHLFlBQVksQ0FBQztJQUN2RCxDQUFDO0NBQ0QifQ==