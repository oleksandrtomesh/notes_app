import { Note } from './notes-page/sidebar-item/sidebarItem';

// Our hook
export function removeHTMLTags(str: string): string {
    return str.replace(/<[^>]*>?/gm, '')
}


export const handleResData = (notes: Array<ServerNote> | ServerNote ): Array<Note> | Note  => {

        if (Array.isArray(notes)){
            return notes.map((note:ServerNote): Note => {
                if(note){
                    const {_id, title, body, timeStamp} = note
                    const newNote = {id: _id, title, body, timeStamp}
                    return newNote
                }
                return note
            })
        } else {
            const {_id, title, body, timeStamp} = notes
            const newNote = {id: _id, title, body, timeStamp}
            return newNote
        }
        
    
}



/************************** TYPES ****************************/

type ServerNote = {
    _id: string
    title: string
    owner: string
    body: string
    timeStamp: string
}