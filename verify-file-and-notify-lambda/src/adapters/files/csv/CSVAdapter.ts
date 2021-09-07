import * as parse from "csv-parse/lib/sync"
import { injectable } from "inversify";
import { CONSTANTS } from "../../../utils/Constants";
import { promises as fs } from "fs"
import { FilesAdapter } from "../FilesAdapter"

@injectable()
export class CSVAdapter implements FilesAdapter {
    constructor() { }
    async readFile(): Promise<any> {
        const fileContent = await fs.readFile(CONSTANTS.FILE_DOWNLOAD_NAME)
        const records = parse(fileContent, { columns: true })
        console.log(records)
        return records
    }
}