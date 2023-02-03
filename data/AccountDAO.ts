import path from "path";
import { cleanFile } from "../utils"
import { readFileSync, writeFileSync } from "fs";

import { Account } from "../model";

const dbPath = path.join("files", "accounts.txt");

export class AccountDAO {

	getAllAccounts(): Account[] {
		const reading: string = readFileSync(dbPath, { encoding: "utf-8" });

		const lines: string[] = reading.split("\n");

		// El último elemento es una linea vacía, generada por el salto de linea del último elemento.
		lines.pop();

		const accounts: Account[] = lines.map((line) => {

			const properties: string[] = line.split(",");

			const clientId: string = properties[0];
			const accountId: string = properties[1];
			const balance: number = Number(properties[2]);

			return new Account(
				clientId, 
				accountId, 
				balance, 
			);
		});

		return accounts;
	}

	getAccountByAccountId( accountId: string ): Account | undefined {
		return this.getAllAccounts()
			.find((account) => account.accountId === accountId);
	}

	getAccountsByClientId( clientId: string ): Account[] {
		return this.getAllAccounts()
			.filter((account) => account.clientId === clientId);
	}

	createAccount( account: Account ): void {
		writeFileSync(dbPath, `${account.clientId},${account.accountId},${account.balance}\n`, 
			{ encoding: "utf-8", flag: "a+" }
		);
	}

	deleteAccountsByClientId( clientId: string ): void {
		const accounts = this.getAllAccounts();

		cleanFile(dbPath);

		accounts
			.filter((account) => account.clientId !== clientId)
			.forEach((account) => this.createAccount(account));
	}
}