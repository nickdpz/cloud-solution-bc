export interface MainController {
	handleEvent(event: object): Promise<any>;
}
