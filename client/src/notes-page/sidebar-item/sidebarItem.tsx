import useStyles from './styles'
import { removeHTMLTags } from '../../helpers'
import { ListItem, ListItemText } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { AppContext } from '../../context/context'
import { useCallback, useContext } from 'react'
import { noteActionCreator } from '../../reducer/reducer'
import { useHttp } from '../../hooks/http.hook';


export type Note = null |{
    id: string
    title: string
    body: string
    timeStamp: string
}
type PropsType = {
    note: Note
    index: number
    selectedNoteIndex: number
}

export const SidebarItemComponent: React.FC<PropsType> = ({note, index, selectedNoteIndex}) => {
    const classes = useStyles()

    const {dispatch, token} = useContext(AppContext)
    const {request} = useHttp()
    const selectNote = () => dispatch!(noteActionCreator.selectNote(note,index))

    const deleteNote = useCallback(async (id: string, index: number, selectedNoteIndex: number, note: Note, token: string ) => {
        const body = JSON.stringify({id})
        let newSelectedNoteIndex: number = selectedNoteIndex
        if(index < selectedNoteIndex) {
            newSelectedNoteIndex = selectedNoteIndex - 1
        }

        if (window.confirm(`Do you want to delete note "${note?.title}" ?`)) {
            await request('/api/notes', 'DELETE', body, token)
            dispatch!(noteActionCreator.deleteNote(id, newSelectedNoteIndex))
        }
    }, [dispatch, request])
    

    return(
        <>
        <ListItem
            className={classes.listItem}
            alignItems='flex-start'
            selected={selectedNoteIndex === index}
            >
                <div
                    onClick={() => selectNote()}
                    className={classes.textSection}>
                        <ListItemText
                            primary={note?.title}
                            secondary={note && removeHTMLTags(note?.body?.substring(0, 30))}/>
                </div>
                <DeleteIcon
                    className={classes.deleteIcon}
                    onClick={() => note && deleteNote(note?.id, index, selectedNoteIndex, note, token!)}
                />
                            
        </ListItem>
        </>
    )
}   