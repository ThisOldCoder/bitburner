import { NS } from '@ns'

export async function main(ns : NS) : Promise<void> {
    const host = ns.getServer('home');
    const scriptRam = ns.getScriptRam('/scripts/workers/weaken.js', host);
    const hostRam = ns.getServerMaxRam(host.hostname) - ns.getServerUsedRam(host.hostname);
    ns.tprintf('Max threads: ' Math.trunc(hostRam / scriptRam));
}