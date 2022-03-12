import React from "react"
import Styles from './style.scss'
import { TodoItem as TodoItemModel } from "@/domain/models"
import TodoItem from "../TodoItem"

type Props = {
    itens: TodoItemModel[]
}

const TodoList: React.FC<Props> = ({ itens }) => {

    return (
        <ul className={Styles.listContainer}>
            {itens.map((item) => (
                <TodoItem 
                    key={item.id} 
                    text={item.text} 
                    isDone={item.isDone}
                />
            ))}
        </ul>
    )
}

export default TodoList