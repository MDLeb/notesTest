import React from "react";
import styles from './button.module.scss'

const Button = (props) => {
    return (
        
        <button disabled={props.disable} className={props.disable ? `${styles.btn} ${styles.btn_dis}` : styles.btn} onClick={(e) => {props.onClick(e)}}>{props.children}</button>
    )
}
export default Button;