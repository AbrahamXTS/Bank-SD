**Describe el diseño de tu implementación de acuerdo a los referencias bibliográficas sugeridas durante 
la unidad 1 y/o artículos relacionados, utilizando los "conceptos generales de diseño" y/o conceptos 
asociados.**

El proceso de diseño que seguí para construir este proyecto fue basado en el proceso de desarrollo
de software clásico, empezando por recolectar todos los requerimientos posibles, continuando con 
seleccionar una de las arquitecturas más adecuadas y faciles de implementar (lo cual según la 
bibliografía podríamos considerarlo como diseño arquitectonico ya que no tenemos en cuenta el 
comportamiento final de los componentes), teniendo siempre en cuenta
hasta dónde planeabamos escalar el proyecto.

A continuación, empezamos con la fase de implementación, en la cual, considerando que posteriormente
nuestra app podría realizar cambios en modulos como persistencia de datos, llevamos a cabo una 
separación de nuestro proyecto en capas, separando cada parte del programa en roles 
muy definidos tales como: 

- Modelos
- Servicios
- Validaciones
- Data access objects (DAO)

Este último, sería uno de los modulos que sufriría cambios en el futuro, por lo cual, decidí seguir
el **principio de responsabilidad única** de SOLID que establece que cada método debería realizar
una única función (en otras palabras, maxificar la modularización), lo que posteriormente nos 
ayudaría a realizar refactorizaciones de manera más sencilla, ya que podríamos cambiar la manera 
en que funciona internamente sin tener que alterar otras partes del programa.

**Identifica de acuerdo a los referencias bibliográficas sugeridas durante la unidad 1 y/o artículos 
utilizados TRES "conceptos generales de diseño" y ejemplifica de forma explícita dónde se encuentran 
en tu implementación. Como sugerencia se recomienda, cuando sea posible, incluir una imagen/código/
diagrama o algun otro artefacto que apoye el ejemplo que presentas como evidencia.**

- El concepto general de diseño 'Descomposición y modularización', se define como dividir el código
en partes más pequeñas e independientes. En mi implementación se puede observar de forma explícita en:

```ts
createAccount( account: Account ): void {
	writeFileSync(dbPath, `${account.clientId},${account.accountId},${account.balance}\n`, 
		{ encoding: "utf-8", flag: "a+" }
	);
}
```

Donde se puede observar que colocamos únicamente la utilidad de escribir sobre el archivo la 
información de un cliente, esto es útil debido a que centraliza la funcionalidad de modificar el 
archivo.

- El concepto general de diseño 'Encapsulación', se define como empaquetar los elemtentos y 
detalles internos de una abstracción. En mi implementación se puede observar de forma explícita en:

```ts
export class AccountDAO {...}
```

Donde se puede observar que centralizamos todos los métodos de acceso a la base de datos en una sola
clase.

- El concepto general de diseño 'Abstracción', se define como el proceso de olvidarse de la información para poder tratar las cosas que son diferentes como si fueran iguales. En mi 
implementación se puede observar de forma explícita en:

```ts
export class Client {

	clientId: string;
	name: string;
	accounts: Account[];

	constructor( clientId: string, name: string, accounts: Account[] ) {
		this.clientId = clientId;
		this.name = name;
		this.accounts = accounts;
	}
}
```

**Identifica de acuerdo a los referencias bibliográficas sugeridas durante el la unidad 1 y/o 
artículos utilizados una "Actividad de diseño" y un "Elemento de diseño" y ejemplifica de forma 
explícita dónde se encuentran en tu implementación. Como sugerencia se recomienda, cuando sea posible, 
incluir una imagen/código/diagrama o algun otro artefacto que apoye el ejemplo que presentas como evidencia. **

- La actividad de diseño 'Satisfacer y descubrir restricciones', se define como darse cuenta que
'Una necesidad inicial no solo determina el problema a ser resuelto, sino también impone ciertas restricciones para solucionar dicho problema'. En mi implementación se puede observar de forma
explícita en: 

```ts
getAllAccounts(): Account[] {
	const reading: string = readFileSync(dbPath, { encoding: "utf-8" });

	const lines: string[] = reading.split("\n");

	lines.pop();	// <--

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
```

Donde se observa que se tiene que incluir la linea ```lines.pop()```, ya que, al ser un archivo de texto
tendremos un salto de linea adicional (debido a que lo usamos como separador de información), esto lo 
podemos representar como una restricción, ya que la información la tenemos que procesar de manera
imperativa debido a que un archivo de texto no es la manera más optima de guardar información.

- El elemento de diseño 'restricciones', se define como aquellos elementos que detienen el espacio de 
la solución del problema de diseño. En mi implementación se puede 
observar de forma explícita en: 

```ts
export const cleanFile = ( path: string ) => {
	writeFileSync(path, '');
}	
```

Donde se observa que tendremos que escribir un caracter vacío en un archivo para limpiarlo antes de
empezar a volver a escribir los elementos filtrados después de borrar o actualizar elementos. Todo
esto debido a que tenemos que usar un archivo de texto como mecanismo de persistencia de datos.

**Identifica de acuerdo a los referencias bibliográficas sugeridas durante el la unidad 1 y/o
artículos utilizados un "error de diseño" y ejemplifica de forma explícita dónde se encuentran en tu 
implementación. Como sugerencia se recomienda, cuando sea posible, incluir una imagen/código/diagrama o 
algun otro artefacto que apoye el ejemplo que presentas como evidencia.**

- El error de diseño 'incorrecto', se define como el hecho de que el diseño no satisfaga los requisitos del usuario de acuerdo a la funcionalidad o a sus características. En mi implementación se puede observar de forma explícita en:

```ts
deleteAccountsByClientId( clientId: string ): void {
	const accounts = this.getAllAccounts();

	cleanFile(dbPath);

	accounts
		.filter((account) => account.clientId !== clientId)
		.forEach((account) => this.createAccount(account));
}
```

Donde se observa que la información es cargada en memoria, borrada del archivo, filtrada y posteriormente vuelta a escribir. Lo cual, puede conllevar en un futuro problemas de rendimiento.

**Considera la siguiente funcionalidad para el diseño de tu implementación:**

- **Generar los reporte de lista de clientes en PDF.**
- **Un mecanismos de seguridad via encripción de datos para la BD, que permita configurar hasta 3 
algoritmos diferentes de encripción.**

**Describe de forma clara y explícita, de acuerdo al diseño actual de tu implementación los cambios que se requieren. Adicionalmente indica la facilidad o dificultad de los cambios.
Opcional (puntos extra: genera la implementación de acuerdo a la descripción de cambios que argumentas en esta respuesta)**

Considerando el diseño actual, para incluir seguridad, bastaría con añadir una capa extra con las 
funcionalidades de encriptar (que recibiría el algoritmo que se desea y la información) y desencriptar.

De igual forma, para añadir la generación de un reporte en PDF, bastaría con añadir una utilidad
que tome como parametro un arreglo de información y lo imprima dentro de un documento.

Gracias a la arquitectura por capas y a que todas las funcionalidades están separadas, actualmente la 
dificultad de añadir estos cambios es mínima.