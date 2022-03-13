import React from "react"
import Styles from './style.scss'
import { TodoItem as TodoItemModel } from "@/domain/models"
import TodoItem from "../TodoItem"

type Props = {
    itens: TodoItemModel[]
    readOnly?: boolean
}

const TodoList: React.FC<Props> = ({ itens, readOnly = false }) => {

    return (
        <ul className={Styles.listContainer}>
            {itens.map((item) => (
                <TodoItem 
                    key={item.id} 
                    text={item.text} 
                    isDone={item.isDone}
                    readOnly={readOnly}
                />
            ))}
        </ul>
    )
}

export default TodoList