'use client'
import axios from 'axios'
import {useRouter} from 'next/navigation'
import {useCallback, useMemo} from 'react'
import {SafeUser} from '../types'
import useLoginModal from './LoginModalHook'
import toast from 'react-hot-toast'


interface IUseFavoriteId {
    listingId: string;
    currentUser?: SafeUser | null;
}

// This allows is to see if the current user has favorited the listing or not
const useFavorite = ({listingId, currentUser}: IUseFavoriteId) => {
    const router = useRouter()
    const LoginModalHook = useLoginModal()

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || []

        return list.includes(listingId)
    }, [currentUser, listingId])


    // This Allows us to toggle the favorite
    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation(); // Prevents the event from bubbling up the DOM tree, preventing any parent handlers from being notified of the event.

        // No User then open the Login Modal
        if (!currentUser) {
            return LoginModalHook.onOpen();
        }

        // Depending on if the user has favorited the listing or not, we will either POST or DELETE
        try {
            let request
            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`)
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`)
            }
            await request()
            router.refresh()
            toast.success('Success')
        } catch (error) {
            toast.error('Error')

        }

    }, [currentUser, listingId, hasFavorited, LoginModalHook, router])

    return {hasFavorited, toggleFavorite}
}

export default useFavorite