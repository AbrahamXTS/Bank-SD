import { decode } from "../security";

export class Account {

	clientId: string;
	accountId: string;
	balance: number;

	constructor( clientId: string, accountId: string, balance: string ) {
		this.clientId = decode(clientId)!;
		this.accountId = decode(accountId)!;
		this.balance = Number(decode(balance)!);
	}
}