import { Note, TodoItem } from "@/domain/models";
import { AddNote } from "@/domain/usecases";
import { getStorage, setStorage } from "@/infra/cache";
import { v4 as uuid } from 'uuid'

export const cashAddNote: AddNote = (params) => {
    const id = uuid()
    const itens: TodoItem[] = params.itens.map((item) => ({
        id: uuid(),
        isDone: false,
        text: item
    }))
    const note: Note = {
        ...params,
        itens,
        id
    }

    const getResponse = getStorage('notes') as Note[]
    let notes = []

    
    if(getResponse) {
        notes = [
            ...getResponse,
            note
        ]
    } else {
        notes = [note]
    }

    setStorage('notes', notes)
    return note
}