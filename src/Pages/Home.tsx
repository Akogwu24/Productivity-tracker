import { ActiveTasks } from '../components/ActiveTasks';
import { CompletedTasks } from '../components/CompletedTasks';
import { InputField } from '../components/InputField';
import { GoogleLoginResponse, GoogleLogout } from 'react-google-login';
import { useEffect, useState } from 'react';
import { Todo } from '../models/todo';
import { db } from '../components/common/DB';

const clientId = '80336867282-17up1c1gkmndrhjv8gn5uemk8g5p00bo.apps.googleusercontent.com';

interface HompageProps {
  user: GoogleLoginResponse | undefined;
  setUser: React.Dispatch<React.SetStateAction<GoogleLoginResponse | undefined>>;
}

export const HomePage = ({ setUser, user }: HompageProps) => {
  const [todos, setTodos] = useState<Todo[] | any>([]);

  const activeTodos = todos.filter((td: Todo) => !td.isDone);
  const completedTodos = todos.filter((td: Todo) => td.isDone);

  useEffect(() => {
    db.allDocs({
      include_docs: true,
      attachments: true,
    })
      .then(function (result) {
        console.log(result);
        setTodos(result?.rows);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const logOut = () => {
    setUser(undefined);
  };
  return (
    <>
      <header className='flex justify-between mb-10'>
        <div className='flex text-white gap-5 name-avatar'>
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
  );
};
