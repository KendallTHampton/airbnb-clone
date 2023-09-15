import {NextResponse} from 'next/server'

import getCurrentUser from '@/app/actions/getCurrentUser'
import prisma from '@/app/libs/prismadb'

interface IParams {
    listingId?: string;
}

export async function POST(
    req: Request,
    {params}: {params: IParams}
) {
    // Get Our Current User
    const currentUser = await getCurrentUser();

    //If there is no current user, return an error
    if (!currentUser) NextResponse.error()

    // Get the List Id from the URL Params when we click a Listing
    const {listingId} = params

    // If there is no listing id or the listing id is not a string, return an error
    if (!listingId || typeof listingId !== 'string') throw new Error('Invalid listing id')

    // Get all the favorite ids from the current user
    let favoriteIds = [...(currentUser?.favoriteIds || [])]

    // Put the listing id into the favorite ids array
    favoriteIds.push(listingId)

    // update the current user with the new favorite ids
    const user = await prisma.user.update({
        where: {id: currentUser?.id},
        data: {favoriteIds}
    })

    return NextResponse.json(user)
}


export async function DELETE(
    req: Request,
    {params}: {params: IParams}
) {
    const currentUser = await getCurrentUser();
    //If there is no current user, return an error
    if (!currentUser) NextResponse.error()
    // Get the List Id from the URL Params when we click a Listing
    const {listingId} = params
    // If there is no listing id or the listing id is not a string, return an error
    if (!listingId || typeof listingId !== 'string') throw new Error('Invalid listing id')

    // Find favorite Id's from the current user
    let favoriteIds = [...(currentUser?.favoriteIds || [])]
    // Filter out the listing id from the favorite ids array
    favoriteIds = favoriteIds.filter((id) => id !== listingId)

    // update the current user with the new favorite ids which has been filtered to exclude the listing id
    const user = await prisma.user.update({
        where: {id: currentUser?.id},
        data: {favoriteIds}
    })

    return NextResponse.json(user)
}