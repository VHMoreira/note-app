import { TodoItem } from "./TodoItem";

export type Note = {
    id: string | number
    title: string
    itens: TodoItem[]
}