import { NS, Server } from '@ns'
import { notStrictEqual } from 'assert';
import { Z_NO_FLUSH } from 'zlib';
import { PlayerFacade } from '/scripts/player_facade';

// Facade for NS server object. Responsible for preparing the server to be 
// hacked, providing useful information on the server, its state, etc.
// Used for all kinds of servers, hack targets, script hosts, both, etc.
export class ServerFacade {
	ns;				// Netscript handle
	serverName; 	// Name of server
	server: Server;	// Actual server object
	player;			// Player object
	cores;			// Cores available
	rating = 0;		// Estimating how fat this.server is, higher is better
	openPorts = 0;	// Num of ports which have been hacked

	constructor (ns: NS, serverName: string) {
		this.ns = ns;
		this.serverName = serverName;
		this.server = ns.getServer(serverName);
		this.player = new PlayerFacade(ns);
		this.cores = this.server.cpuCores;
	}

	prepareServer(): void {
		this.hackPorts();
	}

	hackPorts(): void {
		const hackPrograms = [
			"BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"];
		for (let i = 0; i < hackPrograms.length; ++i) {
			if (this.ns.fileExists(hackPrograms[i], "home")) {
				if (i === 0 && !this.server.sshPortOpen)  { this.ns.brutessh(this.serverName);  }
				if (i === 1 && !this.server.ftpPortOpen)  { this.ns.ftpcrack(this.serverName);  }
				if (i === 2 && !this.server.smtpPortOpen) { this.ns.relaysmtp(this.serverName); }
				if (i === 3 && !this.server.httpPortOpen) { this.ns.httpworm(this.serverName);  }
				if (i === 4 && !this.server.sqlPortOpen)  { this.ns.sqlinject(this.serverName); }
			}
		}

		this.openPorts = this.server.openPortCount;
	}

	isHackable(): boolean {
		if (this.server.numOpenPortsRequired > this.server.openPortCount)
			return false;
		return true;
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
		const timeToWeaken = this.ns.formulas.hacking.weakenTime(this.server, this.player.player);
		const hackC = this.ns.formulas.hacking.hackChance(this.server, this.player.player);
		this.rating = maxMoney * hackP * hackC / timeToWeaken;
	}
}