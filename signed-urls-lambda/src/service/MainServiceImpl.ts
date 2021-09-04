import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../utils/Constants";
import { MainPresenter } from "../presenter/MainPresenter";
import { MainService } from "./MainService"

@injectable()
export class MainServiceImpl implements MainService {

	constructor(
		@inject(TYPES.MainPresenter) private presenter: MainPresenter
	) { }
	processData(payload: any): Promise<object> {
		return Promise.resolve(this.presenter.generateOkResponse())
	}
}
