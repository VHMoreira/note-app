import { Note, TodoItem } from "@/domain/models";
import { EditNote } from "@/domain/usecases";
import { getStorage, setStorage } from "@/infra/cache";
import { v4 as uuid } from 'uuid'

export const cashEditNote: EditNote = (params) => {
    const getResponse = getStorage('notes') as Note[]
    
    if(!getResponse) {
        return
    }
    
    const notes = getResponse.map((note) => {
        if (note.id !== params.id) {
            return note
        }
        
        const newItens = params.itens.map((item) => {
            if(item.id === -1){
                return {
                    ...item,
                    id: uuid()
                }
            }

            return item
        })

        return {
            ...params,
            itens: newItens
        }
    })

    setStorage('notes', notes)

    const note = notes.find(note => note.id === params.id)
    return note
}