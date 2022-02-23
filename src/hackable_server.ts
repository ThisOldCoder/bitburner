import { NS, ProcessInfo, Server } from '@ns'

// Facade for NS server object. Responsible for preparing the server to be 
// hacked, providing useful information on the server, its state, etc.
export class HackableServer {
	ns;			// Netscript handle
	targetName; // Name of target server to hack
	target;		// Target server to hack
	player;		// Player object
	cores;		// Cores available on script host

	constructor (ns: NS, targetName: string, host?: Server) {
		this.ns = ns;
		this.targetName = targetName;
		this.target = ns.getServer(targetName);
		this.player = ns.getPlayer();

		if (typeof host === undefined) {
			this.cores = 1
		} else {
			this.cores = host?.cpuCores;
		}
	}

	prepareServer() {
		this.ns.tprintf('threads: ' + this.threadCountToWeaken());
	}

	threadCountToWeaken() {
		let securityLevel = this.ns.getServerSecurityLevel(this.targetName);
		let minSecurityLevel = this.ns.getServerMinSecurityLevel(this.targetName);
		let securityDiff = securityLevel - minSecurityLevel;
		return securityDiff / this.weakenFactor();
	}
	
	weakenFactor() {
		return this.ns.weakenAnalyze(1, this.cores);
	}
}

export async function main(ns: NS) {
	const hacker = new HackableServer(ns, 'the-hub');
	hacker.prepareServer();
}