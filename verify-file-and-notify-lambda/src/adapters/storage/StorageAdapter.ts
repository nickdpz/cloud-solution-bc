export interface StorageAdapter {
	getAndSaveObject(key: string): Promise<any>;
}
