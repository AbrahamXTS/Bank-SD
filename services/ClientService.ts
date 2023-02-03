import { Client } from "../model";
import { AccountDAO, ClientDAO } from "../data";
import { ClientValidator } from "../validations";
import { AccountService } from "./AccountService";

export class ClientService {

	clientDAO = new ClientDAO();
	clientValidator = new ClientValidator();

	accountDAO = new AccountDAO();
	accountService = new AccountService();

	createNewClient( client: Client ): boolean {

		this.clientValidator.validateClient(client)
		
		if ((this.clientDAO.verifyExistByClientId(client.clientId))) 
			throw new Error(`The clientId '${client.clientId}' already exist in database.\n`);

		// El orden importa debido a que createAccounts internamente valida sus propios modelos 
		// antes de escribir en DB.
		this.accountService.createAccounts(client.accounts);
		this.clientDAO.createNewClient(client);

		return true;
	}

	modifyClient( clientId: string, name: string ): Client {

		if (!(this.clientDAO.verifyExistByClientId(clientId))) 
			throw new Error(`The clientId '${clientId}' not exist.\n`);

		const accounts = this.accountDAO.getAccountsByClientId(clientId);
		const clientEdited = { clientId, name, accounts };

		this.clientDAO.deleteClientByClientId(clientId)
		this.clientDAO.createNewClient(clientEdited);

		return clientEdited;
	}

	deleteClient( clientId: string ): boolean {

		if (!(this.clientDAO.verifyExistByClientId(clientId))) 
			throw new Error(`The clientId '${clientId}' not exist.\n`);

		this.accountService.deleteAccountsByClientId(clientId);
		this.clientDAO.deleteClientByClientId(clientId);

		return true;
	}
}