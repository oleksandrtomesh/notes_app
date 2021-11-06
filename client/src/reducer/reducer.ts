import { Dispatch } from 'react';
import { useReducer } from 'react';
import { Note } from './../notes-page/sidebar-item/sidebarItem';

export const ACTIONS = {
    setNotes: 'set-notes',
    addNote: 'add-note',
    updateNote: 'update-note',
    deleteNote: 'delete-note',
    selectNote: 'select-note'
} as const

//TODO types for state and action
export const noteReducer = (state: State, action: Action): State => {
    switch (action.type){
        case ACTIONS.setNotes: {
            return {
                ...state,
                notes: [...action.notes],
                selectedNote: action.selectedNote,
                selectedNoteIndex: action.selectedNoteIndex
            }
        }

        case ACTIONS.selectNote: {
            return {
                ...state,
                selectedNote: action.selectedNote,
                selectedNoteIndex: action.selectedNoteIndex
            }
        }

        case ACTIONS.addNote: {
            return {
                ...state,
                notes: [...state.notes!, action.newNote],
                selectedNote: action.newNote,
                selectedNoteIndex: state.notes?.length!
            }
        }

        case ACTIONS.updateNote: {

            return {
                ...state,
                notes: state.notes!.map((note: Note) => {
                    let newNote = note
                    if(newNote && note?.id === action.id){
                        newNote.body = action.body
                        newNote.title = action.title
                    }
                    return newNote
                })
            }
        }

        case ACTIONS.deleteNote: {
            return {
                ...state,
                notes: state.notes!.filter((note: Note) => note?.id !== action.id),
                selectedNote: state.notes![action.selectedNoteIndex + 1],
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



export const useReducerWithMiddleware = (
    reducer: ReducerType<State, Action>,
    initialState: State,
): [State, Dispatch<Action>, (action: Action, middlewareFn: unknown) => Promise<void>] => {
    const [state, dispatch] = useReducer(reducer, initialState)
    
    //crate a middleware
    const dispatchWithMiddleware = 
        async (action: Action, middlewareFn: unknown) => {
        if (typeof middlewareFn === "function"){
            await middlewareFn(action)
            dispatch(action)
        }
    }


    return [state, dispatch, dispatchWithMiddleware]
}



//Action creator
export const noteActionCreator = {
    setNotes: (notes: Note[], selectedNote: Note, selectedNoteIndex: number) => 
        ({type: ACTIONS.setNotes, notes, selectedNote, selectedNoteIndex}),
    selectNote: (note: Note, index: number) => ({type: ACTIONS.selectNote, selectedNote: note, selectedNoteIndex: index}),
    updateNote: (id: string, title: string, body: string) => ({type: ACTIONS.updateNote, id, body, title}),
    addNote: (newNote: Note) => ({type: ACTIONS.addNote, newNote}),
    deleteNote: (id: string, selectedNoteIndex: number) => 
        ({type: ACTIONS.deleteNote, id, selectedNoteIndex})
}
//types

export interface State {
    notes: Note[] | null
    selectedNote: Note | null
    selectedNoteIndex: number | null
}

export type Action = {type: typeof ACTIONS.setNotes, notes: Note[], selectedNote: Note, selectedNoteIndex: number} 
| {type: typeof ACTIONS.addNote, newNote: Note}
| {type: typeof ACTIONS.updateNote, id: string, title: string, body: string}
| {type: typeof ACTIONS.deleteNote, id: string, selectedNoteIndex: number}
| {type: typeof ACTIONS.selectNote, selectedNote: Note, selectedNoteIndex: number}

export type ReducerType<State, Action> = (state: State, action: Action) => State 