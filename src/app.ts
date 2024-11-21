// src/app.ts
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import YAML from 'yamljs'; // Asegúrate de tener esta importación
import swaggerUi from 'swagger-ui-express';
import errorHandler from './middlewares/errorHandler';
import userRoutes from './routes/userRoutes';

const app: Application = express();

// Middlewares globales
app.use(cors());
app.options('*', cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Rutas
app.use(userRoutes);
// swagger
const swaggerDocument = YAML.load('./docs/swagger.yaml'); // Asegúrate de que la ruta sea correcta
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Middleware para servir la documentación

// Middleware de manejo de errores
app.use(errorHandler);
app.get('/', (_req, res) => {
  res.send('Api Itp');
});
export default app;
