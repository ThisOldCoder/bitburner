// Facade for NS server object. Responsible for preparing the server to be 
// hacked, providing useful information on the server, its state, etc.
export class TargetServer {
    ns; // Netscript handle
    targetName; // Name of target server to hack
    target; // Target server to hack
    player; // Player object
    cores; // Cores available on script host
    rating = 0; // Estimating how fat this target is, higher is better
    constructor(ns, targetName, host) {
        this.ns = ns;
        this.targetName = targetName;
        this.target = ns.getServer(targetName);
        this.player = ns.getPlayer();
        if (typeof host === undefined) {
            this.cores = 1;
        }
        else {
            this.cores = host?.cpuCores;
        }
        this.deriveRating();
    }
    prepareServer() {
        this.ns.tprintf('threads: ' + this.threadCountToWeaken());
    }
    threadCountToWeaken() {
        const securityLevel = this.ns.getServerSecurityLevel(this.targetName);
        const minSecurityLevel = this.ns.getServerMinSecurityLevel(this.targetName);
        const securityDiff = securityLevel - minSecurityLevel;
        return securityDiff / this.weakenFactor();
    }
    weakenFactor() {
        return this.ns.weakenAnalyze(1, this.cores);
    }
    deriveRating() {
        const hackLevel = this.ns.getHackingLevel();
        const hackRequired = this.ns.getServerRequiredHackingLevel(this.targetName);
        const maxMoney = this.ns.getServerMaxMoney(this.targetName);
        const hackP = (hackLevel - hackRequired) / hackLevel;
        const timeToWeaken = this.ns.formulas.hacking.weakenTime(this.target, this.player);
        const hackC = this.ns.formulas.hacking.hackChance(this.target, this.player);
        this.rating = maxMoney * hackP * hackC / timeToWeaken;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFyZ2V0X3NlcnZlci5qcyIsInNvdXJjZVJvb3QiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc291cmNlcy8iLCJzb3VyY2VzIjpbInRhcmdldF9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsMkVBQTJFO0FBQzNFLHNFQUFzRTtBQUN0RSxNQUFNLE9BQU8sWUFBWTtJQUN4QixFQUFFLENBQUMsQ0FBSSxtQkFBbUI7SUFDMUIsVUFBVSxDQUFDLENBQUUsZ0NBQWdDO0lBQzdDLE1BQU0sQ0FBQyxDQUFHLHdCQUF3QjtJQUNsQyxNQUFNLENBQUMsQ0FBRyxnQkFBZ0I7SUFDMUIsS0FBSyxDQUFDLENBQUcsaUNBQWlDO0lBQzFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBRSxzREFBc0Q7SUFFbkUsWUFBYSxFQUFNLEVBQUUsVUFBa0IsRUFBRSxJQUFhO1FBQ3JELElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRTdCLElBQUksT0FBTyxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFBO1NBQ2Q7YUFBTTtZQUNOLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxFQUFFLFFBQVEsQ0FBQztTQUM1QjtRQUVELElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsYUFBYTtRQUNaLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCxtQkFBbUI7UUFDbEIsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdEUsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1RSxNQUFNLFlBQVksR0FBRyxhQUFhLEdBQUcsZ0JBQWdCLENBQUM7UUFDdEQsT0FBTyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCxZQUFZO1FBQ1gsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxZQUFZO1FBQ0wsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUM1QyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsRixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1RCxNQUFNLEtBQUssR0FBRyxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsR0FBRyxTQUFTLENBQUM7UUFDckQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxHQUFHLEtBQUssR0FBRyxLQUFLLEdBQUcsWUFBWSxDQUFDO0lBQ3ZELENBQUM7Q0FDRCJ9