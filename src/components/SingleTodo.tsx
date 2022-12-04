import React, { FormEvent, useState } from 'react';
import { BsCheck2All } from 'react-icons/bs';
import { FiEdit3 } from 'react-icons/fi';
import { HiOutlineTrash } from 'react-icons/hi';
import { Todo } from '../models/todo';
import dayjs from 'dayjs';

interface singleTodoProps {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const SingleTodo = ({ todo, todos, setTodos }: singleTodoProps) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>(todo.title);
  const [newDate, setNewDate] = useState<string>(todo.date);

  const handleDelete = (data: Todo) => {
    const remainingItems = todos.filter((item) => item.id !== data.id);
    setTodos(remainingItems);
  };

  const handleDone = (id: number) => {
    setTodos(todos.map((item) => (item.id === id ? { ...item, isDone: !item.isDone } : item)));
  };

  const handleSubmit = (e: FormEvent, data: Todo) => {
    e.preventDefault();
    console.log('data', data);

    setTodos(
      todos.map((item) =>
        item.id === data.id ? { ...item, title: newTitle, date: dayjs(newDate).format('DD MMM YYYY HH:mm') || newDate, id: Date.now() } : item
      )
    );
    setEdit(false);
  };

  return (
    <form
      className='h-28 bg-gradient-to-r from-cyan-700 to-blue-500 my-5 w-full drop-shadow text-gray-200 p-2'
      onSubmit={(e) => handleSubmit(e, todo)}
    >
      {edit ? (
        <div className='flex gap-2 items-center'>
          <input defaultValue={todo.title} onChange={(e) => setNewTitle(e.target.value)} className='h-7 rounded w-full my-2 px-1 text-gray-600' />
          <input
            type='datetime-local'
            defaultValue={todo.date}
            onChange={(e) => setNewDate(e.target.value)}
            className='h-7 rounded w-full my-2 px-1 text-gray-600'
          />
          <input className='w-28 h-7 rounded bg-gray-700 color-white' type='submit' value='Add' />
        </div>
      ) : todo.isDone ? (
        <p className='py-2 truncate  w-full  text-lg'>
          <s>{todo.title}</s>
        </p>
      ) : (
        <p className='py-2 truncate  w-full  text-lg'>{todo.title}</p>
      )}

      <div className='date-action-wrapper pt-4 flex justify-between items-center'>
        <p className='date'>{todo.date}</p>
        <div className='actions flex gap-5'>
          <span className={todo.isDone ? 'hidden' : 'unset'} onClick={() => setEdit(!edit)}>
            <FiEdit3 size={25} />
          </span>
          <span onClick={() => handleDone(todo.id)}>
            <BsCheck2All size={25} />{' '}
          </span>
          <span onClick={() => handleDelete(todo)}>
            <HiOutlineTrash size={25} />
          </span>
        </div>
      </div>
    </form>
  );
};
