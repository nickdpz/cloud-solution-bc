export interface MainService {
	processData(payload: any): Promise<object>;
}
