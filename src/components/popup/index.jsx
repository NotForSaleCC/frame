import usePortal from "../../hooks/usePortal"
import styles from "./index.module.css"
import { useState } from "react"

export default function Popup({children, onClose}) {
    const {teleport} = usePortal('modal')
    return teleport(
        <div className={styles.container} onClick={onClose}>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}