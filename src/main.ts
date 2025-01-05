import { BotBase } from "./bot";
import { BotOptions } from "./types";
import { PacketType } from "./types";
import { BotState } from "./types";
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

export { Bot, BotOptions, PacketType, BotState, removeAnsiCodes }