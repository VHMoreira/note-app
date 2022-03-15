import { useContext } from "react"
import { NoteContext } from "@/main/providers/NoteProvider"

export const useNotes = () => {
    return useContext(NoteContext)
}