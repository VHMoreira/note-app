import { Note } from "@/domain/models";
import { LoadNotes } from "@/domain/usecases";
import { getStorage } from "@/infra/cache";

export const cashLoadNotes: LoadNotes = () => {
    const getResponse = getStorage('notes') as Note[]
    let notes: Note[] = []

    
    if(getResponse) {
        notes = [...getResponse]
    }

    return notes
}