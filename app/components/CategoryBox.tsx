'use client'
import React, {useCallback} from 'react'
import {IconType} from 'react-icons'
import {useRouter, useSearchParams} from 'next/navigation'
import qs from 'query-string'


interface CategoryBoxProps {
    label: string
    icon: IconType
    selected?: boolean
    description?: string
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    label,
    icon: Icon, //This is a component
    selected
}) => {

    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {};

        // We get our current query and turn it into an object 
        if (params) {
            currentQuery = qs.parse(params.toString());
        }


        // We update the query only changing the category
        const updatedQuery: any = {
            ...currentQuery,
            category: label
        }

        // We delete the category if it is already selected {category: 'Beach} / label = 'Beach'

        if (params?.get('category') === label) {
            delete updatedQuery.category
        }

        // This is a function that will update the url
        const url = qs.stringifyUrl({
            url: '/', // Our base url
            query: updatedQuery // Our updated query Ex. /?category=Beach
        }, {skipNull: true})


        router.push(url)

    }, [params, label, router])

    return (
        <div
            onClick={handleClick}
            className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transistion cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
        `}
        >

            <Icon size={26} />
            <div className='font-medium text-sm'>{label}</div>

        </div>
    )
}

export default CategoryBox