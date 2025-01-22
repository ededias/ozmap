import express, { Request } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

interface CustomRequest extends Request {
    user?: any;
}

const secret = process.env.JWT_SECRET || '';

export const authenticateToken = (req: Request, res: express.Response, next: express.NextFunction) => {

    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, secret, (err, decoded) => {

        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }

        req.body.user = decoded;
        next(); // Chama o próximo middleware ou a rota
    });
};
