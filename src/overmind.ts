import { NS, ProcessInfo, Server } from '@ns'
import { Scanner } from '/scanner';
import { TargetServer } from '/scripts/target_server'

class Overmind {
    ns;			        // Netscript handle
	scanner;			// Scanner to find new hacking targets, holds list
	
	constructor(ns: NS) {
		this.ns = ns;
		this.scanner = new Scanner(this.ns);
	}

	start(): void {
		this.ns.tprintf("Starting with " + this.scanner.serverList.length + " viable targets.");
	}
}

export async function main(ns: NS): Promise<void> {
	new Overmind(ns).start();
}