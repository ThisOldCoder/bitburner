import { NS } from '@ns'
import { Scanner } from '/scripts/scanner';

class Overmind {
    ns;			        // Netscript handle
	scanner;			// Scanner to find new hacking targets, holds list
	
	constructor(ns: NS) {
		this.ns = ns;
		this.scanner = new Scanner(this.ns);
	}

	async start(): Promise<void> {
		await this.ns.sleep(3000);
		this.ns.tprintf("Starting with " + this.scanner.serverList.length + " viable targets.");
	}
}

export async function main(ns: NS): Promise<void> {
	const overmind = new Overmind(ns)
	await overmind.start();
}