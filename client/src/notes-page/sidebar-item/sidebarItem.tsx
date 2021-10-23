import useStyles from './styles'
import { removeHTMLTags } from '../../helpers'
import { ListItem, ListItemText } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'


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
    selectNote: (note: Note, index: number) => void
    deleteNote: (id: string) => void
    
}

export const SidebarItemComponent: React.FC<PropsType> = ({note, index, selectedNoteIndex, selectNote, deleteNote}) => {
    const classes = useStyles()
    
    return(
        <>

        <ListItem
            className={classes.listItem}
            alignItems='flex-start'
            selected={selectedNoteIndex === index}
            >
                <div
                    onClick={() => selectNote(note,index)}
                    className={classes.textSection}>
                        <ListItemText
                            primary={note?.title}
                            secondary={note && removeHTMLTags(note?.body?.substring(0, 30))}/>
                </div>
                <DeleteIcon
                    className={classes.deleteIcon}
                    onClick={() => note && deleteNote(note?.id)}
                />
                            
        </ListItem>
        </>
    )
}   