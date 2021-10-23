import { handleResData } from './../helpers';
import { Note } from '../notes-page/sidebar-item/sidebarItem';
import { useState, useCallback } from 'react';
import { useHttp } from './http.hook';

export const useNoteActions = () => {
    const [notes, setNotes] = useState<Array<Note> | null>(null)
    const [selectedNote, setSelectedNote] = useState<Note | null>(null)
    const [selectedNoteIndex, setSelectedNoteIndex] = useState<number>(100)
    const {request} = useHttp()
    
    const selectNote = useCallback((note: Note, index: number) => {
        setSelectedNote(note)
        setSelectedNoteIndex(index)
    }, [])

    const getNotes = useCallback( async () => {
        //get notes from db
        const data = await request('/api/notes', 'GET')
        if (data.notes) {
            //parse notes
            const newNotes = handleResData(data.notes)
            setNotes(newNotes)
            if (newNotes) {
                selectNote(newNotes[0], 0)
            }
        }
    },[request, selectNote])

    

    const addNote = useCallback( async(title: string) => {
        const body = JSON.stringify({title, body: ""})
        await request('api/notes', 'POST', body, {'Content-Type': 'application/json'})
        const data = await request('/api/notes', 'GET')
        const newNotes = handleResData(data.notes)
        setNotes(newNotes)
        if(newNotes){
        //select the last added note
            selectNote(newNotes[newNotes.length -1], newNotes.length - 1)
        }
    }, [request, selectNote])

    const updateNote = useCallback(async (id: string, title: string, text: string) => {
        
        
        const reqBody = JSON.stringify({ id, title, body: text })
        const data = await request('api/notes', 'PUT', reqBody, { 'Content-Type': 'application/json' })
        const newNote = handleResData(data.notes)
        setNotes((prevState: Note[] | null): Note[] | null => {
            console.log('in update');
            const newState = prevState?.map(note => {
                if (note?.id === id) {
                    return newNote[0]
                }
                return note
            })
            if (newState) {
                return newState
            }
            return null
        })
        setSelectedNote((prevState: Note | null) => {
            if(prevState){
                return {...prevState, id, title, body: text}
            }
            return null
            })

    }, [request])
    
    const deleteNote = useCallback (async (id: string) => {
        const body = JSON.stringify({id})
        //get delete note index
        let deleteNoteIndex = notes?.findIndex((note: Note) => note?.id === id)
        let newNoteIndex = selectedNoteIndex
        if (window.confirm(`Do you want to delete note "${deleteNoteIndex || deleteNoteIndex === 0 ? notes?.[deleteNoteIndex]?.title : ''}" ?`)) {
            //if selected note index > = delete note index than reduce selected note index on 1
            if((deleteNoteIndex || deleteNoteIndex === 0)  && selectedNoteIndex >= deleteNoteIndex){
                newNoteIndex -= 1
            }
            await request('/api/notes', 'DELETE', body, {'Content-Type': 'application/json'})
            const data = await request('/api/notes', 'GET')
            const newNotes = handleResData(data.notes)
            //set new notes adn new NoteIndex
            setNotes(newNotes)
            setSelectedNoteIndex(newNoteIndex)
            
    }}, [request, notes, selectedNoteIndex])

    return {notes, selectedNote, selectedNoteIndex, selectNote, updateNote, addNote, getNotes, deleteNote}
}