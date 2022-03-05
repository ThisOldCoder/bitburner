export class PlayerFacade {
    ns; // Netscript handle
    player; // Player object
    constructor(ns) {
        this.ns = ns;
        this.player = ns.getPlayer();
    }
    // Max number of ports the player can currently hack based on available programs.
    maxHackablePorts() {
        const hackPrograms = [
            "BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe"
        ];
        let count = 0;
        for (const program in hackPrograms)
            if (this.ns.fileExists(program, "home"))
                count++;
        return count;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyX2ZhY2FkZS5qcyIsInNvdXJjZVJvb3QiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvc291cmNlcy8iLCJzb3VyY2VzIjpbInNjcmlwdHMvcGxheWVyX2ZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLE9BQU8sWUFBWTtJQUN4QixFQUFFLENBQUMsQ0FBSSxtQkFBbUI7SUFDMUIsTUFBTSxDQUFDLENBQUcsZ0JBQWdCO0lBRTFCLFlBQWEsRUFBTTtRQUNsQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNQLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2pDLENBQUM7SUFFRCxpRkFBaUY7SUFDakYsZ0JBQWdCO1FBQ2xCLE1BQU0sWUFBWSxHQUFHO1lBQ3BCLGNBQWMsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLGNBQWMsRUFBRSxlQUFlO1NBQUMsQ0FBQztRQUM3RSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDcEIsS0FBSyxNQUFNLE9BQU8sSUFBSSxZQUFZO1lBQ2pDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztnQkFDMUIsS0FBSyxFQUFFLENBQUM7UUFFaEIsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztDQUNKIn0=