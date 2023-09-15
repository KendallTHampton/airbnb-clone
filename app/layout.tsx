import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly"; // Fixes issues with SSR -More specifically Hydration which is when the server renders the page and the client renders the page and they don't match
import "./globals.css";
import {Nunito} from "next/font/google";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./providers/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import {getCldOgImageUrl} from "next-cloudinary";
import SearchModal from "./components/modals/SearchModal";
const font = Nunito({subsets: ["latin"]});

export const metadata = {
	title: "Airbnb Clone",
	description: "App that clones Airbnb",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentUser = await getCurrentUser();
	return (
		<html lang='en'>
			<body className={font.className}>
				<ClientOnly>
					<ToasterProvider />
					<SearchModal />
					<LoginModal />
					<RegisterModal />
					<RentModal />
					<Navbar currentUser={currentUser} />
				</ClientOnly>
				<div className='pb-20 pt-28'>
					{children}
				</div>
			</body>
		</html>
	);
}
