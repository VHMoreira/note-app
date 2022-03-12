import React, { ReactElement } from "react";
import Style from './style.scss'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

type Props = {
    icon?: React.FC
}

const Button: React.FC<Props & ButtonProps> = ({ 
    icon: Icon,
    children, 
    ...props 
}) => {
    return (
        <button className={Style.buttonContainer} {...props} >
            <div className={Style.buttonIconWrapper}>
                {Icon ? <Icon /> : null} 
            </div>
            <div className={Style.buttonContentWrapper}>
                { children }
            </div>
        </button>
    )
}

export default Button