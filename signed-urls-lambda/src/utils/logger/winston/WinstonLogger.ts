import { Logger as LoggerWinston, format } from "winston";
import * as winston from "winston";
import { Logger } from "../Logger";
import { CONSTANTS } from "../../Constants";
import { injectable } from "inversify";
@injectable()
export class WinstonLogger implements Logger {
	private LOGGER: LoggerWinston;

	constructor() {
		this.LOGGER = winston.createLogger({
			level: CONSTANTS.LOG_LEVEL,
			format: format.combine(format.splat(), format.json()),
			defaultMeta: {
				timestamp: new Date().toLocaleString("es-CO", { timeZone: CONSTANTS.TIMEZONE }),
			},
			transports: [new winston.transports.Console()],
		});
	}

	public debug(...args): void {
		this.LOGGER.debug.apply(null, args);
	}

	public error(...args): void {
		this.LOGGER.error.apply(null, args);
	}

	public info(...args): void {
		this.LOGGER.info.apply(null, args);
	}

	public warn(...args): void {
		this.LOGGER.warn.apply(null, args);
	}
}
