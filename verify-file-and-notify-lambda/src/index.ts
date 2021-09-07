import "reflect-metadata";
import { AppContainer } from "./config/Config";
import { TYPES } from "./utils/Constants";
import { MainController } from "./controller/MainController";
import { WinstonLogger } from "./utils/logger/winston/WinstonLogger";

let controllerInstance: MainController;

export const handler = async (event: object, context: object): Promise<object> => {
	const logger = new WinstonLogger();
	logger.debug("Evento Recibido: %o \n Contexto de Ejecución: %o", event, context);
	try {
		controllerInstance = controllerInstance ?? AppContainer.get<MainController>(TYPES.MainController);
		return await controllerInstance.handleEvent(event);
	} catch (error) {
		throw error;
	}
};
