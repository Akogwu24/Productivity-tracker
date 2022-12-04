import { toast } from 'react-toast';

export const successToast = (msg: string) => toast.success(msg || 'successful!');

export const errorToast = (msg: string) => toast.error(msg || 'Something went wrong!');

export const warningToast = (msg: string) => toast.warn(msg || 'Warning!');

export const infoToast = (msg: string) => toast.info(msg || 'Incorrect or Invalid!');
