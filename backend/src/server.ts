import app from './app.js';
import 'dotenv/config';
import { env } from '@/config/env.js';

const PORT = Number(env.PORT) || 8000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
