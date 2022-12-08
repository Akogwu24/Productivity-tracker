import React from 'react';
import { Todo } from '../models/todo';
import { SingleTodo } from './SingleTodo';

interface activeTodoProps {
  activeTodos: Todo[];
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const ActiveTasks = ({ activeTodos, todos, setTodos }: activeTodoProps) => {
  console.log('activeTodos', activeTodos);
  return (
    <div className='bg-cyan-700 p-5 w-full h-full rounded-sm drop-shadow'>
      <header className='text-xl font-semibold'>Active Tasks</header>

      {activeTodos?.map((todo: Todo) => (
        <SingleTodo key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
      ))}
    </div>
  );
};
