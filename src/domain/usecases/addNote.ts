import { Note } from "../models"

export type AddNote = (params: AddNote.Params) => AddNote.Model

export namespace AddNote {
    export type Params = {
        title: string
        itens: string[]
    }

    export type Model = Note
}