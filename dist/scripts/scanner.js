import { PlayerFacade } from '/scripts/player_facade';
import { ServerFacade } from '/scripts/server_facade';
// Scans for available targets, sorting by rating.
export class Scanner {
    ns; // Netscript handle
    serverList = Array(); // Periodically updated list of servers
    fourHours = 14400000; // 4 hours in milliseconds
    player; // Wrapper around player object
    constructor(ns) {
        this.ns = ns;
        this.player = new PlayerFacade(ns);
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
        const existing = this.serverList.find(({ serverName }) => serverName === server);
        if (existing === undefined) {
            const newServer = new ServerFacade(this.ns, server);
            newServer.deriveRating();
            this.serverList.push(newServer);
        }
        else
            existing.deriveRating();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nhbm5lci5qcyIsInNvdXJjZVJvb3QiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc291cmNlcy8iLCJzb3VyY2VzIjpbInNjcmlwdHMvc2Nhbm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFBO0FBRXJELGtEQUFrRDtBQUNsRCxNQUFNLE9BQU8sT0FBTztJQUNoQixFQUFFLENBQUMsQ0FBK0IsbUJBQW1CO0lBQ3JELFVBQVUsR0FBRyxLQUFLLEVBQWdCLENBQUMsQ0FBSyx1Q0FBdUM7SUFDL0UsU0FBUyxHQUFHLFFBQVEsQ0FBQyxDQUFtQiwwQkFBMEI7SUFDbEUsTUFBTSxDQUFlLENBQW1CLCtCQUErQjtJQUV2RSxZQUFhLEVBQU07UUFDZixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELEtBQUssQ0FBQyxRQUFRO1FBQ1YsT0FBTyxJQUFJLEVBQUU7WUFDVCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDdkM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVMsQ0FBZSxFQUFFLENBQWU7WUFDMUQsT0FBTyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUE7UUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsY0FBYyxDQUFDLE9BQXNCO1FBQ2pDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDNUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDckMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLElBQUksWUFBWSxFQUFFO2dCQUN6RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDckM7WUFDRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNO2dCQUNwQixPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDcEIsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDcEM7SUFDTCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsTUFBYztRQUM1QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxDQUFDLFVBQVUsS0FBSyxNQUFNLENBQUUsQ0FBQztRQUNuRixJQUFJLFFBQVEsS0FBSyxTQUFTLEVBQUU7WUFDeEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNwRCxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDbkM7O1lBRUcsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2hDLENBQUM7Q0FDSiJ9