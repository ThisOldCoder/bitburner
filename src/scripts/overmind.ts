import { NS } from '@ns'
import { Scanner } from '/scripts/scanner';
import { ServerFacade } from '/scripts/server_facade';

class Overmind {
    ns;			        				// Netscript handle
	scanner;							// Scanner to find new hacking targets, holds list
	targetList: Array<ServerFacade>;	// List of hackable servers
	hostList: Array<ServerFacade>;		// List of host servers
	prepList: Array<ServerFacade>;		// List of servers being prepped for hacking
	hackList: Array<ServerFacade>;		// List of servers currently being hacked
	
	constructor(ns: NS) {
		this.ns = ns;
		this.scanner = new Scanner(this.ns);
		this.targetList = [];
		this.hostList = this.buildHostList();
		this.prepList = [];
		this.hackList = [];
	}

	async start(): Promise<void> {
		this.scanner.scanServers();
		this.ns.tprintf("Starting with " + this.hostList.length + " host(s).");
		await this.ns.sleep(3000);
		this.ns.tprintf("Starting with " + this.targetList.length + " viable target(s).");
	}

	buildHostList(): Array<ServerFacade> {
		const list: Array<ServerFacade> = [];
		list.push(new ServerFacade(this.ns, 'home'));
        for(let i = 1; i <= 25; i++) {
            const name = 'pserv-' + i;
            if (this.ns.serverExists(name))
                list.push(new ServerFacade(this.ns, name));
        }

		return list;
	}
}

export async function main(ns: NS): Promise<void> {
	const overmind = new Overmind(ns)
	await overmind.start();
}