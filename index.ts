import { ClientDAO } from "./data";
import { ClientService } from "./services";

(function main() {
	
	const clientDTO = new ClientDAO();

	const clients = clientDTO.getAllClientsInfo();

	for (const client of clients) {
		console.log(client);
	}

	const clientService = new ClientService();

	clientService.createNewClient({ 
		clientId: "2601202307440001", 
		name: "John Doe",
		accounts: [
			{ clientId: "2601202307440001", accountId: "2601202307471000", balance: 300 },
			{ clientId: "2601202307440001", accountId: "2601202307472000", balance: 500 }
		],
	});
})();