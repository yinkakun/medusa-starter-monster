import toast from 'react-hot-toast';
import { CheckCircle, X } from 'react-feather';

export const successToast = (message: string) => {
  toast.custom((toast) => (
    <div
      className={`mb-2 flex items-center gap-3 bg-green-500 px-8 py-3 font-alt-sans text-xs uppercase text-white ${
        toast.visible ? 'animate-enter' : 'animate-leave'
      }`}
    >
      <span>{message}</span>
      <CheckCircle size={20} />
    </div>
  ));
};

export const errorToast = (message: string) => {
  toast.custom((toast) => (
    <div
      className={`mb-2 flex items-center gap-3 bg-red-500 px-6 py-3 font-alt-sans text-xs uppercase text-white ${
        toast.visible ? 'animate-enter' : 'animate-leave'
      }`}
    >
      <span>{message}</span>
      <X size={18} />
    </div>
  ));
};
