import { useContext, useEffect } from 'react';
import '../App.css'
import { SidebarComponent } from './sidebar/sidebar';
import { EditorComponent} from './editor/editor';
import { Container } from '@material-ui/core';
import { useNoteActions } from '../hooks/noteAction.hook';
import { Header } from '../components/Header';
import { AuthContext } from '../context/authContext';
import { useHttp } from '../hooks/http.hook';
import { handleResData } from '../helpers';

export const Notes: React.FC = () => {
    const { selectedNoteIndex, selectedNote, selectNote, updateNote, addNote, deleteNote } = useNoteActions()
    const auth = useContext(AuthContext)
    const {request} = useHttp()

    useEffect(() => {
        const getNotes = async () => {
            const data = await request('/api/notes', 'GET', null, auth.token)
            if(data) {
                const newNotes = handleResData(data.notes)

                if(auth.dispatch){
                    auth.dispatch({type: 'set-notes', notes: newNotes})
                    auth.dispatch({type: 'set-selected-note', selectedNote: newNotes[0]})
                    auth.dispatch({type: 'set-selected-note-index', selectedNoteIndex: 0})
                }
                
            }
        }

        getNotes()
    }, [auth, request])

    return (
        <Container maxWidth="lg">
            <Header/>
            <SidebarComponent
                notes={auth.state?.notes!}
                selectedNoteIndex={auth.state?.selectedNoteIndex!}
                selectNote={selectNote}
                addNewNote={addNote}
                deleteNote={deleteNote}
            />
            {
                selectedNote && (selectedNoteIndex || selectedNoteIndex === 0)
                    ? <EditorComponent
                        selectedNote={auth.state?.selectedNote!}
                        update={updateNote} />
                    : null
            }
        </Container>
    )
}