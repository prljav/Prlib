import type { CustomEventListener } from "./types";

export class EventManager {
	eventListeners: Record<string, CustomEventListener[]> = {};

	addEventListener(event: string, listener: CustomEventListener) {
		if (!this.eventListeners[event]) {
			this.eventListeners[event] = [];
		}
		this.eventListeners[event].push(listener);
	}

	removeEventListener(event: string, listener: CustomEventListener) {
		if (!this.eventListeners[event]) return;
		this.eventListeners[event] = this.eventListeners[event].filter(
			(l) => l !== listener,
		);
	}

	dispatchEvent(event: string, ...args: unknown[]) {
		if (!this.eventListeners[event]) return;
		for (const listener of this.eventListeners[event]) {
			listener(args);
		}
	}
}
