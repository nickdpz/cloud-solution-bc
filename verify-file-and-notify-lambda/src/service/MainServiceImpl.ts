import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../utils/Constants";
import { Logger } from "../utils/logger/Logger";
import { MainPresenter } from "../presenter/MainPresenter";
import { MainService } from "./MainService";
import { RequestServiceModel } from "../models/RequestServiceModel";
import { StorageAdapter } from "../adapters/storage/StorageAdapter";
import { FilesAdapter } from "../adapters/files/FilesAdapter";

@injectable()
export class MainServiceImpl implements MainService {
	constructor(
		@inject(TYPES.MainPresenter) private presenter: MainPresenter,
		@inject(TYPES.StorageAdapter) private storage: StorageAdapter,
		@inject(TYPES.FilesAdapter) private files: FilesAdapter
		@inject(TYPES.Logger) private LOGGER: Logger
	) { }
	async processData(payload: RequestServiceModel): Promise<any> {
		await this.storage.getAndSaveObject(payload.key)
		const data = await this.files.readFile()
		this.LOGGER.debug(data)
		return this.presenter.generateOkResponse(data)
	}

}
