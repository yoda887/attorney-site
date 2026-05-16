interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

let nextId = 0;

export const useToast = () => {
  const toasts = useState<Toast[]>('toasts', () => []);

  const show = (message: string, type: Toast['type'] = 'info', duration = 4000) => {
    const id = nextId++;
    toasts.value.push({ id, message, type });
    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id);
    }, duration);
  };

  const success = (message: string) => show(message, 'success');
  const error = (message: string) => show(message, 'error');
  const info = (message: string) => show(message, 'info');

  return { toasts, show, success, error, info };
};
