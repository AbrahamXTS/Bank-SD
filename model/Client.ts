import { Account } from "./Account";
import { Security } from "../security";

export class Client {

	clientId: string;
	name: string;
	accounts: Account[];

	constructor( clientId: string, name: string, accounts: Account[] ) {
		this.clientId = Security.decode(clientId)!;
		this.name = Security.decode(name)!;
		this.accounts = accounts;
	}
}