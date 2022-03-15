import { Note } from "@/domain/models";
import { DeleteNote } from "@/domain/usecases";
import { getStorage, setStorage } from "@/infra/cache";

export const cashDeleteNote: DeleteNote = (params) => {
    const getResponse = getStorage('notes') as Note[]
    const notes = getResponse.filter(note => note.id !== params.id)

    setStorage('notes', notes)
    return notes
}