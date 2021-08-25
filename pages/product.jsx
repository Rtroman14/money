import Image from "next/image";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

import Layout from "../components/Layout";

import Pic from "../public/dashboard.png";
import NextDashboard from "../public/nextJS-dashboard.png";

export default function Product() {
    const { user, error, isLoading } = useUser();

    user && console.log(user);

    return (
        <div style={{ marginTop: "5em" }}>
            <p>Copy this: https://www.drone.io/</p>
            <p>Copy this: https://hlrlookup.flywheelsites.com/</p>
            <p>
                Use this dashboard layout: <a href="https://nextjs.org/analytics">NextJs</a>
            </p>
            <div>
                <Image src={NextDashboard} width={300} height={300} />
            </div>
        </div>
    );
}

Product.getLayout = (page) => <Layout>{page}</Layout>;
