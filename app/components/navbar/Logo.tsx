"use client";
import Image from "next/image";
import {useRouter} from "next/navigation";
const Logo = () => {
	const router = useRouter();
	return (
		<div
			className='hidden md:flex cursor-pointer '
			onClick={() => router.push('/')}
		>
			<Image alt='logo' src='/images/logo.png' width={100} height={100} priority />
		</div>
	);
};

export default Logo;
