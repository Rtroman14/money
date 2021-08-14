import Image from "next/image";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";

import Layout from "../components/Layout";

import Pic from "../public/dashboard.png";

export default function Product() {
    const { user, error, isLoading } = useUser();

    user && console.log(user);

    return (
        <div className="test">
            <div className="test__test">
                <Image src={Pic} width={50} height={50} />
            </div>
            <p>Copy this: https://www.drone.io/</p>
            <p>Copy this: https://hlrlookup.flywheelsites.com/</p>
        </div>
    );
}

Product.getLayout = (page) => <Layout>{page}</Layout>;
