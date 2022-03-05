import { Scanner } from '/scripts/scanner';
class Overmind {
    ns; // Netscript handle
    scanner; // Scanner to find new hacking targets, holds list
    constructor(ns) {
        this.ns = ns;
        this.scanner = new Scanner(this.ns);
    }
    start() {
        this.ns.tprintf("Starting with " + this.scanner.serverList.length + " viable targets.");
    }
}
export async function main(ns) {
    new Overmind(ns).start();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3Zlcm1pbmQuanMiLCJzb3VyY2VSb290IjoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL3NvdXJjZXMvIiwic291cmNlcyI6WyJvdmVybWluZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFHM0MsTUFBTSxRQUFRO0lBQ1YsRUFBRSxDQUFDLENBQVcsbUJBQW1CO0lBQ3BDLE9BQU8sQ0FBQyxDQUFHLGtEQUFrRDtJQUU3RCxZQUFZLEVBQU07UUFDakIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsS0FBSztRQUNKLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7Q0FDRDtBQUVELE1BQU0sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEVBQU07SUFDaEMsSUFBSSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDMUIsQ0FBQyJ9