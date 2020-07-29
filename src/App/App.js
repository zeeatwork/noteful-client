import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import UserContext from '../UserContext';
import config from '../config';
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers'; //delete eventually
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

/*fetchNotes = (e) => {
    const notesUrl = `http://localhost:9090/notes`;
    fetch (notesUrl) 
    .then(res => res.json())
    .then(data => console.log(data))
}*/

/*fetchFolders = (e) => {
    const folderUrl = `http://localhost:9090/folders`;
    fetch (folderUrl)
    .then(res => res.json())
    .then(data => console.log(data))
}*/
    componentDidMount() {
       Promise.all([
           fetch(`${config.API_ENDPOINT}/notes`),
           fetch(`${config.API_ENDPOINT}/folder`)
       ])
       .then(([notesRes, folderRes])=>{
           if (!notesRes.ok) 
               return notesRes.json().then(e => Promise.reject(e))
           if (!folderRes.ok)
                return folderRes.json().then(e => Promise.reject(e))

            return Promise.all([notesRes.json(), folderRes.json()])

       })
       .then(([notes,folders])=>{
           this.setState({notes,folders})
       })
       .catch(error => {
           console.error({error})
       })
    
    }

    renderNavRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                            
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            const {folderId} = routeProps.match.params;
                            const notesForFolder = getNotesForFolder(
                                notes,
                                folderId
                            );
                            return (
                                <NoteListMain
                                    {...routeProps}
                                    notes={notesForFolder}
                                />
                            );
                        }}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId);
                        return <NotePageMain {...routeProps} note={note} />;
                    }}
                />
            </>
        );
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
        }
        return (
            <UserContext.Provider value={value}>
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
           </UserContext.Provider> 
        );
    }

    //fetch(http://localhost:1234/foo/${fooId}, { method: 'DELETE', headers: { 'content-type': 'application/json' }, })
}

export default App;
