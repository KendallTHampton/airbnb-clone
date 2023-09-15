"use client";
import {signIn} from "next-auth/react"; // A sign in function from next-auth
import {AiFillGithub} from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import {use, useCallback, useState} from "react";
import {toast} from "react-hot-toast";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import useRegisterModalHook from "@/app/hooks/RegisterModalHook";
import useLoginModalHook from "@/app/hooks/LoginModalHook";
import axios from "axios";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import {useRouter} from "next/navigation";

const LoginModal = () => {
    const router = useRouter();
    const registerModal = useRegisterModalHook();
    const loginModal = useLoginModalHook();
    const [isLoading, setIsLoading] = useState(false);

    const {register, handleSubmit, formState: {errors}, } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        // Unlike register we don't need to use the api route because next-auth has a built in signIn function. Where we pass the credentials
        signIn("credentials", {
            ...data,
            redirect: false,
        }).then((callback) => {
            setIsLoading(false);
            if (callback?.ok) {
                toast.success("Login Successful");
                router.refresh();
                loginModal.onClose();
            }
            if (callback?.error) {
                toast.error(callback.error);
            }
        })

    };

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            {/*  Props: title(req), subtitle, center */}
            <Heading title='Welcome Back' subtitle='Login To Your Account' />
            {/* Props: id(req), label(req), reqister(req), type, disabled, formatPrice, required, errors */}
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
                onClick={() => signIn("google")}
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => signIn("github")}
            />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='flex flex-row items-center gap-2 justify-center'>
                    <div>
                        Dont Have An Account?
                    </div>
                    <div
                        className="text-neutral-800 cursor-pointer hover:underline"
                        onClick={() => {
                            loginModal.onClose()
                            registerModal.onOpen()
                        }}
                    >
                        Sign Up
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
            title='Login'
            body={bodyContent}
            footer={footerContent}
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            onClose={loginModal.onClose}
            actionLabel='Login'
            onSubmit={handleSubmit(onSubmit)} //Needs this handle submit from react-hook-form to wrap around the onSubmit function
        />
    );
};

export default LoginModal;
