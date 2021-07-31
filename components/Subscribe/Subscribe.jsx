import { Button, Paper, Divider, TextField } from "@material-ui/core";

import styles from "./Subscribe.module.scss";

export default function Subscribe() {
    return (
        <Paper className={styles.subscribe}>
            <h3>
                Join Our Monthly Newsletter :] You Never Know If Our Next Post Will Financially
                Change Your Life!
            </h3>
            <Divider style={{ margin: "10px 0" }} />
            <div>
                <form
                    noValidate
                    autoComplete="off"
                    style={{ display: "flex", alignItems: "baseline" }}>
                    <TextField
                        id="subscribe"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="dense"
                    />
                    <div style={{ marginLeft: "15px" }}>
                        <Button className="btn-cta">Subscribe</Button>
                    </div>
                </form>
            </div>
        </Paper>
    );
}
