'use client'
import useCountries from '@/app/hooks/UseCountries'
// This hook will load all the countries from the API

import Select from 'react-select'
// This is a react library that allows us to create a dropdown menu

// We wil export a type and value for the select input will accept and will have all the properties of the country
export type CountrySelectValue = {
    flag: string
    label: string
    value: string
    latling: number[];
    region: string;
}

interface CountrySelectProps {
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
    value,
    onChange
}) => {
    const {getAll} = useCountries(); //fetching the data from the hook
    return (
        <div>
            <Select
                placeholder='Anywhere'
                isClearable
                options={getAll()}
                value={value} //value is the value of the country
                onChange={(value) => onChange(value as CountrySelectValue)}
                formatOptionLabel={(option: any) => (
                    <div className='flex flex-row items-center gap-3'>
                        <div>{option.flag}</div>
                        <div>
                            {option.label}
                            <span className='text-neutral-500 ml-1'>
                                {option.region}
                            </span>
                        </div>
                    </div>
                )}
                classNames={{
                    control: () => 'p-3 border-2',
                    input: () => 'text-sm font-semibold',
                    option: () => 'text-lg font-semibold',
                }}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: "black",
                        primary25: "#ffe4e6",
                    },
                })
                }
            />
        </div>
    )
}

export default CountrySelect