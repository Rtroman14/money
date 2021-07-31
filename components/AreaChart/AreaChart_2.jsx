import React from "react";

import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

require("highcharts/modules/exporting")(Highcharts);

let categories = [];
let savings = [0];
let market = [0];

const startAge = 1;
const retireAge = 40;
const annualInvestment = 5000;
const MARKET_GAIN = 0.02;
const SAVINGS_GAIN = 0.002;

for (let i = startAge; i < retireAge; i++) {
    categories.push(i);
}

for (let year = 0; year < 40; year++) {
    const totalSavings = savings.reduce((a, b) => a + b, 0);

    let capitalGains = Math.round(totalSavings * SAVINGS_GAIN);

    savings.push(annualInvestment + capitalGains + savings[year]);
}

for (let year = 0; year < 40; year++) {
    const totalMarket = market.reduce((a, b) => a + b, 0);

    let capitalGains = Math.round(totalMarket * MARKET_GAIN);

    market.push(annualInvestment + capitalGains + market[year]);
}

const options = () => {
    return {
        chart: {
            type: "area",
        },
        accessibility: {
            description:
                "Image description: An area chart compares the nuclear stockpiles of the USA and the USSR/Russia between 1945 and 2017. The number of nuclear weapons is plotted on the Y-axis and the years on the X-axis. The chart is interactive, and the year-on-year stockpile levels can be traced for each country. The US has a stockpile of 6 nuclear weapons at the dawn of the nuclear age in 1945. This number has gradually increased to 369 by 1950 when the USSR enters the arms race with 6 weapons. At this point, the US starts to rapidly build its stockpile culminating in 32,040 warheads by 1966 compared to the USSR’s 7,089. From this peak in 1966, the US stockpile gradually decreases as the USSR’s stockpile expands. By 1978 the USSR has closed the nuclear gap at 25,393. The USSR stockpile continues to grow until it reaches a peak of 45,000 in 1986 compared to the US arsenal of 24,401. From 1986, the nuclear stockpiles of both countries start to fall. By 2000, the numbers have fallen to 10,577 and 21,000 for the US and Russia, respectively. The decreases continue until 2017 at which point the US holds 4,018 weapons compared to Russia’s 4,500.",
        },
        title: {
            text: "Investing Money in The Market vs. Savings Account",
        },
        subtitle: {
            text:
                "What are you waiting for? Invest now with <a href='https://www.acorns.com/invite/NB3R3H'>Acorns!</a>",
        },
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                },
            },
            accessibility: {
                rangeDescription: "Range: 1940 to 2017.",
            },
        },
        yAxis: {
            title: {
                text: "Investment Return",
            },
            labels: {
                formatter: function () {
                    return this.value / 1000 + "k";
                },
            },
        },
        tooltip: {
            pointFormat: "{series.name} returned <b>{point.y:,.0f}</b><br/> at age {point.x}",
        },
        plotOptions: {
            area: {
                pointStart: startAge,
                marker: {
                    enabled: false,
                    symbol: "circle",
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true,
                        },
                    },
                },
            },
            // series: {
            //     animation: {
            //         duration: 1000,
            //     },
            // },
        },
        credits: {
            enabled: false,
        },
        exporting: {
            enabled: false,
        },
        series: [
            {
                name: "Market",
                data: market,
            },
            {
                name: "Savings",
                data: savings,
            },
        ],
    };
};

export default function AreaChart() {
    return <HighchartsReact highcharts={Highcharts} options={options()} />;
}
