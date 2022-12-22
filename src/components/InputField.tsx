import { ChangeEvent, FormEvent, useState } from 'react';
import { Todo } from '../models/todo';
import { errorToast, successToast } from './common/notificationHandler';
import dayjs from 'dayjs';
import { v4 } from 'uuid';
import { db } from './common/DB';

type inpuFieldProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const InputField = ({ todos, setTodos }: inpuFieldProps) => {
  const [title, setTitle] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const today = new Date();

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    if (!title) return errorToast('Activity is Requiered');
    if (!date) return errorToast('Date and Time to Completion is Requiered');

    try {
      const newTodoToAdd = { title, isDone: false, date: dayjs(date).format('DD MMM YYYY HH:mm'), id: Date.now(), _id: v4() };
      console.log('newTodoToAdd', newTodoToAdd);
      await db.put(newTodoToAdd);
      successToast('Task Added Successfully');
    } catch (error) {
      console.log('adderror', error);
      errorToast('Something Went wrong');
    }
  };

  return (
    <form className='input__wrapper flex-col md:flex-row' onSubmit={handleAdd}>
      <div>
        <input
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          autoFocus
          className='input__box'
          placeholder='Enter a milestone to be conquered'
        />
        <button type='submit' className='add__btn'>
          Add
        </button>
      </div>
      <input
        value={date}
        min={dayjs(today).format('YYYY-MM-DDTHH:mm')}
        placeholder={'22/22/22'}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
        className='date__box w-full md:w-80'
        type='datetime-local'
      />
    </form>
  );
};
