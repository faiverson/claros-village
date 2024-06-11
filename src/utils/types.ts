export interface User {
    id?: string
    name?: string
    email?: string
    image?: string
    role?: string
}

export enum SumShift {
    Day = 'day',
    Night = 'night',
    Both = 'both',
}

export enum Amenity {
    Sum = 'sum',
    Gym = 'gym',
    Soccer = 'soccer',
}

export enum SumRoom {
    Big = 'big',
    Small = 'small',
}

export type AlertType = 'error' | 'success' | 'warning' | 'info'
