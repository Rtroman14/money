// import Highcharts from "highcharts/highstock";
// import HighchartsReact from "highcharts-react-official";

// require("highcharts/modules/exporting")(Highcharts);

import Highcharts from "highcharts/highstock";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsReact from "highcharts-react-official";

if (typeof Highcharts === "object") {
    HighchartsExporting(Highcharts);
}

import styles from "./AreaChart.module.scss";

let categories = [];
let savings = [0];
let market = [0];

const startAge = 25;
const retireAge = 60;
const numYears = retireAge - startAge;
const annualInvestment = 5000;
const MARKET_GAIN = 0.02;
const SAVINGS_GAIN = 0.005;

for (let age = startAge; age <= retireAge; age++) {
    categories.push(age);
}

for (let year = 0; year < numYears; year++) {
    const totalSavings = savings.reduce((a, b) => a + b, 0);

    let capitalGains = Math.round(totalSavings * SAVINGS_GAIN);

    savings.push(annualInvestment + capitalGains + savings[year]);
}

for (let year = 0; year < numYears; year++) {
    const totalMarket = market.reduce((a, b) => a + b, 0);

    let capitalGains = Math.round(totalMarket * MARKET_GAIN);

    market.push(annualInvestment + capitalGains + market[year]);
}

// Highcharts.setOptions({
//     lang: {
//         thousandsSep: ",",
//     },
// });

if (typeof Highcharts === "object") {
    Highcharts.setOptions({
        lang: {
            thousandsSep: ",",
        },
    });
}

const options = (title) => {
    return {
        chart: {
            type: "areaspline",
            zoomBySingleTouch: true,
            zoomType: "x",
        },
        title: {
            text: title,
        },
        subtitle: {
            text: "What are you waiting for? Invest now with <a href='https://www.acorns.com/invite/NB3R3H' target='_blank'>Acorns!</a>",
        },
        xAxis: {
            categories,
            title: {
                text: "Age",
            },
        },
        yAxis: {
            title: {
                text: "Return on Investment",
            },
            // labels: {
            //     formatter: function () {
            //         return this.value / 1000 + "k";
            //     },
            // },
        },
        tooltip: {
            shared: true,
            valuePrefix: "$",
            // pointFormat: "{series.name}: $<b>{point.y:,.0f}</b><br/>",
        },
        credits: {
            enabled: false,
        },
        exporting: {
            enabled: false,
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.7,
            },
            series: {
                marker: {
                    symbol: "circle",
                    radius: 1,
                },
            },
        },
        series: [
            {
                name: "Market <span style='font-weight:100;color:#666666;fill:#666666;'>(7% Growth/Year)</span>",
                data: market,
            },
            {
                name: "Savings <span style='font-weight:100;color:#666666;fill:#666666;'>(0.05% Growth/Year)</span>",
                data: savings,
            },
        ],
    };
};

export default function AreaChart({ title }) {
    return (
        <div className={styles.areachart}>
            <HighchartsReact highcharts={Highcharts} options={options(title)} />
        </div>
    );
}

// https://signup.acorns.com/signup?tierPriceId=eb68d469-8bc2-4441-9f91-dbdc65013772&code=NB3R3H&s1=Referrals&referral_code=NB3R3H
// https://signup.acorns.com/signup?tierPriceId=eb68d469-8bc2-4441-9f91-dbdc65013772&code=NB3R3H&s1=Referrals&referral_code=NB3R3H
