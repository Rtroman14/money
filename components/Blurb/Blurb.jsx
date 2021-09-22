import styles from "./Blurb.module.scss";

import { Paper, Avatar } from "@mui/material";

export default function Blurb({ icon, title, description }) {
    return (
        <Paper className={styles.blurb} elevation={3}>
            <Avatar
                sx={{ bgcolor: "rgba(103, 58, 183, 0.1)", marginBottom: "16px" }}
                variant="rounded">
                {icon}
            </Avatar>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.text}>{description}</p>
        </Paper>
    );
}
