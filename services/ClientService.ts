import path from "path";
import pdf from "html-pdf";
import { Client } from "../model";
import { AccountDAO, ClientDAO } from "../data";
import { ClientValidator } from "../validations";
import { AccountService } from "./AccountService";

export class ClientService {

	private clientDAO = new ClientDAO();
	private clientValidator = new ClientValidator();

	private accountDAO = new AccountDAO();
	private accountService = new AccountService();

	// No entra como acoplamiento porque es explicitamente necesario que se llamen a las funciones debido a que ésta es la lógica de negocio.
	// Si la clasificaramos sería altamente acoplada porque requiere de otras funciones para funcionar (Pero no aplica).
	createNewClient( client: Client ) {

		this.clientValidator.validateClient(client)
		
		if ((this.clientDAO.verifyExistByClientId(client.clientId))) 
			throw new Error(`The clientId '${client.clientId}' already exist in database.\n`);

		// El orden importa debido a que createAccounts internamente valida sus propios modelos 
		// antes de escribir en DB.
		this.accountService.createAccounts(client.accounts);
		this.clientDAO.createNewClient(client);
	}

	modifyClient( clientId: string, name: string ) {

		if (!(this.clientDAO.verifyExistByClientId(clientId))) 
			throw new Error(`The clientId '${clientId}' not exist.\n`);

		const accounts = this.accountDAO.getAccountsByClientId(clientId);
		const clientEdited = { clientId, name, accounts };

		this.clientDAO.deleteClientByClientId(clientId)
		this.clientDAO.createNewClient(clientEdited);
	}

	deleteClient( clientId: string ) {

		if (!(this.clientDAO.verifyExistByClientId(clientId))) 
			throw new Error(`The clientId '${clientId}' not exist.\n`);

		this.accountService.deleteAccountsByClientId(clientId);
		this.clientDAO.deleteClientByClientId(clientId);
	}

	generateReport( name: string = "clientes" ) {
		const reportPath = path.join("files", `${name}.pdf`);

		let content = `<h1>Clientes: </h1>`;

		this.clientDAO.getAllClientsInfo().forEach((client) => {
			content += `<h3>${client.name} - ${client.clientId}</h3>
				
				<h4>Cuentas: </h4>
				`;

			content += `<ul>`;
			client.accounts.forEach((account) => {
				content += `<li>${account.accountId} - $${account.balance}</li>`
			});
			content += `</ul><hr />`;
		});

		pdf.create(content).toFile(reportPath, (err, res) => {
			if (err){
				console.log("Ocurrió un error mientras se generaba el reporte.");
			} else {
				console.log(`Archivo generado correctamente en ${reportPath}`);
			}
		});
	}
}