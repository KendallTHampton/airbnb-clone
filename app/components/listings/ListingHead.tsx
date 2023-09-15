import useCountries from '@/app/hooks/UseCountries'
import {SafeUser} from '@/app/types'
import React from 'react'
import Heading from '../Heading'
import Image from 'next/image'
import HeartButton from '../HeartButton'

type Props = {
    title: string
    imageSrc: string
    locationValue: string
    id: string
    currentUser: SafeUser | null
}

const ListingHead = ({title, imageSrc, locationValue, id, currentUser}: Props) => {
    const {getByValue} = useCountries()
    const country = getByValue(locationValue)
    return (
        <div>
            <Heading
                title={title}
                subtitle={`${country?.region} ${country?.label}`}
            />
            <div className='w-full h-[70vh] overflow-hidden rounded-xl relative'>
                <Image
                    alt='Listing image'
                    src={imageSrc}
                    fill
                    className="object-cover w-full"
                />
                <div className='absolute top-5 right-5'>
                    <HeartButton
                        listingId={id}
                        currentUser={currentUser}
                    />
                </div>
            </div>


        </div>
    )
}

export default ListingHead