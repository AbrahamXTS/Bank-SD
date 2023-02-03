import { writeFileSync } from 'fs';

export const cleanFile = ( path: string ) => {
	writeFileSync(path, '');
}
