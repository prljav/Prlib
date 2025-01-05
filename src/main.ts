import { WebSocket, WebSocketServer } from "ws";

import { EventManager } from "./event";
import type { BotOptions, BotState, PacketType } from "./types";
import { removeAnsiCodes } from "./util";

const PR_WS = "wss://play.proceduralrealms.com/ws";

export class Bot extends EventManager {
	websocket: WebSocket;
	websocketServer: WebSocketServer;

	startTime = 0;
	isReady = false;

	options: BotOptions;
	botState: BotState;

	constructor(options: BotOptions) {
		super();
		this.botState = {
			x: undefined,
			y: undefined,
			region: undefined,
			map: undefined,
		};

		this.options = options;
		this.websocket = new WebSocket(PR_WS);

		if (this.options.debug === true) {
			this.runInDebugMode();
		}

		// Initialize the WebSocket connection
		this.websocket.on("open", () => {
			this.websocket.send(options.auth);
			this.startTime = Date.now();
		});

		this.websocket.on("message", (data: string) => {
			this.parsePacket(JSON.parse(data));
		});
	}

	runInDebugMode() {
		console.info("Running in debug mode");
		this.websocketServer = new WebSocketServer({
			port: 8008,
			host: "127.0.0.1",
		});
		this.websocketServer.on("connection", (client) => {
			console.log("client connected");
			client.on("message", (_data: unknown) => {
				const data = _data.toString();
				const reqId = JSON.parse(data).reqId;
				if (JSON.parse(data).cmd === "token") {
					return setTimeout(() => {
						client.send(
							`{"cmd":"token.success","msg":{"name":"Prljav","token":"sadsads"},"reqId":"${reqId}"}`,
						);
					}, 500);
				}
				this.websocket.send(data, { binary: false });
			});
		});
	}

	quit() {
		this.websocket.close();
	}

	runCmd(cmd: string) {
		this.websocket.send(JSON.stringify({ cmd: "cmd", msg: cmd }));
	}

	parsePacket(packet: PacketType) {
		//parsing for the mitm ws server
		if (this.options.debug === true) {
			this.websocketServer?.clients.forEach((client) => {
				client.send(JSON.stringify(packet));
			});
		}
		//end

		if ("cmd" in packet && packet.cmd === "room.describe") {
			try {
				this.botState.map = packet.msg.map.join("\n");

				const desc = packet.msg.desc;
				const cleanedDesc = removeAnsiCodes(desc);
				this.botState.region = cleanedDesc.split(" | ")[1].trim();
				const numbers = cleanedDesc.match(/(?<=[ ,])\d+(?=[ ,])/g);
				this.botState.x = Number(numbers[0]);
				this.botState.y = Number(numbers[1]);
				this.dispatchEvent("update", this.botState);
			} catch (e) {
				console.warn(`Failed to update bot state, ${e}`);
			}
		}

		if (!("cmd" in packet)) return;

		if (packet.cmd === "token.success") {
			this.isReady = true;
			this.dispatchEvent("ready", packet);
		}

		if (this.options.events?.all) {
			this.options.events.all(packet);
		}

		if (this.options.events[packet.cmd]) {
			this.options.events[packet.cmd](packet);
		}
	}

	sendToClient(msg: string) {
		if (this.options.debug !== true)
			throw "Not in debug mode, cannot use sendToClient";
		this.websocketServer?.clients.forEach((client) => {
			client.send(msg);
		});
	}
}
