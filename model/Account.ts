import { Security } from "../security";

export class Account {

	clientId: string;
	accountId: string;
	balance: number;

	constructor( clientId: string, accountId: string, balance: string ) {
		this.clientId = Security.decode(clientId)!;
		this.accountId = Security.decode(accountId)!;
		this.balance = Number(Security.decode(balance)!);
	}
}