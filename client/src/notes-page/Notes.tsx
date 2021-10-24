import { useEffect } from 'react';
import '../App.css'
import { SidebarComponent } from './sidebar/sidebar';
import { EditorComponent} from './editor/editor';
import { Container } from '@material-ui/core';
import { useNoteActions } from '../hooks/noteAction.hook';
import { Header } from '../components/Header';

export const Notes: React.FC = () => {
    const { notes, selectedNoteIndex, selectedNote, selectNote, updateNote, addNote, getNotes, deleteNote } = useNoteActions()

    useEffect(() => {
        getNotes()
    }, [getNotes])

    return (
        <Container maxWidth="lg">
            <Header/>
            <SidebarComponent
                notes={notes}
                selectedNoteIndex={selectedNoteIndex}
                selectNote={selectNote}
                addNewNote={addNote}
                deleteNote={deleteNote}
            />
            {
                selectedNote && (selectedNoteIndex || selectedNoteIndex === 0)
                    ? <EditorComponent
                        selectedNote={selectedNote}
                        update={updateNote} />
                    : null
            }
        </Container>
    )
}