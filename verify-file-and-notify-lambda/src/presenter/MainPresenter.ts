import { ResponseGenericModel } from "../models/ResponseGenericModel"
export interface MainPresenter {
    generateOkResponse(body?: any): ResponseGenericModel;
    generateInternalErrorResponse(body: any): ResponseGenericModel;
}
