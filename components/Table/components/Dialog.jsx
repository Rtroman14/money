import React, { useState, useContext } from "react";
import AddIcon from "@material-ui/icons/Add";
import {
    MenuItem,
    Button,
    Tooltip,
    Fab,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
} from "@material-ui/core";
import { Formik, Field } from "formik";
import { TextField } from "formik-material-ui";
import * as yup from "yup";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

import { FinancialContext } from "../../../context/finance/FinancialContext";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const validationSchema = yup.object({
    name: yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Name is required"),
    cost: yup.number().required("Nothing in this world is free").positive().integer(),
    // category: yup.required("Required"),
});

const ranges = [
    {
        value: "needs",
        label: "Needs",
    },
    {
        value: "wants",
        label: "Wants",
    },
    {
        value: "savings",
        label: "Savings",
    },
];

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix="$"
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default function FormDialog() {
    const { addRow } = useContext(FinancialContext);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Tooltip title="Add Row" placement="bottom" arrow>
                <Fab
                    onClick={handleClickOpen}
                    size="small"
                    style={{ backgroundColor: "#121a27" }}
                    aria-label="add"
                >
                    <AddIcon style={{ color: "white" }} />
                </Fab>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="add-new-item"
                TransitionComponent={Transition}
            >
                <Formik
                    initialValues={{ name: "", cost: "", category: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            // alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                            addRow(values);
                        }, 0);
                    }}
                >
                    {({ values, handleSubmit, setFieldValue }) => (
                        <form onSubmit={handleSubmit}>
                            <DialogTitle id="form-dialog-title">Add New Row</DialogTitle>
                            <DialogContent>
                                <Field
                                    component={TextField}
                                    type="text"
                                    variant="outlined"
                                    name="name"
                                    label="Name"
                                    required
                                    margin="dense"
                                    autoFocus
                                />
                                <Field
                                    component={TextField}
                                    variant="outlined"
                                    margin="dense"
                                    value={values.cost}
                                    onValueChange={val => setFieldValue("cost", val.floatValue)}
                                    label="Cost"
                                    name="cost"
                                    required
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                    }}
                                />
                                <Field
                                    component={TextField}
                                    type="text"
                                    name="category"
                                    label="Category"
                                    required
                                    select
                                    variant="outlined"
                                    margin="dense"
                                >
                                    {ranges.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="#121a27">
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleClose}
                                    color="#121a27"
                                    type="submit"
                                    disabled={
                                        values.name === "" ||
                                        values.cost === "" ||
                                        values.category === ""
                                    }
                                >
                                    Add
                                </Button>
                            </DialogActions>
                        </form>
                    )}
                </Formik>
            </Dialog>
        </div>
    );
}
