import React from "react"
import Style from './style.scss'
import { useToggle } from "@/presentation/hooks"

type Props = {
    text: string
    isDone: boolean
    readOnly?: boolean
}

const TodoItem: React.FC<Props> = ({ isDone, text, readOnly = false }) => {
    const { isActive, toggle } = useToggle(isDone)

    const handleClick = () => {
        if(readOnly){
            return
        }

        toggle()
    }

    return (
        <li className={`${Style.itemContainer} ${isActive ? Style.done : ''}`} onClick={handleClick}>
            <p>{ text }</p>
            {!readOnly ? <input readOnly type="checkbox" checked={isActive}/> : null}
        </li>
    )
}

export default TodoItem