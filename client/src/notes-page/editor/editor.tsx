import { useState } from 'react';
import ReactQuill from 'react-quill';
import useStyles from './styles';
import useDebounce from '../../hooks/debounce.hook';
import { useEffect } from 'react';
import { Note } from '../sidebar-item/sidebarItem'


export const EditorComponent: React.FC<PropsType> = ({selectedNote, update}) => {
    const classes = useStyles()
    
    const [text, setText] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [id, setId] = useState<string>('')
    const debounceText = useDebounce(text, 1500)
    const debounceTitle = useDebounce(title, 1500)

    useEffect(() => {
        //if we dont change ur text in editor, just return from effect
        if((selectedNote?.body === debounceText) && (selectedNote?.title === debounceTitle)) return
        //make update, when we change value in editor
        if (debounceText && debounceTitle && debounceText === text && debounceTitle === title){
            update(id, debounceTitle, debounceText)
        }
        
    },
    [debounceText, debounceTitle])

    //effect when we get new selectedNote
    useEffect(() => {
        if(selectedNote){
            setText(selectedNote.body)
            setTitle(selectedNote.title)
            setId(selectedNote.id)
        }
    },
    [selectedNote])

    return(
        <div className={classes.editorContainer}>
            <input className={classes.titleInput} type="text" value={title}
                onChange={(e: React.FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}/>
            <ReactQuill
                value={text}
                onChange={(value: string) => setText(value)}
            />

        </div>
    )
}   


//********************** TYPES *************************/
export type NoteObj = {
    title: string
    body: string
}

type PropsType = {
    selectedNote: Note
    //selectedNoteIndex: number | null
    update: (id: string, title: string, text: string) => void
}