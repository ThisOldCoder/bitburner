import { NS, Server } from '@ns'

// Facade for NS server object. Responsible for preparing the server to be 
// hacked, providing useful information on the server, its state, etc.
// Used for all kinds of servers, hack targets, script hosts, both, etc.
export class ServerFacade {
	ns;				// Netscript handle
	serverName; 	// Name of server
	server;			// Actual server object
	player;			// Player object
	cores;			// Cores available
	rating = 0;		// Estimating how fat this.server is, higher is better

	constructor (ns: NS, serverName: string) {
		this.ns = ns;
		this.serverName = serverName;
		this.server = ns.getServer(serverName);
		this.player = ns.getPlayer();
		this.cores = this.server.cpuCores;

		this.deriveRating();
	}

	prepareServer(): void {
		this.ns.tprintf('threads: ' + this.threadCountToWeaken());
	}

	threadCountToWeaken(): number {
		const securityLevel = this.ns.getServerSecurityLevel(this.serverName);
		const minSecurityLevel = this.ns.getServerMinSecurityLevel(this.serverName);
		const securityDiff = securityLevel - minSecurityLevel;
		return securityDiff / this.weakenFactor();
	}
	
	weakenFactor(): number {
		return this.ns.weakenAnalyze(1, this.cores);
	}

	deriveRating(): void {
        const hackLevel = this.ns.getHackingLevel();
        const hackRequired = this.ns.getServerRequiredHackingLevel(this.serverName);
		const maxMoney = this.ns.getServerMaxMoney(this.serverName);
		const hackP = (hackLevel - hackRequired) / hackLevel;
		const timeToWeaken = this.ns.formulas.hacking.weakenTime(this.server, this.player);
		const hackC = this.ns.formulas.hacking.hackChance(this.server, this.player);
		this.rating = maxMoney * hackP * hackC / timeToWeaken;
	}
}