import { Request, Response } from 'express';
import User from '../models/userModel';
import { comparePassword } from '../utils/crypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export const authUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        const isValidPassword = await comparePassword(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ error: 'Invalid password' });
        }
        const secret = process.env.JWT_SECRET || '';
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' })

        res.json({ token });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};