import React from "react";
import Link from "next/link";
import Image from "next/image";

import Logo from "../../public/Logo.png";
import styles from "./Footer.module.scss";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.nav}>
                <div>
                    <Link href="/">
                        <a>
                            <Image src={Logo} width={50} height={50} />
                        </a>
                    </Link>
                </div>
                <div className={styles.links}>
                    <Link href="/">Home</Link>
                    <Link href="/posts">Posts</Link>
                    <Link href="/product">Product</Link>
                </div>
            </div>
            <div className={styles.copyright}>
                <p>COPYRIGHT © 2021, CASH FLOWS</p>
            </div>
        </footer>
    );
}
