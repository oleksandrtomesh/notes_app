import { useCallback, useContext, useState } from "react" 
import useStyles from './styles';
import { Button , List, Divider } from '@material-ui/core';
import { Note, SidebarItemComponent } from "../sidebar-item/sidebarItem";
import { useHttp } from "../../hooks/http.hook";
import { AppContext } from "../../context/context";
import { handleResData } from "../../helpers";
import { noteActionCreator } from "../../reducer/reducer";

type PropsType = {
    selectedNoteIndex: number
}

export const SidebarComponent: React.FC<PropsType> = ({selectedNoteIndex}) => {

    const [addingNote, setAddingNote] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')

    const {token, state, dispatch} = useContext(AppContext)
    const classes = useStyles()
    const {request} = useHttp()
    

    const addNote = useCallback( async(title: string) => {
        const body = JSON.stringify({title, body: ""})
        const postData = await request('api/notes', 'POST', body, token)
        
        if (postData.newNote) {
            const newNote = handleResData(postData.newNote)
            if(!Array.isArray(newNote)){
                dispatch!(noteActionCreator.addNote(newNote))
            }
        }
    }, [request, dispatch, token])

    const onBtnClick = () => {
        setAddingNote(prevState => !prevState)
        setTitle('')
    }

    const onSubmitBtnClick = async () => {
        addNote(title)
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
                        state?.notes?.map((note: Note, index: number) => {
                            return(
                                <div key={note?.id}>
                                    <SidebarItemComponent
                                        note={note}
                                        index={index}
                                        selectedNoteIndex={selectedNoteIndex}
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