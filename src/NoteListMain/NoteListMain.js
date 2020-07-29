import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import './NoteListMain.css'
import UserContext from '../UserContext';
import { getNotesForFolder } from '../notes-helpers'
//import ApiContext

class NoteListMain extends React.Component {
  static defaultProps = {
    match: { params: {} }
  }

  static contextType = UserContext;
  render() {
    const { folderId } = this.props.match.params
    const { notes = [] } = this.context;
    const notesForFolder = getNotesForFolder(notes, folderId)
    return (
      <section className='NoteListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.name}
                modified={note.modified}
              />
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
          Note
        </CircleButton>
        </div>
      </section>
    )
  }
}


export default NoteListMain;