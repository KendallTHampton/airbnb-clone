"use client";
import {useState, useEffect} from "react";

interface ClientOnlyProps {
	children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({children}) => {
	const [isRendered, setIsRendered] = useState(false);

	useEffect(() => {
		setIsRendered(true);
	}, []);

	if (!isRendered) return null; // return null if the componenet hasn't been rendered yet

	return <>{children}</>;
};

export default ClientOnly;
