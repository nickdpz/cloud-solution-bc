import { StorageAdapter } from "../StorageAdapter";
import { injectable } from "inversify";
import { S3 } from "aws-sdk";
import { CONSTANTS } from "../../../utils/Constants";
@injectable()
export class S3Adapter implements StorageAdapter {
	constructor() { }

	private s3 = new S3({
		signatureVersion: 'v4'
	});

	private async getSignedUrl(key: string, type: string): Promise<any> {
		const expirationMinutes = 20;
		return this.s3.getSignedUrlPromise(type, {
			Bucket: CONSTANTS.BUCKET_NAME,
			Key: `${CONSTANTS.FOLDER_STORAGE}${key}`,
			Expires: CONSTANTS.SECONDS_OF_MINUTE * expirationMinutes,
			'Content-Type': 'application/vnd.ms-excel',
			ACL: 'public-read-write'
		});
	}

	public async getSignedUploadUrl(key: string): Promise<any> {
		return this.getSignedUrl(key, "putObject");
	}
}
