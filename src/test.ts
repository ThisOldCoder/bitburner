import { NS } from '@ns'
import { Scanner } from '/scanner'

export async function main(ns : NS) : Promise<void> {
    if (process.argv.slice(2).find(element => element === 'scanner'))
        testScanner(ns);
}

function testScanner(ns: NS): void {
    const scanner = new Scanner(ns);
    scanner.scanServers();
    for(const server of scanner.serverList)
        ns.tprintf(server.targetName + ": " + server.rating )
}