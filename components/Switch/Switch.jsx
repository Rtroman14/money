import React, { useState, useContext } from "react";
import Switch from "@material-ui/core/Switch";

import { FinancialContext } from "../../context/FinancialContext";

export default function Switches() {
    const { isBlur, toggleBlur } = useContext(FinancialContext);

    return (
        <div>
            <Switch
                checked={isBlur}
                onChange={toggleBlur}
                color="primary"
                name="blur"
                inputProps={{ "aria-label": "primary checkbox" }}
            />
        </div>
    );
}
