import { Account } from "../model";
import { AccountDAO } from "../data";
import { AccountValidator } from "../validations";

export class AccountService {

	accountDAO = new AccountDAO();
	accountValidator = new AccountValidator();

	createAccounts( accounts: Account[] ): boolean {

		accounts.forEach(({ accountId }) => {
			this.accountValidator.validateAccountId(accountId);
		});

		accounts.forEach((account) => {
			this.accountDAO.createAccount(account);
		});

		return true;
	}

	deleteAccountsByClientId( clientId: string ): boolean {

		const accounts = this.accountDAO.getAccountsByClientId(clientId);

		accounts.forEach((account) => this.accountValidator.validateBalanceZero(account));

		this.accountDAO.deleteAccountsByClientId(clientId);

		return true;
	}
}