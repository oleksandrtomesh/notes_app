import { Note } from './../notes-page/sidebar-item/sidebarItem';

export const ACTIONS = {
    setNotes: 'set-notes',
    setSelectedNote: 'set-selected-note',
    setSelectedNoteIndex: 'set-selected-note-index'
} as const

//TODO types for state and action
export const noteReducer = (state: State, action: Action): State => {
    switch (action.type){
        case ACTIONS.setNotes: {
            return {
                ...state,
                notes: [...action.notes],
            }
        }

        case ACTIONS.setSelectedNote: {
            return {
                ...state,
                selectedNote: action.selectedNote
            }
        }

        case ACTIONS.setSelectedNoteIndex: {
            return {
                ...state,
                selectedNoteIndex: action.selectedNoteIndex
            }
        }
        
        default:
            return state
    }
}


export const initialState = {
    notes: null,
    selectedNote: null,
    selectedNoteIndex: null,
} as const


//types

export interface State {
    notes: Note[] | null
    selectedNote: Note | null
    selectedNoteIndex: number | null
}

export type Action = {type: typeof ACTIONS.setNotes, notes: Note[]} 
| {type: typeof ACTIONS.setSelectedNote, selectedNote: Note}
| {type: typeof ACTIONS.setSelectedNoteIndex, selectedNoteIndex: number}