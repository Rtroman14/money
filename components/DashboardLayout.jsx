import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import { GiPieChart } from "@react-icons/all-files/gi/GiPieChart";
import { AiOutlineAreaChart } from "@react-icons/all-files/ai/AiOutlineAreaChart";
import { MdDirectionsCar } from "@react-icons/all-files/md/MdDirectionsCar";
import { BsFillHouseDoorFill } from "@react-icons/all-files/bs/BsFillHouseDoorFill";

import BudgetPie from "./Dashboard/BudgetPie";
import Investing from "./Dashboard/Investing";
import Housing from "./Dashboard/Housing";
import CarBuying from "./Dashboard/CarBuying";

import { FinancialProvider } from "../context/finance/FinancialContext";

const theme = createTheme({
    overrides: {
        MuiTooltip: {
            tooltip: {
                fontSize: "12.5px",
                fontFamily: "inherit",
            },
        },
        MuiTableCell: {
            head: {
                fontSize: "17px",
            },
        },
        MuiTextField: {
            root: {
                width: "100%",
            },
        },
        MuiSelect: {
            select: {
                paddingRight: "0",
            },
            outlined: {
                paddingRight: "0",
            },
        },
        MuiMenuItem: {
            root: {
                fontFamily: "inherit",
                fontSize: "15px",
            },
        },
        MuiChip: {
            label: {
                fontFamily: '"Montserrat", sans-serif',
            },
        },
    },
});

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "#111927",
    },
    // necessary for content to be below app bar
    toolbar: {
        marginTop: "2em",
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    font: {
        color: "#adb5bd",
    },
}));

export default function DashboardLayout({ children }) {
    const [dashboardComponent, setDashboardComponent] = useState({
        name: "BudgetPie",
        component: <BudgetPie />,
    });

    const renderDashboardComponent = (name) => {
        const components = [
            { name: "BudgetPie", component: <BudgetPie /> },
            { name: "Investing", component: <Investing /> },
            { name: "Housing", component: <Housing /> },
            { name: "CarBuying", component: <CarBuying /> },
        ];

        const component = components.find((component) => component.name === name);

        setDashboardComponent(component);
    };

    const classes = useStyles();

    const { asPath } = useRouter();

    return (
        <div className="dashboard">
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left">
                <div className={classes.toolbar} />
                <div>
                    <Link className="dashboard__logo" href="/">
                        <a>
                            <h2 style={{ textAlign: "center", color: "white" }}>Cash Money</h2>
                        </a>
                    </Link>
                </div>
                <Divider light variant="middle" />
                <List style={{ padding: "0 10px" }}>
                    <ListItem
                        onClick={() => renderDashboardComponent("BudgetPie")}
                        className={dashboardComponent.name === "BudgetPie" ? "selected" : null}
                        button
                        key="50/30/20">
                        <ListItemIcon>
                            <GiPieChart
                                color={dashboardComponent.name === "BudgetPie" ? "#fff" : "#adb5bd"}
                                size="1.5em"
                            />
                        </ListItemIcon>
                        <ListItemText
                            className={
                                dashboardComponent.name === "BudgetPie" ? "active" : classes.font
                            }
                            primary="50/30/20"
                        />
                    </ListItem>
                    <ListItem
                        onClick={() => renderDashboardComponent("CarBuying")}
                        className={dashboardComponent.name === "CarBuying" ? "selected" : null}
                        button
                        key="Car Buying">
                        <ListItemIcon>
                            <MdDirectionsCar
                                color={dashboardComponent.name === "CarBuying" ? "#fff" : "#adb5bd"}
                                size="1.5em"
                            />
                        </ListItemIcon>
                        <ListItemText
                            className={
                                dashboardComponent.name === "CarBuying" ? "active" : classes.font
                            }
                            primary="Car Buying"
                        />
                    </ListItem>
                    <ListItem
                        onClick={() => renderDashboardComponent("Housing")}
                        className={dashboardComponent.name === "Housing" ? "selected" : null}
                        button
                        key="Housing">
                        <ListItemIcon>
                            <BsFillHouseDoorFill
                                color={dashboardComponent.name === "Housing" ? "#fff" : "#adb5bd"}
                                size="1.5em"
                            />
                        </ListItemIcon>
                        <ListItemText
                            className={
                                dashboardComponent.name === "Housing" ? "active" : classes.font
                            }
                            primary="Housing"
                        />
                    </ListItem>
                    <ListItem
                        onClick={() => renderDashboardComponent("Investing")}
                        className={dashboardComponent.name === "Investing" ? "selected" : null}
                        button
                        key="Investing">
                        <ListItemIcon>
                            <AiOutlineAreaChart
                                color={dashboardComponent.name === "Investing" ? "#fff" : "#adb5bd"}
                                size="1.5em"
                            />
                        </ListItemIcon>
                        <ListItemText
                            className={
                                dashboardComponent.name === "Investing" ? "active" : classes.font
                            }
                            primary="Investing"
                        />
                    </ListItem>
                </List>
            </Drawer>
            <div className="dashboard__graph">
                <ThemeProvider theme={theme}>
                    <FinancialProvider>
                        <main>{React.cloneElement(children, { dashboardComponent })}</main>
                    </FinancialProvider>
                </ThemeProvider>
            </div>
        </div>
    );
}
