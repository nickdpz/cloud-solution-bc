import { Container } from "inversify";
import { TYPES } from "../utils/Constants";
import { MainPresenter } from "../presenter/MainPresenter";
import { ApiGWPresenter } from "../presenter/apigw/ApiGWPresenter";
import { MainService } from "../service/MainService";
import { MainServiceImpl } from "../service/MainServiceImpl";
import { MainController } from "../controller/MainController";
import { ApiGWController } from "../controller/apigw/ApiGWController";
const AppContainer: Container = new Container();

AppContainer.bind<MainPresenter>(TYPES.MainPresenter).to(ApiGWPresenter);
AppContainer.bind<MainService>(TYPES.MainService).to(MainServiceImpl);
AppContainer.bind<MainController>(TYPES.MainController).to(ApiGWController);

export { AppContainer };
