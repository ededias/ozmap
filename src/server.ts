import express from 'express';
import userRoute from './routes/user';
import location from './routes/region';
import loginRoute from './routes/login';
import connectToDatabase from './database/database';
import { authenticateToken } from './middleware/authentication';
const server = express();
const router = express.Router();

server.use(express.json());

connectToDatabase;

router.use('/login', loginRoute);
router.use('/user', userRoute);
router.use('/region', authenticateToken, location);

router.get('/', (req, res) => {
    res.send('API está rodando!');
});

server.use(router);

export default server.listen(3000, () => {
    console.log('Server up and running on port 3000');
});
