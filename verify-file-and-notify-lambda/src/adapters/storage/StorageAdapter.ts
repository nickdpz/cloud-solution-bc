export interface StorageAdapter {
	getSignedUploadUrl(key: string): Promise<any>;
}
