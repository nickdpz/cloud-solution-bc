import { StorageAdapter } from "../StorageAdapter";
import { injectable } from "inversify";
import { S3 } from "aws-sdk";
import { promises as fs } from "fs";
import { CONSTANTS } from "../../../utils/Constants";
@injectable()
export class S3Adapter implements StorageAdapter {
	constructor() {}
	private s3 = new S3();
	async getAndSaveObject(key: string): Promise<any> {
		const csv = await this.s3.getObject({ Bucket: CONSTANTS.BUCKET_NAME, Key: key }).promise();
		await fs.writeFile(CONSTANTS.FILE_DOWNLOAD_NAME, String(csv.Body));
	}
}
