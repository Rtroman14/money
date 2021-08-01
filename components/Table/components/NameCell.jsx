import React, { useState, useContext, useRef } from "react";

import { FinancialContext } from "../../../context/finance/FinancialContext";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    disabledInput: {
        "& .MuiInputBase-root.Mui-disabled": {
            color: "black",
        },
        "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
            border: "transparent",
        },
    },
    inputBorder: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "black",
        },
    },
}));

export default function NameCell({ value, id, setIsHover }) {
    const classes = useStyles();

    const { editCell } = useContext(FinancialContext);

    const [name, setName] = useState(value);
    const [isSelect, setIsSelect] = useState(false);

    const node = useRef();

    const handleClick = (event) => {
        if (node.current.contains(event.target)) {
            // inside click
            return;
        }
        // outside click
        const inputValue = node.current.querySelector("input").value;

        document.removeEventListener("mousedown", handleClick);

        setIsHover(false);
        setIsSelect(false);

        inputValue !== name && editCell(id, "name", inputValue);
    };

    const handleSelect = () => {
        if (!isSelect) {
            setIsSelect(true);
            setIsHover(true);

            document.addEventListener("mousedown", handleClick);
            return () => {
                document.removeEventListener("mousedown", handleClick);
            };
        }
    };

    return (
        <TextField
            ref={node}
            className={`${classes.disabledInput} ${isSelect && classes.inputBorder}`}
            variant="outlined"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={!isSelect}
            onClick={() => handleSelect()}
        />
    );
}
