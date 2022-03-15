import React, { ReactElement } from "react";
import Style from './style.scss'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

type ButtonColor = 'success' | 'warning' | 'light' | 'default'

type Props = {
    icon?: React.FC
    color?: ButtonColor
}

const Button: React.FC<Props & ButtonProps> = ({ 
    icon: Icon,
    color = 'default',
    children, 
    ...props 
}) => {
    return (
        <button className={`${Style.buttonContainer} ${Style[color]}`} {...props} >
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