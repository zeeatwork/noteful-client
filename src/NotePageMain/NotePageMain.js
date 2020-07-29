import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import UserContext from '../UserContext'

 class NotePageMain extends React.Component {
  static defaultProps = {
    match: { params: {} }
  }
  static contextType =  UserContext;

   render() {
    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
        />
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
   }
  
}



export default NotePageMain;