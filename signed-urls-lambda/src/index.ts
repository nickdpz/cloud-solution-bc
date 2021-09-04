import { AppContainer } from "./config/Config";
import { TYPES } from "./utils/Constants";
import { MainController } from "./controller/MainController";

let controllerInstance: MainController;

export async function handler(event: object, context: object): Promise<object> {
	console.debug("Evento Recibido: %o \n Contexto de Ejecución: %o", event, context);
	try {
		controllerInstance =
			controllerInstance ?? AppContainer.get<MainController>(TYPES.MainController);
		return await controllerInstance.handleEvent(event);
	} catch (error) {
		throw error;
	}
}
