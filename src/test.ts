import { NS } from '@ns'
import { Scanner } from '/scripts/scanner'
import { TargetServer } from '/target_server';

export async function main(ns : NS) : Promise<void> {
    if (ns.args.find(element => element === 'scanner'))
        testScanner(ns);
    if (ns.args.find(element => element === 'target_server'))
        testTargetServer(ns);
}

function testScanner(ns: NS): void {
    const scanner = new Scanner(ns);
    scanner.scanServers();
    for(const server of scanner.serverList)
        ns.tprintf(server.targetName + ": " + server.rating )
}

function testTargetServer(ns: NS): void {
    const target = new TargetServer(ns, 'the-hub');
    ns.tprintf('Threads to weaken: ' + target.threadCountToWeaken());
}