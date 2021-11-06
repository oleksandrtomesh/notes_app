import { useContext, useEffect } from 'react';
import '../App.css'
import { SidebarComponent } from './sidebar/sidebar';
import { EditorComponent} from './editor/editor';
import { Container } from '@material-ui/core';
import { Header } from '../components/Header';
import { AppContext } from '../context/context';
import { useHttp } from '../hooks/http.hook';
import { handleResData } from '../helpers';
import { noteActionCreator } from '../reducer/reducer';

export const Notes: React.FC = () => {
    const {token, state, dispatch} = useContext(AppContext)
    const {selectedNote, selectedNoteIndex} = state!
    const {request} = useHttp()
    
    useEffect(() => {
        const getNotes = async () => {
            const data = await request('/api/notes', 'GET', null, token)
            if(data) {
                const newNotes = handleResData(data.notes)

                if(dispatch && Array.isArray(newNotes)){
                    dispatch(noteActionCreator.setNotes(newNotes, newNotes[0], 0))
                }
                
            }
        }

        getNotes()
    }, [token, dispatch, request])

    return (
        <Container maxWidth="lg">
            <Header/>
            <SidebarComponent
                selectedNoteIndex={state?.selectedNoteIndex!}
            />
            {
                selectedNote && (selectedNoteIndex || selectedNoteIndex === 0)
                    ? <EditorComponent
                        selectedNote={selectedNote} />
                    : null
            }
        </Container>
    )
}