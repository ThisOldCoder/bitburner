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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFyZ2V0X3NlcnZlci5qcyIsInNvdXJjZVJvb3QiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc291cmNlcy8iLCJzb3VyY2VzIjpbInNjcmlwdHMvdGFyZ2V0X3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSwyRUFBMkU7QUFDM0Usc0VBQXNFO0FBQ3RFLE1BQU0sT0FBTyxZQUFZO0lBQ3hCLEVBQUUsQ0FBQyxDQUFJLG1CQUFtQjtJQUMxQixVQUFVLENBQUMsQ0FBRSxnQ0FBZ0M7SUFDN0MsTUFBTSxDQUFDLENBQUcsd0JBQXdCO0lBQ2xDLE1BQU0sQ0FBQyxDQUFHLGdCQUFnQjtJQUMxQixLQUFLLENBQUMsQ0FBRyxpQ0FBaUM7SUFDMUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFFLHNEQUFzRDtJQUVuRSxZQUFhLEVBQU0sRUFBRSxVQUFrQixFQUFFLElBQWE7UUFDckQsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFN0IsSUFBSSxPQUFPLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUE7U0FDZDthQUFNO1lBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEVBQUUsUUFBUSxDQUFDO1NBQzVCO1FBRUQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxhQUFhO1FBQ1osSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVELG1CQUFtQjtRQUNsQixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN0RSxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVFLE1BQU0sWUFBWSxHQUFHLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQztRQUN0RCxPQUFPLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVELFlBQVk7UUFDWCxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELFlBQVk7UUFDTCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzVDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xGLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVELE1BQU0sS0FBSyxHQUFHLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxHQUFHLFNBQVMsQ0FBQztRQUNyRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25GLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxZQUFZLENBQUM7SUFDdkQsQ0FBQztDQUNEIn0=