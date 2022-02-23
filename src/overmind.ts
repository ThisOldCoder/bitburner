import { NS, ProcessInfo, Server } from '@ns'
import { HackableServer } from '/hackable_server'

export async function main(ns: NS) {
	const hacker = new HackableServer(ns, 'the-hub');
	hacker.prepareServer();
}