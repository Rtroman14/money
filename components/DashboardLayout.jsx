import Link from "next/link";
// import { useLocation } from "@reach/router";
import { useRouter } from "next/router";

import { GiPieChart } from "@react-icons/all-files/gi/GiPieChart";
import { AiOutlineAreaChart } from "@react-icons/all-files/ai/AiOutlineAreaChart";
import { MdDirectionsCar } from "@react-icons/all-files/md/MdDirectionsCar";
import { BsFillHouseDoorFill } from "@react-icons/all-files/bs/BsFillHouseDoorFill";

import { FinancialProvider } from "../context/finance/FinancialContext";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";

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

// ------------------------------
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

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
                            {/* <Img fixed={data.fixed.childImageSharp.fixed} /> */}
                            <h2 style={{ textAlign: "center", color: "white" }}>Cash Money</h2>
                        </a>
                    </Link>
                </div>
                <Divider light variant="middle" />
                <List style={{ padding: "0 10px" }}>
                    <Link style={{ textDecoration: "none" }} href="/dashboard/50-30-20">
                        <ListItem
                            className={asPath.includes("50-30-20") ? "selected" : null}
                            button
                            key="50/30/20">
                            <ListItemIcon>
                                <GiPieChart
                                    color={asPath.includes("50-30-20") ? "#fff" : "#adb5bd"}
                                    size="1.5em"
                                />
                            </ListItemIcon>
                            <ListItemText
                                className={asPath.includes("50-30-20") ? "active" : classes.font}
                                primary="50/30/20"
                            />
                        </ListItem>
                    </Link>
                    <Link style={{ textDecoration: "none" }} href="/dashboard/car-buying">
                        <ListItem
                            className={asPath.includes("car-buying") ? "selected" : null}
                            button
                            key="Car Buying">
                            <ListItemIcon>
                                <MdDirectionsCar
                                    color={asPath.includes("car-buying") ? "#fff" : "#adb5bd"}
                                    size="1.5em"
                                />
                            </ListItemIcon>
                            <ListItemText
                                className={asPath.includes("car-buying") ? "active" : classes.font}
                                primary="Car Buying"
                            />
                        </ListItem>
                    </Link>
                    <Link style={{ textDecoration: "none" }} href="/dashboard/housing">
                        <ListItem
                            className={asPath.includes("housing") ? "selected" : null}
                            button
                            key="Housing">
                            <ListItemIcon>
                                <BsFillHouseDoorFill
                                    color={asPath.includes("housing") ? "#fff" : "#adb5bd"}
                                    size="1.5em"
                                />
                            </ListItemIcon>
                            <ListItemText
                                className={asPath.includes("housing") ? "active" : classes.font}
                                primary="Housing"
                            />
                        </ListItem>
                    </Link>
                    <Link style={{ textDecoration: "none" }} href="/dashboard/investing">
                        <ListItem
                            className={asPath.includes("investing") ? "selected" : null}
                            button
                            key="Investing">
                            <ListItemIcon>
                                <AiOutlineAreaChart
                                    color={asPath.includes("investing") ? "#fff" : "#adb5bd"}
                                    size="1.5em"
                                />
                            </ListItemIcon>
                            <ListItemText
                                className={asPath.includes("investing") ? "active" : classes.font}
                                primary="Investing"
                            />
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
            <div className="dashboard__graph">
                <ThemeProvider theme={theme}>
                    <FinancialProvider>
                        <main>{children}</main>
                    </FinancialProvider>
                </ThemeProvider>
            </div>
        </div>
    );
}