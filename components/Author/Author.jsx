import Image from "next/image";

import { urlFor } from "../../lib/sanity";

import styles from "./Author.module.scss";

export default function Author({ id, name, image }) {
    return (
        <div key={id} className={styles.author}>
            <div className={styles.wrapper}>
                <Image className={styles.image} src={urlFor(image).url()} width={40} height={40} />
            </div>
            <div>
                <p className={styles.name}>{name}</p>
            </div>
        </div>
    );
}
