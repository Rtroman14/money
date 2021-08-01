import Typical from "react-typical";

export default function CarBuying() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70vh",
            }}>
            <Typical
                steps={["Soon...", 1000, "Be Patient,", 1500, "It's coming... 😄", 2500]}
                loop={Infinity}
                wrapper="h1"
            />
        </div>
    );
}
