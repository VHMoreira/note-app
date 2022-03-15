import { Note } from "../models"

export type LoadNotes = () => LoadNotes.Model

export namespace LoadNotes {
    export type Model = Note[]
}