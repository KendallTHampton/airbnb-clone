'use client';
import Modal from "./Modal";
import useRentModalHook from "../../hooks/RentModalHook";
import Heading from "../Heading";
import {useMemo, useState} from "react";
import {categories} from "../navbar/Categories"
import CategoryInput from "../inputs/CategoryInput";
import {useForm, FieldValues, SubmitHandler} from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation"
// We Will create a modal that tracks the step the user is on. We need to create an enum for this because we want to submit all the data at once at the end
enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {
    const rentModal = useRentModalHook();
    const router = useRouter();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {errors},
        reset
    } = useForm<FieldValues>({
        // These default values follow the schema of the Listing Model
        defaultValues: {
            category: '',
            location: null, //Object
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        }
    });

    // *********# WATCHING INPUTS AND SETTING VALUES ************ //
    const category = watch('category');
    /*  
    For Location We want to re-render the the map everytime the user picks a location 
    We will use dynamic import to import the map component so everytime the location changes the map is re rendered 
    */
    const location = watch('location');
    const Map = useMemo(() => dynamic(() => import('../Map'), {ssr: false}), [location])
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');


    // registering custom input we need to use setValue we will create a custom hook to do this
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true, // Means we want to validate this field
            shouldDirty: true, // Means user changed
            shouldTouch: true, // Means user has interacted with the field
        })
    }

    // ******************* FUNCTIONS *********************** //
    // functions that will go backward or forwards in our Modal
    const onBack = () => {
        setStep((value) => value - 1)
    };
    const onNext = () => {
        setStep((value) => value + 1)
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext()
        }

        setIsLoading(true);
        axios.post("api/listings", data)
            .then(() => {
                toast.success("Listing Created!");
                router.refresh();
                reset();
                setStep(STEPS.CATEGORY);
                rentModal.onClose();
            })
            .catch((error) => {
                toast.error("Something Went Wrong!")
            })
            .finally(() => {
                setIsLoading(false)
            })

    }


    // If we are on the last step, we want to change the actionLabel to 'Create'
    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create'
        }
        return 'Next'
    }, [step])
    // If we are on the first step, we want to hide the secondaryLabel
    const secondaryLabel = useMemo(() => {
        if (step == STEPS.CATEGORY) {
            return undefined
        }
        return 'Back'
    }, [step])


    // ************* CONDITIONALLY RENDERING THE MODAL **************** //
    // STEP 1: CONDITIONALLY RENDER CATEGORIES  
    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading
                title='Which of these best describes your place?'
                subtitle="Pick A Category"
            />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'>

                {categories.map((item) =>
                (
                    <div key={item.label} className='col-span-1'>
                        <CategoryInput
                            onClick={(category) => {
                                setCustomValue('category', category) // We are setting the value of the category field to the category that was clicked
                            }}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />

                    </div>
                )

                )}
            </div>
        </div>
    )

    // STEP 2: CONDITIONALLY RENDER LOCATIONS 
    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading title='Where is your place located?' subtitle='Help Guests Find You' />
                <CountrySelect
                    onChange={(value) => setCustomValue('location', value)}
                    value={location}
                />
                <Map
                    center={location?.latling || null}
                />
            </div>

        )
    }

    // STEP 3: CONDITIONALLY RENDER INFO 
    if (step === STEPS.INFO) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='Share some basics about your place?'
                    subtitle="What Amentities Do You Offer?"
                />
                <Counter
                    title="Guests"
                    subtitle="How Many Guests Do You Allow?"
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr />
                <Counter
                    title="Rooms"
                    subtitle="How Many Rooms Do You Have?"
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr />
                <Counter
                    title="Bathrooms"
                    subtitle="How Many Bathrooms Do You Have?"
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />
            </div>
        )
    }

    // STEP 4: CONDITIONALLY RENDER IMAGES
    if (step === STEPS.IMAGES) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='Add a Photo Of Your Place'
                    subtitle="Show Guests What Your Place Looks Like!"
                />
                <ImageUpload
                    onChange={(value) => setCustomValue('imageSrc', value)}
                    value={watch('imageSrc')}
                />
            </div>
        )
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe your place?"
                    subtitle="Short and sweet works best!"
                />
                <Input
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Now, set your price"
                    subtitle="How much do you charge per night?"
                />
                <Input
                    id="price"
                    label="Price"
                    formatPrice
                    type="number"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }


    return (
        <Modal
            title="Airbnb Your Home!"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
            disabled={false}
            body={bodyContent}
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
        />
    )
}

export default RentModal