export interface StorageAdapter {
	getAndSaveObject(key: string): Promise<any>;
	putObjectResponse(key: string, data: any): Promise<any>;
	putObjectResult(key: string, data: any): Promise<any>;
}
