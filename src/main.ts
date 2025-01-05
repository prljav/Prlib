import { BotBase } from "./bot";

export class Bot extends BotBase {
	get botstate() {
		return this.botState;
	}
	get ws() {
		return this.websocket;
	}
	get wss() {
		return this.websocket;
	}
	get ready() {
		return this.isReady;
	}
}
