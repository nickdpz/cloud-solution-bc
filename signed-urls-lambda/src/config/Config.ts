import { Container } from "inversify";
import { TYPES } from "../utils/Constants";
import { MainPresenter } from "../presenter/MainPresenter";
import { ApiGWPresenter } from "../presenter/apigw/ApiGWPresenter";
import { MainService } from "../service/MainService";
import { MainServiceImpl } from "../service/MainServiceImpl";
import { MainController } from "../controller/MainController";
import { ApiGWController } from "../controller/apigw/ApiGWController";
import { WinstonLogger } from "../utils/logger/winston/WinstonLogger";
import { Logger } from "../utils/logger/Logger";
import { StorageAdapter } from "../adapters/storage/StorageAdapter";
import { S3Adapter } from "../adapters/storage/s3/S3Adapter";

const AppContainer: Container = new Container();

AppContainer.bind<MainPresenter>(TYPES.MainPresenter).to(ApiGWPresenter);
AppContainer.bind<MainService>(TYPES.MainService).to(MainServiceImpl);
AppContainer.bind<MainController>(TYPES.MainController).to(ApiGWController);
AppContainer.bind<Logger>(TYPES.Logger).to(WinstonLogger);
AppContainer.bind<StorageAdapter>(TYPES.StorageAdapter).to(S3Adapter);

export { AppContainer };
