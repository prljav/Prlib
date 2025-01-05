import { BotBase } from "./bot";
import { BotOptions, BotState, PacketType } from "./types";
import { removeAnsiCodes } from "./util";

class Bot extends BotBase {
	get botstate() {
		return this.botState;
	}
	get ws() {
		return this.websocket;
	}
	get wss() {
		return this.websocketServer;
	}
	get ready() {
		return this.isReady;
	}
}

export { Bot, BotOptions, BotState, PacketType, removeAnsiCodes };
