import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const openapiPath = path.resolve(process.cwd(), 'openapi/dist/openapi.yaml');
export const swaggerSpec = YAML.parse(fs.readFileSync(openapiPath, 'utf8'));
