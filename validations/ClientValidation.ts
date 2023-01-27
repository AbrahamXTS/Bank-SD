import { Client } from "../model";

export class ClientValidator {

	validateClientId( clientId: string ): boolean {
		if (!(/^[0-9]{16}$/.test(clientId))) {
			throw new Error(`The clientId ${clientId} is not valid. Expected a string with 16 numbers from 0 to 9.\n`);
		}
		
		return true;
	}

	validateName( name: string ): boolean {
		if (!( /^[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?(( |\-)[a-zA-ZÀ-ÖØ-öø-ÿ]+\.?)*$/.test(name))) {
			throw new Error(`${name} client contains illegal characters in his/her name.\n`);
		}

		return true;
	}

	validateClient( client: Client ): boolean {
		return this.validateClientId( client.clientId ) && this.validateName( client.name );
	}
}