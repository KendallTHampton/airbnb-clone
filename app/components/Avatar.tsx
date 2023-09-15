"use client";
import Image from "next/image";


interface AvatarProps {
	src?: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({src}) => {
	return (
		<div>
			<Image
				alt='avatar'
				className='rounded-full'
				width={30}
				height={30}
				src={src || '/images/placeholder.jpg'}
			/>
		</div>
	);
};

export default Avatar;
