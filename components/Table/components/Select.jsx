import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { FinancialContext } from "../../../context/finance/FinancialContext";

import styles from "./Select.module.scss";

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    // disabledSelect: {
    //     "& .MuiInputBase-root.Mui-disabled": {
    //         color: "black",
    //     },
    // },
}));

export default function SimpleSelect({ value, id }) {
    const { editCell } = useContext(FinancialContext);

    const classes = useStyles();
    const [category, setCategory] = useState(value);

    const handleChange = (event) => {
        setCategory(event.target.value);

        editCell(id, "category", event.target.value);
    };

    return (
        <FormControl variant="outlined" className={`${classes.formControl} form-select`}>
            <Select
                // style={{ padding: "8px 8px 9px 0" }}
                // style={{ padding: "1.2em 1.5em 1.1em 0" }}
                className={`${styles.category} ${styles[category]}`}
                labelId="demo-simple-select-outlined-label"
                id={`category-${id}`}
                value={category}
                onChange={handleChange}>
                <MenuItem value="needs">Needs</MenuItem>
                <MenuItem value="wants">Wants</MenuItem>
                <MenuItem value="savings">Savings</MenuItem>
            </Select>
        </FormControl>
    );
}
