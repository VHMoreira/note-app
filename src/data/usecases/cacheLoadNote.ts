import { Note } from "@/domain/models";
import { LoadNote } from "@/domain/usecases";
import { getStorage } from "@/infra/cache";

export const cashLoadNote: LoadNote = (params) => {
    const getResponse = getStorage('notes') as Note[]
    const note = getResponse.find((note) => note.id === params.id)

    
    if(!note) {
        return null
    }

    return note
}