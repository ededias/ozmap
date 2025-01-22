import { Request, Response } from 'express';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { Region } from '../models/regionModel';
import { addressToCordinates } from '../services/addressToCordinates';
import { AddressData, Address } from '../models/addressModel';

dotenv.config();




function validateAddressJSON(data: AddressData) {
    // Verifica se o objeto principal tem a propriedade 'address'
    if (!data.addresses || !Array.isArray(data.addresses)) {
        return { valid: false, error: "O campo 'address' é obrigatório e deve ser uma lista." };
    }

    // Verifica cada objeto dentro do array 'address'
    for (const address of data.addresses) {
        if (
            !address.zipcode ||
            !address.street ||
            !address.city ||
            !address.state
        ) {
            return { valid: false, error: "Todos os campos (zipcode, street, city, state) são obrigatórios." };
        }

        // Validações adicionais (exemplo: CEP deve ter 8 dígitos)
        if (!/^\d{8}$/.test(address.zipcode)) {
            return { valid: false, error: "O campo 'zipcode' deve conter exatamente 8 dígitos." };
        }
    }

    return { valid: true };
}



function validateCoordinatesJSON(data: AddressData) {
    // Verifica se o objeto principal tem a propriedade 'address'
    if (!data.addresses || !Array.isArray(data.addresses)) {
        return { valid: false, error: "O campo 'address' é obrigatório e deve ser uma lista." };
    }

    // Verifica cada objeto dentro do array 'address'
    for (const address of data.addresses) {
        if (
            !address.zipcode ||
            !address.street ||
            !address.city ||
            !address.state
        ) {
            return { valid: false, error: "Todos os campos (zipcode, street, city, state) são obrigatórios." };
        }

        // Validações adicionais (exemplo: CEP deve ter 8 dígitos)
        if (!/^\d{8}$/.test(address.zipcode)) {
            return { valid: false, error: "O campo 'zipcode' deve conter exatamente 8 dígitos." };
        }
    }

    return { valid: true };
}


const solveCoordinates = async (addresses: Address[]) => {
    return await Promise.all(
        addresses.map(async (address: Address) => {
            const coordinate = await addressToCordinates(address);
            if (!coordinate) {
                throw new Error('Invalid coordinates');
            }
            return [coordinate.lng, coordinate.lat];
        })
    );
}

export const createRegion = async (req: Request, res: Response) => {
    try {

        const { user, coordinates, addresses } = req.body;
        const validationResult = validateAddressJSON(req.body);
        if (validationResult.valid === false && !coordinates) return res.status(400).json({ error: validationResult.error });


        let resolvedCoordinates = null;
        if (addresses) {
            resolvedCoordinates = await solveCoordinates(addresses);
        }

        const geometry = {
            type: 'LineString',
            coordinates: resolvedCoordinates || coordinates
        };
        if (resolvedCoordinates === null && coordinates === null) return res.status(400).json({ error: 'Invalid coordinates', abc: geometry });

        const region = new Region({ geometry, userId: user.id });
        await region.save();

        res.status(201).json({ message: 'Região criada com sucesso.', geometry });
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ error: 'Erro ao criar região.', message: errorMessage });
    }
};


export const updateRegion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        // const { name, geometry } = req.body;
        const { user, coordinates, addresses } = req.body;
        const validationResult = validateAddressJSON(req.body);
        if (validationResult.valid === false && !coordinates) return res.status(400).json({ error: validationResult.error });


        let resolvedCoordinates = null;
        if (addresses) {
            resolvedCoordinates = await solveCoordinates(addresses);
        }

        const geometry = {
            type: 'LineString',
            coordinates: resolvedCoordinates || coordinates
        };
        if (resolvedCoordinates === null && coordinates === null) return res.status(400).json({ error: 'Invalid coordinates', abc: geometry });

        const updatedRegion = await Region.findByIdAndUpdate(
            id,
            { geometry },
            { new: true }
        );

        if (!updatedRegion) {
            return res.status(404).json({ error: 'Região não encontrada.' });
        }

        res.json({ updatedRegion });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar região.' });
    }
};


export const deleteRegion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedRegion = await Region.findByIdAndDelete(id);

        if (!deletedRegion) {
            return res.status(404).json({ error: 'Região não encontrada.' });
        }

        res.json({ message: 'Região deletada com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar região.' });
    }
};


export const listRegions = async (req: Request, res: Response) => {
    try {
        const regions = await Region.find();
        res.json(regions);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar regiões.' });
    }
};
