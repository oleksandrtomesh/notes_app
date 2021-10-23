import { useState } from "react" 
import useStyles from './styles';
import { Button , List, Divider } from '@material-ui/core';
import { Note, SidebarItemComponent } from "../sidebar-item/sidebarItem";

type PropsType = {
    selectedNoteIndex: number
    notes: null | Note[]
    addNewNote: (title: string) => Promise<void>
    selectNote: (note: Note, index: number) => void
    deleteNote: (id: string) => void
}

export const SidebarComponent: React.FC<PropsType> = ({notes, selectedNoteIndex, selectNote, addNewNote, deleteNote}) => {

    const [addingNote, setAddingNote] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')

    const classes = useStyles()
    
    const onBtnClick = () => {
        setAddingNote(prevState => !prevState)
        setTitle('')
    }

    const onSubmitBtnClick = async () => {
        addNewNote(title)
        setAddingNote(false)
        setTitle('')
    }

    return(
        <div className={classes.sidebarContainer}>
            <Button 
                onClick={onBtnClick}
                className={classes.newNoteBtn}>{addingNote ? 'Cancel' : 'New note'}</Button>
                {
                    addingNote 
                        ?<>
                        <input 
                            type="text"
                            className={classes.newNoteInput}
                            placeholder='Add new note'
                            value={title}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}/>
                            <Button
                                className={classes.newNoteSubmitBtn}
                                onClick={onSubmitBtnClick}>Submit Note</Button>
                        </>
                        : null
                }
                <List>
                    {
                        notes?.map((note, index) => {
                            return(
                                <div key={index}>
                                    <SidebarItemComponent
                                        note={note}
                                        index={index}
                                        selectedNoteIndex={selectedNoteIndex}
                                        selectNote={selectNote}
                                        deleteNote={deleteNote}
                                    >
                                    </SidebarItemComponent>
                                    <Divider></Divider>
                                </div>
                            )
                        })
                    }
                </List>
        </div>
    )
}   