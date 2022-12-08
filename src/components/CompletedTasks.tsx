import React from 'react';
import { Todo } from '../models/todo';
import { SingleTodo } from './SingleTodo';

type completedTasksProps = {
  completedTodos: Todo[];
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const CompletedTasks = ({ completedTodos, todos, setTodos }: completedTasksProps) => {
  return (
    <div className='bg-green-700 w-full h-full rounded-sm drop-shadow p-5'>
      <p className='text-xl font-semibold'>Completed Tasks</p>
      {completedTodos?.map((todo: Todo) => (
        <SingleTodo key={todo.id} todo={todo} todos={todos} setTodos={setTodos} />
      ))}
    </div>
  );
};
