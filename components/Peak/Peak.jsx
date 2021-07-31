import React, { useContext } from "react";

import { FinancialContext } from "../../context/finance/FinancialContext";

import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";

export default function Peak() {
    const { isBlur, toggleBlur } = useContext(FinancialContext);

    return (
        <IconButton style={{ color: "white" }} onClick={toggleBlur}>
            {isBlur ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </IconButton>
    );
}
