import { Account } from "./Account";

export class Client {

	clientId: string;
	name: string;
	accounts: Account[];

	constructor( clientId: string, name: string, accounts: Account[] ) {
		this.clientId = clientId;
		this.name = name;
		this.accounts = accounts;
	}
}