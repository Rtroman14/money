import React, { useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";

import Peak from "../Peak/Peak";

import { HiOutlineArrowUp } from "@react-icons/all-files/hi/HiOutlineArrowUp";
import { HiOutlineArrowDown } from "@react-icons/all-files/hi/HiOutlineArrowDown";

import Row from "./components/Row";
import Dialog from "./components/Dialog";

import { FinancialContext } from "../../context/finance/FinancialContext";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function BudgetTable() {
    const { tableData, userData, filterByCategory, sortRows } = useContext(FinancialContext);

    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow key="headerRow">
                        <TableCell>Name</TableCell>
                        <TableCell>
                            <div
                                onClick={sortRows}
                                style={{ display: "inline-block", cursor: "pointer" }}>
                                Cost
                            </div>
                            <div style={{ display: "inline-block" }}>
                                {tableData.sortCost === "" ? null : tableData.sortCost === "ASC" ? (
                                    <HiOutlineArrowUp />
                                ) : (
                                    <HiOutlineArrowDown />
                                )}
                            </div>
                        </TableCell>
                        <TableCell align="center">Category</TableCell>
                        <TableCell align="center">% of Category</TableCell>
                        <TableCell align="center">% of Income</TableCell>
                        <TableCell align="center">
                            <Peak />
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.table.map((row) => (
                        <Row row={row} />
                    ))}
                    <TableRow key="addRow">
                        <TableCell style={{ padding: "10px" }}>
                            <Dialog />
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell colSpan="2" style={{ textAlign: "center" }}>
                            {["All", "Needs", "Wants", "Savings"].map((category) => (
                                <Chip
                                    key={category}
                                    className={
                                        userData.category === category.toLowerCase()
                                            ? "chip-selected"
                                            : null
                                    }
                                    label={category}
                                    component="span"
                                    clickable
                                    // variant="outlined"
                                    onClick={() => filterByCategory(category.toLowerCase())}
                                />
                            ))}
                        </TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
