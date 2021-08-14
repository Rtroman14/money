import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

import { UserProvider } from "@auth0/nextjs-auth0";

export default function Layout({ children }) {
    return (
        <>
            <UserProvider>
                <Navbar />
                <main>{children}</main>
                <Footer />
            </UserProvider>
        </>
    );
}
