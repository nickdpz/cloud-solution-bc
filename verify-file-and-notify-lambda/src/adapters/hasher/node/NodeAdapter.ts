import { injectable } from "inversify";
import { HashAdapter } from "../HashAdapter";

import * as crypto from "crypto";

@injectable()
export class NodeAdapter implements HashAdapter {
    constructor(
    ) { }
    hashField(input: string): string {
        const paramHash = "10"
        const pwd = `${paramHash}: ${input}`;
        const hash = crypto.createHash("sha512").update(pwd).digest("base64");
        return hash;
    }
}