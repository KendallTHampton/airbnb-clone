'use client'
import {useRouter} from 'next/navigation'
import React from 'react'
import Heading from './Heading'
import Button from './Button'


interface EmptyState {
    title?: string
    subtitle?: string
    showReset?: boolean
}

const EmptyState: React.FC<EmptyState> = ({
    title = 'No Data Found',
    subtitle = 'Try adjusting your search or filter to find what you are looking for.',
    showReset
}) => {
    const router = useRouter()
    return (
        <div className='h-[68vh] flex gap-2 flex-col items-center justify-center'>
            <Heading title={title} subtitle={subtitle} center />
            <div className='w-48 mt-4'>
                {showReset && (
                    <Button
                        outline
                        label="Remove All Filters"
                        onClick={() => router.push('/')}
                    />
                )}
            </div>
        </div>
    )
}

export default EmptyState