import "../styles/globals.scss";
import "../styles/Home.scss";
import "../styles/Post.scss";
import "../styles/dashboard.scss";

import { UserProvider } from "@auth0/nextjs-auth0";

export default function MyApp({ Component, pageProps }) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout || ((page) => page);

    return getLayout(
        // <UserProvider>
        <Component {...pageProps} />
        // </UserProvider>
    );
}
