import Image from "next/image";

// import Ben from "../public/ben-franklin.jpg";
import Ben from "../public/ben-franklin-gangster.png";

// pages/404.js
export default function Custom404() {
    return (
        <div className="flex-center" style={{ marginTop: "70px", flexDirection: "column" }}>
            <div style={{ position: "relative", height: "calc(75vh - 70px)", width: "100%" }}>
                <Image
                    src={Ben}
                    alt="Ben Franklin"
                    layout="fill"
                    objectFit="contain"
                    // width={500}
                    // height={500}
                    priority
                />
            </div>
            <div>
                <h1>404 - Page Not Found</h1>
            </div>
        </div>
    );
}
