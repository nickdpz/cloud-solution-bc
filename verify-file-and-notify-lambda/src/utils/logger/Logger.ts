export interface Logger {
	debug(...args): void;
	info(...args): void;
	error(...args): void;
	warn(...args): void;
}
