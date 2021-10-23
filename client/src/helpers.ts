import { Note } from './notes-page/sidebar-item/sidebarItem';

// Our hook
export function removeHTMLTags(str: string): string {
    return str.replace(/<[^>]*>?/gm, '')
}


export const handleResData = (notes: Array<ServerNote> ): Array<Note>  => {

        return notes.map((note:ServerNote): Note => {
            if(note){
                const {_id, title, body, timeStamp} = note
                const newNote = {id: _id, title, body, timeStamp}
                return newNote
            }
            return note
        })
    
}



/************************** TYPES ****************************/

type ServerNote = {
    _id: string
    title: string
    id: number
    body: string
    timeStamp: string
}