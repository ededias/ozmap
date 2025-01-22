import { Request, Response } from 'express';
import User from '../models/userModel';
import { hashPassword } from '../utils/crypt';

// Exemplos de controladores
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    // data.password = await hashPassword(data.password);
    const user = await User.create(data);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const user = await User.findByIdAndUpdate(id, data, { new: true });
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
