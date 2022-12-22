import { useEffect, useState } from 'react';
import './App.css';
import { GoogleLoginResponse } from 'react-google-login';
import { Login } from './components/Login';
import { HomePage } from './Pages/Home';
// import PouchDB from 'pouchdb';

var db = new PouchDB('Tasks');

function App() {
  const [user, setUser] = useState<undefined | GoogleLoginResponse>(undefined);

  db.info().then(function (info: PouchDB.Core.DatabaseInfo) {
    console.log(info);
  });

  return (
    <div className='App'>
      {user ? (
        <Login setUser={setUser} />
      ) : (
        // <Provider pouchdb={db}>
        <HomePage setUser={setUser} user={user} />
        //  </Provider>
      )}
    </div>
  );
}

export default App;
