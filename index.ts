import { ClientDAO } from "./data";
import { ClientService } from "./services";

(function main() {
	
	const clientDAO = new ClientDAO();
	const clientService = new ClientService();

	// clientService.createNewClient({ 
	// 	clientId: "2601202307440001", 
	// 	name: "John Doe",
	// 	accounts: [
	// 		{ clientId: "2601202307440001", accountId: "2601202307471000", balance: 300 },
	// 		{ clientId: "2601202307440001", accountId: "2601202307472000", balance: 500 }
	// 	],
	// });

	// clientService.createNewClient({ 
	// 	clientId: "0202202310190002", 
	// 	name: "Abraham Espinosa",
	// 	accounts: [
	// 		{ clientId: "0202202310190002", accountId: "0202202310533000", balance: 0 },
	// 		{ clientId: "0202202310190002", accountId: "0202202310534000", balance: 0 }
	// 	],
	// });

	// clientService.createNewClient({ 
	// 	clientId: "0302202312310003", 
	// 	name: "Adriana Guzmán",
	// 	accounts: [
	// 		{ clientId: "0302202312310003", accountId: "0302202312315000", balance: 0 },
	// 		{ clientId: "0302202312310003", accountId: "0302202312316000", balance: 0 }
	// 	],
	// });

	// clientService.deleteClient("0202202310190002");
	// clientService.modifyClient("2601202307440001", "Adjany Armenta");

	for (const client of clientDAO.getAllClientsInfo()) {
		console.log(client);
	}

	clientService.generateReport();
})();