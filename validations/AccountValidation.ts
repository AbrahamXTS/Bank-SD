import { Account } from "../model";

export class AccountValidator {

	validateAccountId( accountId: string ) {
		if (!(/^[0-9]{16}$/.test(accountId))) {
			throw new Error(`The accountId ${accountId} is not valid. Expected a string with 16 numbers from 0 to 9.\n`);
		}
	}

	validateBalanceZero( { accountId, balance }: Account ) {
		if (balance !== 0) {
			throw new Error(`The account balance of ${accountId} is not zero.`);
		}
	}
}