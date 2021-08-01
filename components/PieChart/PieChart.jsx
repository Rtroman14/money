import React, { useState, useContext } from "react";

// import Highcharts from "highcharts/highstock";
// import HighchartsReact from "highcharts-react-official";

// require("highcharts/modules/exporting")(Highcharts);

import Highcharts from "highcharts/highstock";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";

if (typeof Highcharts === "object") {
    HighchartsExporting(Highcharts);
}

import { FinancialContext } from "../../context/finance/FinancialContext";

const options = (needs, wants, savings, filterByCategory) => {
    const [isSelected, setIsSelected] = useState({
        needs: false,
        wants: false,
        savings: false,
    });

    return {
        colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
            return {
                radialGradient: {
                    cx: 0.5,
                    cy: 0.3,
                    r: 0.7,
                },
                stops: [
                    [0, color],
                    [1, Highcharts.color(color).brighten(-0.3).get("rgb")], // darken
                ],
            };
        }),
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: "pie",
            // backgroundColor: "rgba(0,0,0,0)",
        },
        title: {
            // text: "50/30/20 Rule",
            text: "",
        },
        tooltip: {
            pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        accessibility: {
            point: {
                valueSuffix: "%",
            },
        },
        plotOptions: {
            pie: {
                size: "100%",
                allowPointSelect: true,
                cursor: "pointer",
                dataLabels: {
                    enabled: true,
                    format: "<b>{point.name}</b>: {point.percentage:.1f} %",
                    connectorColor: "silver",
                },
            },
            series: {
                // animation: {
                //     duration: 1000,
                // },
                events: {
                    click: (event) => {
                        const name = event.point.name.toLowerCase();

                        setIsSelected({
                            ...isSelected,
                            [name]: !isSelected[name],
                        });

                        isSelected[name] === false
                            ? filterByCategory(name)
                            : filterByCategory("all");
                    },
                },
            },
        },
        series: [
            {
                name: "Income",
                data: [
                    { name: "Savings", y: savings },
                    { name: "Wants", y: wants },
                    { name: "Needs", y: needs },
                ],
            },
        ],
        credits: {
            enabled: false,
        },
        exporting: {
            enabled: false,
        },
    };
};

export default function PieChart() {
    const { filterByCategory, categories, income } = useContext(FinancialContext);

    const needs = categories.needs / income.net;
    const wants = categories.wants / income.net;
    const savings = categories.savings / income.net;

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options(needs, wants, savings, filterByCategory)}
        />
    );
}

// https://stackoverflow.com/questions/31970780/highcharts-pie-chart-specify-pie-slice-gradient-color
