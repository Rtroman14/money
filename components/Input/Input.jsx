import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";

import NumberFormatCustom from "../NumberFormatCustom/NumberFormatCustom.js";

import { FinancialContext } from "../../context/finance/FinancialContext";

// import "./Input.scss";

export default function Input({ amount, name, edit }) {
    const { isBlur, handleIncomeChange, leftoverMoney } = useContext(FinancialContext);

    const [value, setValue] = useState(amount);

    return (
        <TextField
            className={isBlur ? "blur-large" : null}
            variant="outlined"
            value={name === "leftoverMoney" ? leftoverMoney : value}
            onChange={(event) => setValue(event.target.value)}
            onBlur={handleIncomeChange}
            disabled={!edit}
            name={name}
            InputProps={{
                inputComponent: NumberFormatCustom,
                style: {
                    fontSize: 38,
                    fontWeight: 600,
                    color: "black",
                    fontFamily: "'Baloo 2', cursive",
                },
            }}
        />
    );
}
