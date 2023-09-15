// This is a Client Side Component that we are using to render the data into our Server Side Page (page.tsx). We are using a Client Only Component => WHich is a UseEffect that tells us when the application has rendered (meaning once the Server Side Redering is done, then we can render the Client Side Component )
"use client"
import {Reservation} from '@prisma/client'
import {SafeListing, SafeReservation, SafeUser} from '@/app/types'
import {useMemo, useState, useCallback, useEffect} from 'react'
import {categories} from '@/app/components/navbar/Categories'
import ListingHead from '@/app/components/listings/ListingHead'
import ListingInfo from '@/app/components/listings/ListingInfo'
import LoginModalHook from '@/app/hooks/LoginModalHook'
import getCurrentUser from '@/app/actions/getCurrentUser'
import {useRouter} from 'next/navigation'
import {eachDayOfInterval, differenceInCalendarDays} from 'date-fns'
import axios from 'axios'
import toast from 'react-hot-toast'
import ListingReservation from '../ListingReservation'
import {Range} from 'react-date-range'


/*************** PROPS AND OBJECTS   *****************/

const initializeDate = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'

}
// We want to pass in SafeListing and SafeUser to omit some of the data that we don't want to pass to the client side like password,email, etc...
interface ListingClientProps {
    reservations?: SafeReservation[] //passes all reservations for a listing
    listing: SafeListing & {
        user: SafeUser
    }
    currentUser: SafeUser | null
}

const ListingClient: React.FC<ListingClientProps> = ({
    reservations = [],
    listing,
    currentUser
}) => {


    const disableDates = useMemo(() => {
        let dates: Date[] = []  //type of Date Array to store all reserved dates
        reservations.forEach((reservation) => {
            // We are creating a range of dates from the start date to the end date
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });

            // We are spreading the dates array and adding the range of dates to the dates array
            dates = [...dates, ...range]
        })
        return dates
    }, [reservations])

    /*************** FUNCTIONS AND STATE  *****************/
    const loginModal = LoginModalHook()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(listing.price)
    const [dateRange, setDateRange] = useState<Range>(initializeDate)

    // This is the function that is called when the user the dates. This is a API POST request to create a reservation
    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen()
        }

        setIsLoading(true)

        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id

        }).then(() => {
            toast.success('Reservation created successfully')
            setDateRange(initializeDate)
            // Redirect to /trips
            router.push('/trips')
        }).catch((error) => {
            toast.error('Something Went Wrong')
        }).finally(() => {
            setIsLoading(false)
        })

    }, [currentUser,
        loginModal,
        totalPrice,
        dateRange.startDate,
        dateRange.endDate,
        listing?.id,
        router])

    // This is to calculate the total price of the reservation
    useEffect(() => {
        //if the start date and end date exist
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate)

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price) //Original Price * Days
            } else {
                setTotalPrice(listing.price) //Original Price
            }
        }
    }, [dateRange.startDate, dateRange.endDate, listing.price])

    // This is to get the category in our category array of objects to pass the category to the ListingInfo Component
    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category)
    }, [listing.category])


    return (
        <div className='max-w-screen-lg mx-auto '>
            <div className='flex flex-col gap-6'>
                <ListingHead
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    locationValue={listing.locationValue}
                    id={listing.id}
                    currentUser={currentUser}
                />
                <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
                    <ListingInfo
                        user={listing.user}
                        category={category}
                        description={listing.description}
                        roomCount={listing.roomCount}
                        guestCount={listing.guestCount}
                        bathroomCount={listing.bathroomCount}
                        locationValue={listing.locationValue}
                    />
                    <div className='order-first mb-10 md:order-last md:col-span-3'>
                        <ListingReservation
                            price={listing.price}
                            totalPrice={totalPrice}
                            onChangeDate={(value: any) => setDateRange(value)}
                            dateRange={dateRange}
                            onSubmit={onCreateReservation}
                            disabled={isLoading}
                            disabledDates={disableDates}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ListingClient