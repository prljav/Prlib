export interface BotOptions {
  auth: string,
  events: Record<string, Function>,
  debug?: boolean
}

export interface BotState {
  x: number | undefined,
  y: number | undefined,
  region: string | undefined
}

export type EventListener = (...args: any[]) => void;
export type PacketType = Array<any> | Record<string, any>

