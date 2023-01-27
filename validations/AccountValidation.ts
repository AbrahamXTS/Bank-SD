export class AccountValidator {

	validateAccountId( accountId: string ) {
		if (!(/^[0-9]{16}$/.test(accountId))) {
			throw new Error(`The accountId ${accountId} is not valid. Expected a string with 16 numbers from 0 to 9.\n`);
		}
	}
}