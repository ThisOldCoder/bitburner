import { Scanner } from '/scripts/scanner';
class Overmind {
    ns; // Netscript handle
    scanner; // Scanner to find new hacking targets, holds list
    constructor(ns) {
        this.ns = ns;
        this.scanner = new Scanner(this.ns);
        this.scanner.scanServers();
    }
    async start() {
        await this.ns.sleep(3000);
        this.ns.tprintf("Starting with " + this.scanner.serverList.length + " viable targets.");
    }
}
export async function main(ns) {
    const overmind = new Overmind(ns);
    await overmind.start();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3Zlcm1pbmQuanMiLCJzb3VyY2VSb290IjoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL3NvdXJjZXMvIiwic291cmNlcyI6WyJzY3JpcHRzL292ZXJtaW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUUzQyxNQUFNLFFBQVE7SUFDVixFQUFFLENBQUMsQ0FBVyxtQkFBbUI7SUFDcEMsT0FBTyxDQUFDLENBQUcsa0RBQWtEO0lBRTdELFlBQVksRUFBTTtRQUNqQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELEtBQUssQ0FBQyxLQUFLO1FBQ1YsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsa0JBQWtCLENBQUMsQ0FBQztJQUN6RixDQUFDO0NBQ0Q7QUFFRCxNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFNO0lBQ2hDLE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ2pDLE1BQU0sUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ3hCLENBQUMifQ==