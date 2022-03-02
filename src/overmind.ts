import { NS, ProcessInfo, Server } from '@ns'
import { TargetServer } from '/target_server'

export async function main(ns: NS) {
	const hacker = new Server(ns, 'the-hub');
	hacker.prepareServer();
}