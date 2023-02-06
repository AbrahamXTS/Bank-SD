import { Account } from "../model";
import { AccountDAO } from "../data";
import { AccountValidator } from "../validations";

export class AccountService {

	private accountDAO = new AccountDAO();
	private accountValidator = new AccountValidator();

	createAccounts( accounts: Account[] ) {

		accounts.forEach(({ accountId }) => {
			this.accountValidator.validateAccountId(accountId);
		});

		accounts.forEach((account) => {
			this.accountDAO.createAccount(account);
		});
	}

	deleteAccountsByClientId( clientId: string ) {

		const accounts = this.accountDAO.getAccountsByClientId(clientId);

		accounts.forEach((account) => this.accountValidator.validateBalanceZero(account));

		this.accountDAO.deleteAccountsByClientId(clientId);
	}
}