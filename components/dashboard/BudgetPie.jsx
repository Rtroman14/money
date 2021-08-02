import { useContext } from "react";

import { GiReceiveMoney } from "@react-icons/all-files/gi/GiReceiveMoney";
import { GiMoneyStack } from "@react-icons/all-files/gi/GiMoneyStack";
import { FaPiggyBank } from "@react-icons/all-files/fa/FaPiggyBank";
import { AiOutlineAreaChart } from "@react-icons/all-files/ai/AiOutlineAreaChart";

import Card from "../Card/Card";
import PieChart from "../PieChart/PieChart";
import Table from "../Table/Table";

import { FinancialContext } from "../../context/finance/FinancialContext";

import DashboardLayout from "../DashboardLayout";

import styles from "./BudgetPie.module.scss";

export default function BudgetPie() {
    const { income, emergencyFund, leftoverMoney } = useContext(FinancialContext);

    return (
        <div className={styles.container}>
            <Card
                key={income.gross}
                name="gross"
                title="Gross Income"
                amount={income.gross}
                icon={<GiMoneyStack color="#121a27" size="3.2em" />}
                tooltip="Money before tax"
                edit
            />
            <Card
                key={income.net}
                name="net"
                title="Net Income"
                amount={income.net}
                icon={<GiReceiveMoney color="#121a27" size="3.2em" />}
                tooltip="Money after tax"
                edit
            />
            <Card
                key={emergencyFund}
                name="fund"
                title="Emergency Fund"
                amount={emergencyFund}
                icon={<FaPiggyBank color="#121a27" size="3em" />}
                tooltip="This amount should be in your savings account"
                edit={false}
            />
            <Card
                key={leftoverMoney}
                name="leftoverMoney"
                title="Leftover Money"
                amount={leftoverMoney}
                icon={<AiOutlineAreaChart color="#121a27" size="3em" />}
                tooltip="Use this money to invest!"
                edit={false}
            />
            <div className={styles.piechart}>
                <PieChart />
            </div>
            <div className="dashboard__graph-table">
                <Table />
            </div>
        </div>
    );
}

BudgetPie.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
