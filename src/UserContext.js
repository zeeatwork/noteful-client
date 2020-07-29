import React from 'react';

const UserContext = React.createContext({
  notes: [],
  folders: [],
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {}
})

export default UserContext