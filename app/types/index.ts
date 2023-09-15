import {Listing, Reservation, User} from '@prisma/client'


// We are doing this because when we first create a user some of the field types are not the same as the ones we are returning
export type SafeUser = Omit<
    User, 'password' | 'emailVerified' | 'createdAt' | 'updatedAt'> & {
        createdAt: string,
        updatedAt: string,
        emailVerified: string | null
    }


export type SafeListing = Omit<Listing, 'createdAt'> & {
    createdAt: string,
}

export type SafeReservation = Omit<Reservation,
    'createdAt' | 'startDate' | 'endDate' | 'listing'
> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListing
}

