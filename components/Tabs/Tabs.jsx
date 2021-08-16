import React, { useContext } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { PostContext } from "../../context/post/PostContext";

// import { useWindowWidth } from "@react-hook/window-size";

export default function CenteredTabs() {
    // const onlyWidth = useWindowWidth();
    const { index, handleChangeIndex } = useContext(PostContext);

    return (
        <Paper style={{ marginBottom: "35px" }} elevation={3}>
            <Tabs
                value={index}
                // variant={onlyWidth <= 1024 && "fullWidth"}
                variant="fullWidth"
                onChange={handleChangeIndex}
                indicatorColor="primary"
                textColor="primary">
                <Tab label="All" />
                <Tab label="Budgeting" />
                <Tab label="Investing" />
                <Tab label="Passive Income" />
            </Tabs>
        </Paper>
    );
}
