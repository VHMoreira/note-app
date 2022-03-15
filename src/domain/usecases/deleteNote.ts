export type DeleteNote = (params: DeleteNote.Params) => DeleteNote.Model

export namespace DeleteNote {
    export type Params = {
        id: string | number
    }

    export type Model = void
}