import React from "react";

import DashboardLayout from "../../components/layout-dashboard";
import AreaChart from "../../components/AreaChart/AreaChart";
import Card from "../../components/Card/Card";
import Slider from "../../components/Slider/Slider";

import { GiPayMoney } from "@react-icons/all-files/gi/GiPayMoney";

export default function Investing() {
    return (
        <DashboardLayout>
            <div className="dashboard__graph-investing">
                <div className="dashboard__graph-chart">
                    <AreaChart title="Investing in the Market vs. Savings Account" />
                </div>
                <Card
                    name="age"
                    title="Initial Investment Age"
                    amount={25}
                    icon={<GiPayMoney color="black" size="3.2em" />}
                    tooltip="The age you started investing"
                    edit
                />
                <div style={{ gridArea: "slider" }}>
                    <Slider />
                </div>
            </div>
        </DashboardLayout>
    );
}

// age start investing?
// investment amount? (monthly or annual) - start with amount from 50/30/20
// age want to retire? give user monthly/annual investment amount needed
// desired amount at retirement? give user retirement age based off investment amount

// const initialAge = 25;
// const monthlyInvestment = 500;
// const retirementAge = 60;

// for (let age = initialAge; age < retirementAge; age++) {

//     for(let month = 1; month <= 12; month++) {

//     }
// }
