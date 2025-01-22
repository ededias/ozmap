export interface Address {
    zipcode: string;
    street: string;
    city: string;
    state: string;
}

export interface AddressData {
    addresses: Address[];
}