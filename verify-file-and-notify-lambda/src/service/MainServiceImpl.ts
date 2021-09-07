import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../utils/Constants";
import { Logger } from "../utils/logger/Logger";
import { MainPresenter } from "../presenter/MainPresenter";
import { MainService } from "./MainService";
import { RequestServiceModel } from "../models/RequestServiceModel";
import { StorageAdapter } from "../adapters/storage/StorageAdapter";

@injectable()
export class MainServiceImpl implements MainService {
	constructor(
		@inject(TYPES.MainPresenter) private presenter: MainPresenter,
		@inject(TYPES.StorageAdapter) private storage: StorageAdapter,
		@inject(TYPES.Logger) private LOGGER: Logger
	) { }
	async processData(payload: RequestServiceModel): Promise<any> {
	}

}
