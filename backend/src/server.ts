import 'dotenv/config';
import { env } from '@/config/env.js';
import app from './app.js';

const PORT = Number(env.PORT) || 8000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
