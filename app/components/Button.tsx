"use client";
import {IconType} from "react-icons";

// Created a Custom Button Component so we can keep consistency in design and functionality throughout the app

// Required Props: Our Buttons consist of at least a label and an onClick function
// Optional Props: We are using a disabled - to disable the button, outline - for conditional css, small - for conditional css, icon - for conditional icons
interface ButtonProps {
	// Required Props
	label: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	// Optional Props
	disabled?: boolean;
	outline?: boolean;
	small?: boolean;
	icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
	label,
	onClick,
	disabled,
	outline,
	icon: Icon,
	small,
}) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full p-2
    ${outline ? "bg-white" : "bg-rose-500"} 
    ${outline ? "border-black" : "border-rose-500"}
    ${outline ? "text-black" : "text-white"}
	${outline && "hover:bg-neutral-300"}
    ${small ? "py-2" : "py-3"}
    ${small ? "text-sm" : "text-md"}
    ${small ? "font-light " : "font-semibold"}
    ${small ? "border-[1px] " : "border-2"}
        `}>
			{Icon && <Icon size={24} className='absolute left-4 top-3' />}
			{label}
		</button>
	);
};

export default Button;
