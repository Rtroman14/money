import React from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

import "./Slider.scss";

function valuetext(value) {
    return `${value}°C`;
}

export default function DiscreteSlider() {
    return (
        <div className="slider">
            <Typography id="discrete-slider-small-steps" gutterBottom>
                Monthly Investment amount
            </Typography>
            <Slider
                defaultValue={500}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-small-steps"
                step={50}
                marks
                min={0}
                max={2000}
                valueLabelDisplay="auto"
            />
        </div>
    );
}
