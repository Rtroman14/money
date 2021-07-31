import styles from "./Blurb.module.scss";

export default function Blurb({ image, title, description }) {
    return (
        <div className={styles.blurb}>
            {/* <Img /> */}
            <h3 className={styles.title}>{title}</h3>
            <p>{description}</p>
        </div>
    );
}
