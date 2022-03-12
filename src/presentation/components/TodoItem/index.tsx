import React from "react"
import Style from './style.scss'
import { useToggle } from "@/presentation/hooks"

type Props = {
    text: string
    isDone: boolean
}

const TodoItem: React.FC<Props> = ({ isDone, text }) => {
    const { isActive, toggle } = useToggle(isDone)

    return (
        <li className={`${Style.itemContainer} ${isActive ? Style.done : ''}`} onClick={toggle}>
            <p>{ text }</p>
            <input readOnly type="checkbox" checked={isActive}/>
        </li>
    )
}

export default TodoItem