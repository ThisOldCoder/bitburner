import { TargetServer } from '/target_server';
export class Scanner {
    ns; // Netscript handle
    serverList = Array(); // Periodically updated list of servers
    fourHours = 14400000; // 4 hours in milliseconds
    constructor(ns) {
        this.ns = ns;
    }
    async scanLoop() {
        while (true) {
            this.scanServers();
            await this.ns.sleep(this.fourHours);
        }
    }
    scanServers() {
        this.analyzeServers(['home']);
        this.serverList.sort(function (a, b) {
            return b.rating - a.rating;
        });
    }
    analyzeServers(servers) {
        const hackLevel = this.ns.getHackingLevel();
        for (let i = 0; i < servers.length; i++) {
            const hackRequired = this.ns.getServerRequiredHackingLevel(servers[i]);
            if (servers[i] != 'home' && (hackLevel / 2) >= hackRequired) {
                this.addOrUpdateServer(servers[i]);
            }
            const nearest = this.ns.scan(servers[i]);
            if (servers[0] != 'home')
                nearest.shift();
            if (nearest.length > 0)
                this.analyzeServers(nearest);
        }
    }
    addOrUpdateServer(server) {
        const existing = this.serverList.find(({ targetName }) => targetName === server);
        if (existing === undefined)
            this.serverList.push(new TargetServer(this.ns, server));
        else
            existing.deriveRating();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nhbm5lci5qcyIsInNvdXJjZVJvb3QiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc291cmNlcy8iLCJzb3VyY2VzIjpbInNjYW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlDLE1BQU0sT0FBTyxPQUFPO0lBQ2hCLEVBQUUsQ0FBQyxDQUErQixtQkFBbUI7SUFDckQsVUFBVSxHQUFHLEtBQUssRUFBZ0IsQ0FBQyxDQUFLLHVDQUF1QztJQUMvRSxTQUFTLEdBQUcsUUFBUSxDQUFDLENBQWEsMEJBQTBCO0lBRTVELFlBQWEsRUFBTTtRQUNmLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCxLQUFLLENBQUMsUUFBUTtRQUNWLE9BQU8sSUFBSSxFQUFFO1lBQ1QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3ZDO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFTLENBQWUsRUFBRSxDQUFlO1lBQzFELE9BQU8sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFBO1FBQzlCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGNBQWMsQ0FBQyxPQUFzQjtRQUNqQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzVDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsNkJBQTZCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxJQUFJLFlBQVksRUFBRTtnQkFDekQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO2FBQ3JDO1lBQ0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTTtnQkFDcEIsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3BCLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUNsQixJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3BDO0lBQ0wsQ0FBQztJQUVELGlCQUFpQixDQUFDLE1BQWM7UUFDNUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxVQUFVLEtBQUssTUFBTSxDQUFFLENBQUM7UUFDbkYsSUFBSSxRQUFRLEtBQUssU0FBUztZQUN0QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7O1lBRXhELFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0NBQ0oifQ==