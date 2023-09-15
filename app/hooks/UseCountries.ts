import countries from "world-countries";

// Formats Countries in the array to be used in the Select component 
const formattedCountries = countries.map(country => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latling: country.latlng,
    region: country.region
}));

// This is the custom hook that will be used to get the countries 
const useCountries = () => {
    const getAll = () => formattedCountries; // returns an array of all countries
    // Return a country by it's value which is the cca2 code
    const getByValue = (value: string) => {
        return formattedCountries.find((item) => item.value === value);
    }
    return {getAll, getByValue} // Return the functions so they can be used
}
export default useCountries;