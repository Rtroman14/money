import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "@material-ui/core/Button";

import Logo from "../../public/Logo.png";
import styles from "./Navbar.module.scss";

export default function Navbar() {
    const { asPath } = useRouter();

    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 0);
        });
    }, []);

    // TODO: Change Posts to Learn
    const pages = ["Posts", "Product", "About"];

    return (
        <nav className={`${styles.navbar} ${scroll && styles.scroll}`}>
            <ul className={styles.navbar_items}>
                <li>
                    <Link href="/">
                        <a style={{ display: "flex", alignItems: "center" }}>
                            <Image src={Logo} width={50} height={50} />
                            <h2 style={{ color: "#74c947", fontSize: "26px" }}>CashMoney</h2>
                        </a>
                    </Link>
                </li>
            </ul>
            <ul className={styles.navbar_items}>
                {pages.map((page) => (
                    <li
                        key={page}
                        className={`${styles.navbar_items} ${
                            asPath.includes(page.toLowerCase()) && styles.active
                        }`}>
                        <Link href={`/${page.toLowerCase()}`}>{page}</Link>
                    </li>
                ))}
            </ul>
            <ul className={styles.navbar_items}>
                <li>
                    <Link href="/">Login</Link>
                </li>
                <li>
                    <Link href="/signup">
                        <Button className="btn-cta" variant="contained" disableElevation>
                            Sign Up
                        </Button>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
