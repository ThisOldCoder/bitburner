import { NS } from '@ns'

export class PlayerFacade {
	ns;				// Netscript handle
	player;			// Player object

	constructor (ns: NS) {
		this.ns = ns;
        this.player = ns.getPlayer();
    }

    // Max number of ports the player can currently hack based on available programs.
    maxHackablePorts(): number {
		const hackPrograms = [
			"BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"];
        let count = 0;
		for (const program in hackPrograms)
			if (this.ns.fileExists(program, "home"))
                count++;

        return count;
    }
}