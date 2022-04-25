import { toast } from 'react-toastify';

export default function useToast({ type, message }) {
  // dispatch(changeShowType(type))
  return () => toast(message);
}
