import React from "react"
import Style from './style.scss'
import { useToggle } from "@/presentation/hooks"
import { TodoItem as TodoItemModel } from "@/domain/models"

type Props = {
    item: TodoItemModel
    readOnly?: boolean
}

const TodoItem: React.FC<Props> = ({ item, readOnly = false }) => {
    const { isActive, toggle } = useToggle(item.isDone)

    const handleClick = () => {
        if(readOnly){
            return
        }

        toggle()
    }

    return (
        <li className={`${Style.itemContainer} ${isActive ? Style.done : ''}`} onClick={handleClick}>
            <p>{ item.text }</p>
            {!readOnly ? <input readOnly type="checkbox" checked={isActive}/> : null}
        </li>
    )
}

export default TodoItem