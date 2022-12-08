import React, { useEffect, useState } from 'react';
import './App.css';
import { ActiveTasks } from './components/ActiveTasks';
import { CompletedTasks } from './components/CompletedTasks';
import { InputField } from './components/InputField';
import { Todo } from './models/todo';
import { GoogleLogin, GoogleLoginResponse, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { errorToast } from './components/common/notificationHandler';
import { Login } from './components/Login';

const clientId = '80336867282-17up1c1gkmndrhjv8gn5uemk8g5p00bo.apps.googleusercontent.com';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [user, setUser] = useState<undefined | GoogleLoginResponse>(undefined);

  console.log('todos', todos);
  const activeTodos = todos.filter((td: Todo) => !td.isDone);
  const completedTodos = todos.filter((td: Todo) => td.isDone);

  const logOut = () => {
    setUser(undefined);
  };

  return (
    <div className='App'>
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <>
          <header className='df header'>
            <div className='df name-avatar'>
              <img src={user?.profileObj?.imageUrl} className='avatar' alt='avatar' />
              <div>
                <p>{user?.profileObj?.name}</p>
                <p>{user?.profileObj?.email}</p>
              </div>
            </div>
            <GoogleLogout clientId={clientId} buttonText='Log out' onLogoutSuccess={logOut} />
          </header>
          <InputField todos={todos} setTodos={setTodos} />
          <div className='text-white flex flex-col md:flex-row justify-between gap-16 pt-10'>
            <ActiveTasks activeTodos={activeTodos} todos={todos} setTodos={setTodos} />
            <CompletedTasks completedTodos={completedTodos} todos={todos} setTodos={setTodos} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
