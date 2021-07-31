import React, { createContext, useReducer, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { userDataReducer } from "./userDataReducer";
import { UPDATE_DATA, FILTER_BY_CATEGORY, UPDATE_INCOME } from "./actions";

import { data } from "../data";

export const FinancialContext = createContext();

export function FinancialProvider(props) {
    // ------------------ USERDATA ------------------ //
    const initialState = {
        data,
        category: "all",
        sortCost: "",
        income: {
            // net: 4000,
            // gross: 5000,
            net: 4095,
            gross: 5833,
        },
    };

    const [userData, dispatch] = useReducer(userDataReducer, initialState);

    const addRow = row => {
        const newRow = {
            id: uuidv4(),
            name: row.name,
            cost: Number(row.cost),
            category: row.category,
        };
        const newUserData = [...userData.data, newRow];

        dispatch({
            type: UPDATE_DATA,
            payload: newUserData,
        });
    };

    const deleteRow = id => {
        const removedRow = userData.data.filter(row => row.id !== id);

        dispatch({
            type: UPDATE_DATA,
            payload: removedRow,
        });
    };

    const editCell = (id, field, newValue) => {
        const value = field === "cost" ? Number(newValue) : newValue;
        const editedRow = userData.data.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        );

        dispatch({
            type: UPDATE_DATA,
            payload: editedRow,
        });
    };

    const filterByCategory = category => {
        dispatch({
            type: FILTER_BY_CATEGORY,
            payload: category,
        });
    };

    const handleIncomeChange = event => {
        const newIncome = {
            ...userData.income,
            [event.target.name]: Number(event.target.value.replace(/[^0-9\.]+/g, "")),
        };

        dispatch({
            type: UPDATE_INCOME,
            payload: newIncome,
        });
    };

    // ------------------ LEFTOVER MONEY ------------------ //
    const [leftoverMoney, setLeftoverMoney] = useState(
        userData.income.net - userData.data.reduce((a, b) => a + b.cost, 0)
    );

    // ------------------ TABLEDATA ------------------ //
    const [tableData, setTableData] = useState({
        table: data,
        sortCost: "",
    });

    const updateTableData = () => {
        const filteredTable =
            userData.category === "all"
                ? userData.data
                : userData.data.filter(row => row.category === userData.category);

        setTableData({
            ...tableData,
            table: filteredTable,
        });
    };

    const sortRows = () => {
        let sortCost;

        const sortedRows = tableData.table.sort((a, b) => {
            if (tableData.sortCost === "DESC" || "") {
                sortCost = "ASC";

                return b.cost - a.cost;
            }

            sortCost = "DESC";
            return a.cost - b.cost;
        });

        setTableData({
            ...tableData,
            sortCost,
            table: sortedRows,
        });
    };

    // ------------------ EMERGENCY FUND ------------------ //
    const [emergencyFund, setEmergencyFund] = useState(
        userData.data.filter(row => row.category === "needs").reduce((a, b) => a + b.cost, 0) * 6
    );

    // ------------------ CATEGORIES ------------------ //
    const [categories, setCategories] = useState({
        needs: userData.data
            .filter(row => row.category === "needs")
            .reduce((a, b) => a + b.cost, 0),
        wants:
            userData.data.filter(row => row.category === "wants").reduce((a, b) => a + b.cost, 0) +
            leftoverMoney,
        savings: userData.data
            .filter(row => row.category === "savings")
            .reduce((a, b) => a + b.cost, 0),
    });

    const updateCategories = () =>
        setCategories({
            needs: userData.data
                .filter(row => row.category === "needs")
                .reduce((a, b) => a + b.cost, 0),
            wants:
                userData.data
                    .filter(row => row.category === "wants")
                    .reduce((a, b) => a + b.cost, 0) + leftoverMoney,
            savings: userData.data
                .filter(row => row.category === "savings")
                .reduce((a, b) => a + b.cost, 0),
        });

    // ------------------ BLUR ------------------ //
    const [isBlur, setIsBlur] = useState(false);
    const toggleBlur = () => setIsBlur(!isBlur);

    // ------------------ useEFFECT ------------------ //
    useEffect(() => {
        setLeftoverMoney(userData.income.net - userData.data.reduce((a, b) => a + b.cost, 0));

        console.log("useEffect []");
    }, []);

    useEffect(() => {
        updateTableData();

        setEmergencyFund(
            userData.data.filter(row => row.category === "needs").reduce((a, b) => a + b.cost, 0) *
                6
        );

        updateCategories();
        setLeftoverMoney(userData.income.net - userData.data.reduce((a, b) => a + b.cost, 0));

        console.log("useEffect [userData, userData.income.net]");
    }, [userData, userData.income.net]);

    return (
        <FinancialContext.Provider
            value={{
                addRow,
                deleteRow,
                editCell,
                filterByCategory,
                handleIncomeChange,
                userData,
                tableData,
                leftoverMoney,
                income: userData.income,
                emergencyFund,
                categories,
                isBlur,
                sortRows,
                toggleBlur,
            }}
        >
            {props.children}
        </FinancialContext.Provider>
    );
}

// ADDING NEW ROW OF WANTS ADDS ONTO WANTS MAKING IT BIGGER THAN SHOULD BE
