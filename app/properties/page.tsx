
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";


const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please Login"
                />
            </ClientOnly>
        )
    }

    const listings = await getListings({
        userId: currentUser.id
    })

    if (listings?.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No Properties found"
                    subtitle="Looks Like You Have No Properties."
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <PropertiesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
}

export default PropertiesPage;