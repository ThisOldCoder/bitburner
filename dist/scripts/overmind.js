import { Scanner } from '/scripts/scanner';
import { ServerFacade } from '/scripts/server_facade';
class Overmind {
    ns; // Netscript handle
    scanner; // Scanner to find new hacking targets, holds list
    targetList; // List of hackable servers
    hostList; // List of host servers
    prepList; // List of servers being prepped for hacking
    hackList; // List of servers currently being hacked
    constructor(ns) {
        this.ns = ns;
        this.scanner = new Scanner(this.ns);
        this.targetList = [];
        this.hostList = this.buildHostList();
        this.prepList = [];
        this.hackList = [];
    }
    async start() {
        this.ns.tprintf("Starting with " + this.hostList.length + " host(s).");
        this.scanner.scanServers();
        await this.ns.sleep(3000);
        this.targetList = this.scanner.serverList;
        this.ns.tprintf("Starting with " + this.targetList.length + " viable target(s).");
    }
    buildHostList() {
        const list = [];
        list.push(new ServerFacade(this.ns, 'home'));
        for (let i = 1; i <= 25; i++) {
            const name = 'pserv-' + i;
            if (this.ns.serverExists(name))
                list.push(new ServerFacade(this.ns, name));
        }
        return list;
    }
}
export async function main(ns) {
    const overmind = new Overmind(ns);
    await overmind.start();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3Zlcm1pbmQuanMiLCJzb3VyY2VSb290IjoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL3NvdXJjZXMvIiwic291cmNlcyI6WyJzY3JpcHRzL292ZXJtaW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFdEQsTUFBTSxRQUFRO0lBQ1YsRUFBRSxDQUFDLENBQWUsbUJBQW1CO0lBQ3hDLE9BQU8sQ0FBQyxDQUFPLGtEQUFrRDtJQUNqRSxVQUFVLENBQXNCLENBQUMsMkJBQTJCO0lBQzVELFFBQVEsQ0FBc0IsQ0FBRSx1QkFBdUI7SUFDdkQsUUFBUSxDQUFzQixDQUFFLDRDQUE0QztJQUM1RSxRQUFRLENBQXNCLENBQUUseUNBQXlDO0lBRXpFLFlBQVksRUFBTTtRQUNqQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxLQUFLLENBQUMsS0FBSztRQUNWLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxDQUFDO1FBRXZFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDM0IsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQzFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLG9CQUFvQixDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVELGFBQWE7UUFDWixNQUFNLElBQUksR0FBd0IsRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDekIsTUFBTSxJQUFJLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQztZQUMxQixJQUFJLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztnQkFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDbEQ7UUFFUCxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7Q0FDRDtBQUVELE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQU07SUFDaEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDakMsTUFBTSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDeEIsQ0FBQyJ9