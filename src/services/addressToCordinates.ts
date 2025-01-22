import axios from 'axios';
import { Request, Response } from 'express';
import { Address } from '../models/addressModel';

export const addressToCordinates = async (address: Address) => {
    try {
        // const { geolocation, address } = req.body;


        let url = "https://maps.googleapis.com/maps/api/geocode/json?";
        // if (geolocation) {
        //     const lat = geolocation.lat;
        //     const lng = geolocation.lng;
        //     const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
        //     url = `${url}latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;
        // }

        if (address) {
            const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
            url = `${url}address=${address.street}, ${address.city}, ${address.state}, ${address.zipcode}&key=${GOOGLE_MAPS_API_KEY}`;
        }

        const response = await axios.get(url);

        if (response.data.status !== 'OK') {
            return null;
        }

        const data = await response.data.results[0].geometry.location;

        return {
            lat: data.lat,
            lng: data.lng,
        }
    } catch (error) {
        return null;
    }

    // const location = Location.create({
    //     userId: req.body.user.id,
    //     street: address.street || '',
    //     city: address.city || '',
    //     state: address.state || '',
    //     zipcode: address.zipcode || '',
    //     latitude: response.data.results[0].geometry.location.lat,
    //     longitude: response.data.results[0].geometry.location.lng,
    // });

};