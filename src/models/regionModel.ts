import mongoose, { Schema, Document } from 'mongoose';

interface IRegion extends Document {
    // name: string;
    geometry: {
        type: 'LineString'
        coordinates: number[][]; // Array de arrays para definir o polígono
    };
    userId: mongoose.Types.ObjectId; // Referência ao dono da região
}

const RegionSchema = new Schema<IRegion>({
    // name: { type: String, required: true },
    geometry: {
        type: { type: String, enum: ['LineString'], required: true },
        coordinates: {
            type: [[Number]], // Array de pares [longitude, latitude]
            required: true,
            validate: {
                validator: function (value: number[][]): boolean {
                    // Validar se cada coordenada contém dois números (longitude e latitude)
                    return value.every(
                        (coord) =>
                            Array.isArray(coord) &&
                            coord.length === 2 &&
                            typeof coord[0] === 'number' &&
                            typeof coord[1] === 'number'
                    );
                },
                message: 'Invalid coordinates for LineString. Each coordinate must be an array of two numbers [longitude, latitude].',
            },
        }, // Coordenadas do polígono
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Dono da região
});

RegionSchema.index({ geometry: '2dsphere' }); // Índice para consultas geoespaciais

export const Region = mongoose.model<IRegion>('Region', RegionSchema);
