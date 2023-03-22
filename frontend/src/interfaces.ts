export interface AppProps {
    headerText: string;
    extraText?: string;
}

export interface Address {
    street: string,
    number: number,
    postalCode: string
}

export interface User {
    name: string,
    age: number,
    country: string,
    address: Address,
    admin: boolean
}