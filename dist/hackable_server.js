// Facade for NS server object. Responsible for preparing the server to be 
// hacked, providing useful information on the server, its state, etc.
export class HackableServer {
    ns; // Netscript handle
    targetName; // Name of target server to hack
    target; // Target server to hack
    player; // Player object
    cores; // Cores available on script host
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFja2FibGVfc2VydmVyLmpzIiwic291cmNlUm9vdCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zb3VyY2VzLyIsInNvdXJjZXMiOlsiaGFja2FibGVfc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLDJFQUEyRTtBQUMzRSxzRUFBc0U7QUFDdEUsTUFBTSxPQUFPLGNBQWM7SUFDMUIsRUFBRSxDQUFDLENBQUcsbUJBQW1CO0lBQ3pCLFVBQVUsQ0FBQyxDQUFDLGdDQUFnQztJQUM1QyxNQUFNLENBQUMsQ0FBRSx3QkFBd0I7SUFDakMsTUFBTSxDQUFDLENBQUUsZ0JBQWdCO0lBQ3pCLEtBQUssQ0FBQyxDQUFFLGlDQUFpQztJQUV6QyxZQUFhLEVBQU0sRUFBRSxVQUFrQixFQUFFLElBQWE7UUFDckQsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFN0IsSUFBSSxPQUFPLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUE7U0FDZDthQUFNO1lBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEVBQUUsUUFBUSxDQUFDO1NBQzVCO0lBQ0YsQ0FBQztJQUVELGFBQWE7UUFDWixJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsbUJBQW1CO1FBQ2xCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3RFLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUUsTUFBTSxZQUFZLEdBQUcsYUFBYSxHQUFHLGdCQUFnQixDQUFDO1FBQ3RELE9BQU8sWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQsWUFBWTtRQUNYLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBQ0QifQ==