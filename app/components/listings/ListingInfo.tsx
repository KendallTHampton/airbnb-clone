import {SafeUser} from '@/app/types'
import {categories} from '../navbar/Categories'
import {IconType} from 'react-icons'
import useCountries from '@/app/hooks/UseCountries'
import Avatar from '../Avatar'
import ListingCategory from './ListingCategory'
import Map from '../Map'
import {useMemo} from 'react'
import dynamic from 'next/dynamic'

interface ListingUserProps {
    user: SafeUser
    description: string
    category: {
        label: string
        icon: IconType
        description: string
    } | undefined
    roomCount: number
    guestCount: number
    bathroomCount: number
    locationValue: string
}

const ListingInfo: React.FC<ListingUserProps> = ({
    user,
    description,
    category,
    roomCount,
    guestCount,
    locationValue,
    bathroomCount
}) => {
    const {getByValue} = useCountries();
    const coordinates = getByValue(locationValue)?.latling;

    const Map = dynamic(() => import('../Map'), {ssr: false})

    return (
        <div className='col-span-4 flex flex-col gap-8'>
            <div className='flex flex-col gap-2'>
                <div className='text-xl font-semibold flex flex-row items-center gap-2'>
                    <div>Hosted By {user?.name}</div>
                    <Avatar src={user?.image} />
                </div>
                <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
                    <div>
                        {guestCount} guests
                    </div>
                    <div>
                        {roomCount} rooms
                    </div>
                    <div>
                        {bathroomCount} bathrooms
                    </div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <hr />
            <div className='text-lg font-light text-neutral-500'>
                {description}
            </div>
            <hr />

            <Map center={coordinates} />

        </div>
    )
}

export default ListingInfo
