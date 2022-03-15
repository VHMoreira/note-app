import { Note } from "../models"

export type EditNote = (params: EditNote.Params) => EditNote.Model

export namespace EditNote {
    export type Params = Note

    export type Model = Note
}