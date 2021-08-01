export default function Filled({ value, category }) {
    const color = {
        needs: "rgba(92, 185, 73, 1)",
        wants: "rgba(4, 4, 5, 1)",
        savings: "rgba(100, 155, 209, 1) 0%",
    };
    return (
        <div
            style={{
                width: "8em",
                margin: "0 auto",
                border: "1px solid rgba(224, 224, 224, 1)",
                background: `linear-gradient(to right, ${color[category]} ${value}%, #fff 0%)`,
                borderRadius: "2px",
            }}>
            {value}%
        </div>
    );
}
