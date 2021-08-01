import Input from "../Input/Input";
import Tooltip from "@material-ui/core/Tooltip";

import styles from "./Card.module.scss";

// export default function Card({ title, amount, icon, tooltip, edit }) {
//     return (
//         <div className="card">
//             <div className="card__content" style={{ justifyContent: "space-between" }}>
//                 <div>
//                     <p style={{ fontSize: "16px", fontWeight: "500" }}>{title}</p>
//                     <div style={{ margin: "1.5em 0 1em 0" }}>
//                         <Input amount={amount} edit={edit} />
//                     </div>
//                 </div>
//                 <Tooltip title={tooltip} placement="top" arrow>
//                     <div className={styles.icon}>{icon}</div>
//                 </Tooltip>
//             </div>
//         </div>
//     );
// }

export default function Card({ name, title, amount, icon, tooltip, edit }) {
    return (
        <div className={styles.card}>
            <div className={styles.content} style={{ justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ margin: ".5em 0 1em 0" }}>
                        <Input amount={amount} edit={edit} name={name} />
                    </div>
                    <p style={{ fontSize: "14px", marginTop: "16px" }}>{title}</p>
                </div>
                <Tooltip title={tooltip} placement="top" arrow>
                    <div className={styles.icon}>{icon}</div>
                </Tooltip>
            </div>
        </div>
    );
}
