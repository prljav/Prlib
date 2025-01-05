import { WebSocket, type WebSocketServer } from "ws";
import type { BotOptions, BotState } from "./types";

const PR_WS = "wss://play.proceduralrealms.com/ws";

export class Bot {
	eventListeners: Record<string, EventListener[]> = {};
	websocket: WebSocket;
	websocketServer: WebSocketServer;

	startTime = 0;
	isReady = false;

	options: BotOptions;
	botState: BotState;

	constructor(options: BotOptions) {
		this.botState = {
			x: undefined,
			y: undefined,
			region: undefined,
			map: undefined,
		};

		this.options = options;
		this.websocket = new WebSocket(PR_WS);

		// Initialize the WebSocket connection
		this.websocket.on("open", () => {
			this.websocket.send(options.auth);
			this.startTime = Date.now();
		});

		this.websocket.on("message", (data: string) => {});
	}
}
