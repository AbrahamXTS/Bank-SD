export class Account {

	clientId: string;
	accountId: string;
	balance: number;

	constructor( clientId: string, accountId: string, balance: number ) {
		this.clientId = clientId;
		this.accountId = accountId;
		this.balance = balance;
	}
}