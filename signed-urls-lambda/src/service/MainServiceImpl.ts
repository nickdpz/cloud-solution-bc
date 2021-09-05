import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../utils/Constants";
import { Logger } from "../utils/logger/Logger";
import { MainPresenter } from "../presenter/MainPresenter";
import { MainService } from "./MainService";
import { ResponseApiGatewayModel } from "../models/ResponseApiGWModel"

@injectable()
export class MainServiceImpl implements MainService {
	constructor(
		@inject(TYPES.MainPresenter) private presenter: MainPresenter,
		@inject(TYPES.Logger) private LOGGER: Logger
	) { }
	processData(payload: ResponseApiGatewayModel): Promise<any> {

		return Promise.resolve(this.presenter.generateOkResponse());
	}
}
