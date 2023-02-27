import { Account } from "./Account";
import { decode } from "../security";

export class Client {

	clientId: string;
	name: string;
	accounts: Account[];

	constructor( clientId: string, name: string, accounts: Account[] ) {
		this.clientId = decode(clientId)!;
		this.name = decode(name)!;
		this.accounts = accounts;
	}
}