"use client";
import {useCallback, useEffect, useState} from "react";
import {IoMdClose} from "react-icons/io";
import Button from "../Button";

// This Modal Component serves as a template for all the other Modals

interface ModalProps {
	// Required Props
	isOpen: boolean;
	onClose: () => void;
	onSubmit: () => void;
	actionLabel: string;
	// Optional Props
	title?: string;
	disabled?: boolean;
	body?: React.ReactElement;
	footer?: React.ReactElement;
	secondaryAction?: () => void;
	secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
	title,
	body,
	footer,
	actionLabel,
	disabled,
	secondaryAction,
	secondaryActionLabel,
}) => {
	//********  STATE **********//
	const [showModal, setShowModal] = useState(isOpen);
	useEffect(() => {
		setShowModal(isOpen);
	}, [isOpen]);

	//********  HANDLE FUNCTIONS **********//
	const handleClose = useCallback(() => {
		if (disabled) return;
		setShowModal(false);
		setTimeout(() => {
			onClose();
		}, 300); //setTimeout is being used so we can create a coole animation
	}, [disabled, onClose]);

	const handleSubmit = useCallback(() => {
		if (disabled) return;
		onSubmit();
	}, [disabled, onSubmit]);

	const handleSecondaryAction = useCallback(() => {
		if (disabled || !secondaryAction) return;
		secondaryAction();
	}, [disabled, secondaryAction]);

	if (!isOpen) return null;

	return (
		<>
			{/* OVERLAY */}
			<div className='flex justify-center items-center overflow-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-non bg-neutral-900/70 bg-opacity-75'>
				{/* MODAL */}
				<div className='relative w-9/12 md:w-4/6 xl:w-3/5 mx-auto my-6 lg:h-auto md:h-auto'>
					{/* CONTENT */}
					<div
						className={`translate duration-300 h-full 
                        ${showModal ? "translate-y-0" : "translate-y-full"} 
                        ${showModal ? "opacity-100" : "opacity-0"} 
                    `}
					>
						<div className='translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-whit focus:outline-none'>
							{/* HEADER */}
							<div className='flex items-center p-4 rounded-t relative justify-center border-b-[1px] '>
								<button
									onClick={handleClose}
									className='p-1 border-0 hover:opacity-70 transistion absolute left-6 cursor-pointer
                                '
								>
									<IoMdClose size={18} />
								</button>
								<div className='text-lg font-semibold'>{title}</div>
							</div>
							{/* BODY */}
							<div className='relative px-4 py-3 flex-auto'>{body}</div>
							{/* FOOTER */}
							<div className='flex flex-col gap-2 px-4 py-3'>

								<div className='flex flex-row items-center gap-4 w-full'>
									{secondaryAction && secondaryActionLabel && (
										<Button
											outline
											disabled={disabled}
											label={secondaryActionLabel}
											onClick={handleSecondaryAction}

										/>
									)}
									<Button
										disabled={disabled}
										label={actionLabel}
										onClick={handleSubmit}
									/>
								</div>
								{/* footer prop */}
								{footer}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
