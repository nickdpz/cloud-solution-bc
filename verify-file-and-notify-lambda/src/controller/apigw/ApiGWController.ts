import { MainController } from "../MainController";
import { inject, injectable } from "inversify";
import { MainService } from "../../service/MainService";
import { TYPES } from "../../utils/Constants";
import { S3Event } from "aws-lambda";

@injectable()
export class ApiGWController implements MainController {
	constructor(@inject(TYPES.MainService) private service: MainService) {}

	async handleEvent(event: S3Event): Promise<any> {
		event.Records.map(async (record) => {
			const { key, size } = record.s3.object;
			await this.service.processData({ key, size });
		});
	}
}
