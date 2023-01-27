import { Client } from "../model";
import { ClientDAO } from "../data";
import { ClientValidator } from "../validations";
import { AccountService } from "./AccountService";

export class ClientService {

	clientDAO = new ClientDAO();
	clientValidator = new ClientValidator();

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
}