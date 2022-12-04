import React, { useState } from 'react';
import './App.css';
import { ActiveTasks } from './components/ActiveTasks';
import { CompletedTasks } from './components/CompletedTasks';
import { InputField } from './components/InputField';
import { Todo } from './models/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  console.log('todos', todos);
  const activeTodos = todos.filter((td: Todo) => !td.isDone);
  const completedTodos = todos.filter((td: Todo) => td.isDone);

  return (
    <div className='App'>
      <InputField todos={todos} setTodos={setTodos} />
      <div className='text-white flex flex-col md:flex-row justify-between gap-16 pt-10'>
        <ActiveTasks activeTodos={activeTodos} todos={todos} setTodos={setTodos} />
        <CompletedTasks completedTodos={completedTodos} todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
}

export default App;
