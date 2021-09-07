import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../utils/Constants";
import { Logger } from "../utils/logger/Logger";
import { MainPresenter } from "../presenter/MainPresenter";
import { MainService } from "./MainService";
import { RequestServiceModel } from "../models/RequestServiceModel";
import { StorageAdapter } from "../adapters/storage/StorageAdapter";
import { FilesAdapter } from "../adapters/files/FilesAdapter";
import { CSVSchemaModel } from "../models/CSVSchemaModel"
import { HashAdapter } from "../adapters/hasher/HashAdapter";
import Ajv, { JSONSchemaType } from "ajv"

@injectable()
export class MainServiceImpl implements MainService {
	constructor(
		@inject(TYPES.MainPresenter) private presenter: MainPresenter,
		@inject(TYPES.StorageAdapter) private storage: StorageAdapter,
		@inject(TYPES.FilesAdapter) private files: FilesAdapter,
		@inject(TYPES.HashAdapter) private hash: HashAdapter,
		@inject(TYPES.Logger) private LOGGER: Logger
	) { }
	private ajv = new Ajv()

	private schema: JSONSchemaType<CSVSchemaModel[]> = {
		type: "array",
		items: {
			type: "object",
			properties: {
				cedula: { type: "string", pattern: "^[0-9]$", nullable: true },
				nombre: { type: "string", nullable: true }
			},
			required: ["cedula", "nombre"],
			additionalProperties: false
		}
	}
	private validate = this.ajv.compile(this.schema)

	async processData(payload: RequestServiceModel): Promise<any> {
		try {
			await this.storage.getAndSaveObject(payload.key);
			this.LOGGER.info("Downloaded file")
			const data = await this.files.readFile();
			this.LOGGER.debug(data);
			if (!this.validate(data)) {
				this.LOGGER.info("Invalid file")
				await this.storage.putObjectResponse(payload.key, { result: "fail", message: "Invalid file" })
			}
			const info = data.map((item: any) => {
				return { ...item, hash: this.hash.hashField(item.cedula) }
			})
			const url = await this.storage.putObjectResult(payload.key, info)
			await this.storage.putObjectResponse(payload.key, { result: "fail", url })
			return this.presenter.generateOkResponse(data);
		} catch (error) {
			this.LOGGER.error(error)
			throw this.presenter.generateInternalErrorResponse(error)
		}

	}
}
