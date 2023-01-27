import path from "path";
import { readFileSync, writeFileSync } from "fs";

import { AccountDAO } from "./AccountDAO";
import { Account, Client } from "../model";

const dbPath = path.join("files", "clients.txt");

export class ClientDAO {

	private accountDAO = new AccountDAO();

	getAllClientsInfo(): Client[] {

		const reading = readFileSync(dbPath, { encoding: "utf-8" });

		const lines: string[] = reading.split("\n");

		// El último elemento es una linea vacía, generada por el salto de linea del último elemento.
		lines.pop();

		const clients: Client[] = lines.map((line) => {

			const properties: string[] = line.split(",");

			const name: string = properties[1];
			const clientId: string = properties[0];
			const accounts: Account[] = this.accountDAO.getAccountsByClientId(clientId);

			return new Client( clientId, name, accounts );
		});

		return clients;
	}

	verifyExistByClientId( clientId: string ): boolean {
		const clients = this.getAllClientsInfo();

		const index = clients.findIndex(
			(clientDB) => clientDB.clientId === clientId
		);

		return index >= 0;
	}

	createNewClient( client: Client ): void {
		writeFileSync(dbPath, `${client.clientId},${client.name}\n`, 
			{ encoding: "utf-8", flag: "a+" }
		);
	}
}