import "reflect-metadata";
import { inject, injectable } from "inversify";
import * as format from "biguint-format";
import * as crypto from "crypto";
import { TYPES } from "../utils/Constants";
import { Logger } from "../utils/logger/Logger";
import { MainPresenter } from "../presenter/MainPresenter";
import { MainService } from "./MainService";
import { RequestApiGWModel } from "../models/RequestApiGWModel";
import { StorageAdapter } from "../adapters/storage/StorageAdapter";

@injectable()
export class MainServiceImpl implements MainService {
	constructor(
		@inject(TYPES.MainPresenter) private presenter: MainPresenter,
		@inject(TYPES.StorageAdapter) private storage: StorageAdapter,
		@inject(TYPES.Logger) private LOGGER: Logger
	) {}
	async processData(payload: RequestApiGWModel): Promise<any> {
		if (Number(payload.fileSize) > 200000 || payload.fileName.split(".")[1] !== "csv") {
			this.LOGGER.info("File not suitable");
			return this.presenter.generateErrorRequestResponse("File not suitable");
		}
		const keyFile = `${this.#_generateRqUID()}.csv`;
		try {
			const ulrSigned = await this.storage.getSignedUploadUrl(keyFile);
			this.LOGGER.debug("Data signed", { ulrSigned });
			return this.presenter.generateOkResponse({ ulrSigned });
		} catch (error) {
			this.LOGGER.error({ error });
			return this.presenter.generateInternalErrorResponse("Internal error, dont get urlsigned");
		}
	}

	#_generateRqUID = (): number => format(crypto.randomBytes(4), "dec");
}
