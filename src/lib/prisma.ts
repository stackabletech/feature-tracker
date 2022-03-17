import pkg, { PrismaClient } from '@prisma/client';
import { dev } from '$app/env';

declare global {
	var _prisma: PrismaClient; // eslint-disable-line
}

let pr;
if (dev) {
	if (!global._prisma) {
		global._prisma = new PrismaClient();
	}
	pr = global._prisma;
} else {
	const { PrismaClient } = pkg;
	pr = new PrismaClient();
}

export let prisma = pr;