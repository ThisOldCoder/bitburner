import { Scanner } from '/scanner';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3Zlcm1pbmQuanMiLCJzb3VyY2VSb290IjoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL3NvdXJjZXMvIiwic291cmNlcyI6WyJvdmVybWluZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBR25DLE1BQU0sUUFBUTtJQUNWLEVBQUUsQ0FBQyxDQUFXLG1CQUFtQjtJQUNwQyxPQUFPLENBQUMsQ0FBRyxrREFBa0Q7SUFFN0QsWUFBWSxFQUFNO1FBQ2pCLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELEtBQUs7UUFDSixJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsa0JBQWtCLENBQUMsQ0FBQztJQUN6RixDQUFDO0NBQ0Q7QUFFRCxNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxFQUFNO0lBQ2hDLElBQUksUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQzFCLENBQUMifQ==