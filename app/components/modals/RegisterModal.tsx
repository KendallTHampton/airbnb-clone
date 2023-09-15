"use client";
import {AiFillGithub} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import {useCallback, useState} from "react";
import {toast} from "react-hot-toast";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import useRegisterModalHook from "@/app/hooks/RegisterModalHook";
import useLoginModalHook from "@/app/hooks/LoginModalHook";
import axios from "axios";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import {signIn} from "next-auth/react";


const RegisterModal = () => {
	const registerModal = useRegisterModalHook(); // Allows us to use the register modal hook and the proerties and methods in the store
	const loginModal = useLoginModalHook(); // Allows us to use the login modal hook and the proerties and methods in the store
	const [isLoading, setIsLoading] = useState(false);

	// This is a react hook form hook that allows us to register the input fields and validate them
	const {register, handleSubmit, formState: {errors}, } = useForm<FieldValues>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});


	// We submit the form data to the backend using axios, if there is no error we close the modal or else we console log it, then finally we set the loading state to false
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);
		axios
			.post("/api/register", data)
			.then(() => {
				registerModal.onClose();
			})
			.catch((error) => {
				toast.error("Something Went Wrong!");
			})
			.finally(() => {setIsLoading(false);});
	};

	const bodyContent = (
		<div className='flex flex-col gap-4'>
			{/*  Props: title(req), subtitle, center */}
			<Heading title='Welcome to AirBnb' subtitle='Create An Account' />
			{/* Props: id(req), label(req), reqister(req), type, disabled, formatPrice, required, errors */}
			<Input
				id='name'
				label='Name'
				disabled={isLoading}
				register={register} // a useForm hook function
				errors={errors}
				required
			/>

			<Input
				id='email'
				label='Email'
				disabled={isLoading}
				register={register} // a useForm hook function
				errors={errors}
				required
			/>

			<Input
				id='password'
				type='password'
				label='Password'
				disabled={isLoading}
				register={register} // a useForm hook function
				errors={errors}
				required
			/>
		</div>
	);

	const footerContent = (
		<div className='flex flex-col gap-4'>
			<hr />
			<Button
				outline
				label="Continue with Google"
				icon={FcGoogle}
				onClick={() => signIn('google')}
			/>
			<Button
				outline
				label="Continue with Github"
				icon={AiFillGithub}
				onClick={() => signIn('github',
				)}
			/>
			<div className='text-neutral-500 text-center mt-4 font-light'>
				<div className='flex flex-row items-center gap-2 justify-center'>
					<div>
						Already Have An Account?
					</div>
					<div
						className="text-neutral-800 cursor-pointer hover:underline"
						onClick={() => {
							registerModal.onClose()
							loginModal.onOpen()
						}
						}
					>
						Log In
					</div>
				</div>
			</div>
		</div>

	)


	// Required Modal Props: isOpen, onClose, onSubmit, actionLabel, disabled
	// Optional Modal Props: title, body, footer, secondaryAction, secondaryActionLabel
	/* Using const registerModal */
	// Required RegisterModal Hook Props: isOpen, onClose, onOpen
	return (
		<Modal
			// Modal Props
			title='Register'
			body={bodyContent}
			footer={footerContent}
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			onClose={registerModal.onClose}
			actionLabel='Continue'
			onSubmit={handleSubmit(onSubmit)} //Needs this handle submit from react-hook-form to wrap around the onSubmit function
		/>
	);
};

export default RegisterModal;
