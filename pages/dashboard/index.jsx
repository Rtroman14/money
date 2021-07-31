// import styles from "../styles/dashboard.scss";

import Image from "next/image";
import Link from "next/link";

import Pic from "../../public/dashboard.png";

export default function Dashboard() {
    return (
        <div className="test">
            <div className="test__test">
                <Image src={Pic} width={50} height={50} />
            </div>
            <p>Copy this: https://www.drone.io/</p>
            <p>Copy this: https://hlrlookup.flywheelsites.com/</p>
            <div>
                <Link href="/dashboard/50-30-20">50-30-20</Link>
            </div>
            <div>
                <Link href="/dashboard/car-buying">car-buying</Link>
            </div>
            <div>
                <Link href="/dashboard/investing">investing</Link>
            </div>
        </div>
    );
}
