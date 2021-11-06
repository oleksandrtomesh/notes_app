import { useEffect , useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import useStyles from './styles';
import useDebounce from '../../hooks/debounce.hook';
import { Note } from '../sidebar-item/sidebarItem'
import { useHttp } from '../../hooks/http.hook';
import { AppContext } from '../../context/context';
import { noteActionCreator } from '../../reducer/reducer';

//TODO
// 1. make reducer fore the useState values in editor component

export const EditorComponent: React.FC<PropsType> = ({selectedNote}) => {
    const classes = useStyles()
    
    const [text, setText] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [id, setId] = useState<string>('')
    const debounceText = useDebounce(text, 1500)
    const debounceTitle = useDebounce(title, 1500)
    const {request} = useHttp()
    const {dispatch} = useContext(AppContext)

    useEffect(() => {
        const updateNote = async (id: string, title: string, text: string) => {
            const reqBody = JSON.stringify({ id, title, body: text })
            const data = await request('api/notes', 'PUT', reqBody, { 'Content-Type': 'application/json' })
            if (data.notes){
                dispatch!(noteActionCreator.updateNote(id, title, text))
            } 
        }
        //if we dont change ur text in editor, just return from effect
        if((selectedNote?.body === debounceText) && (selectedNote?.title === debounceTitle)) return
        //make update, when we change value in editor
        if (debounceText !== '' && debounceTitle !== '' && debounceText === text && debounceTitle === title){
            updateNote(id, debounceTitle, debounceText)
        }
        
    },
    [debounceText, debounceTitle, dispatch])

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
}