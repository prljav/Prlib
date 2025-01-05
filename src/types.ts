export type EventListener = (...args: unknown[]) => void;
export type PacketType = Array<unknown> | Record<string, unknown>;

export interface BotOptions {
	auth: string;
	events: Record<string, EventListener>;
	debug?: boolean;
}
export interface BotState {
	x: number | undefined;
	y: number | undefined;
	region: string | undefined;
	map: string | undefined;
}
