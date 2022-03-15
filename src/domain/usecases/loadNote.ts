import { Note } from "../models"

export type LoadNote = (params: LoadNote.Params) => LoadNote.Model

export namespace LoadNote {
    export type Params = {
        id: string | number
    }

    export type Model = Note
}