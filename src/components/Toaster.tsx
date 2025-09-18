import { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { Toast, useToastStore } from '../store/toastStore';

const iconMap: Record<NonNullable<Toast['variant']>, JSX.Element> = {
  success: <CheckCircle2 className="h-5 w-5 text-emerald-400" aria-hidden="true" />,
  error: <AlertCircle className="h-5 w-5 text-rose-400" aria-hidden="true" />,
  info: <Info className="h-5 w-5 text-brand-300" aria-hidden="true" />
};

const variantClasses: Record<NonNullable<Toast['variant']>, string> = {
  success: 'border-emerald-400/30 bg-slate-900/90',
  error: 'border-rose-400/30 bg-slate-900/90',
  info: 'border-brand-400/30 bg-slate-900/90'
};

type ToastCardProps = Toast & { dismiss: (id: string) => void };

const ToastCard = ({ id, title, description, variant = 'info', duration = 3500, dismiss }: ToastCardProps) => {
  useEffect(() => {
    const timer = setTimeout(() => dismiss(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, dismiss]);

  return (
    <div
      role="status"
      className={`flex w-full min-w-[280px] max-w-sm items-start gap-3 rounded-xl border px-4 py-3 shadow-card backdrop-blur ${variantClasses[variant]}`}
    >
      <span className="mt-0.5" aria-hidden="true">
        {iconMap[variant]}
      </span>
      <div className="flex-1 text-sm">
        <p className="font-semibold text-slate-100">{title}</p>
        {description ? <p className="mt-1 text-slate-300">{description}</p> : null}
      </div>
      <button
        type="button"
        onClick={() => dismiss(id)}
        className="rounded-full p-1 text-slate-400 transition hover:text-slate-100"
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export const Toaster = () => {
  const toasts = useToastStore((state) => state.toasts);
  const dismiss = useToastStore((state) => state.dismiss);

  const mountNode = useMemo(() => {
    if (typeof document === 'undefined') {
      return null;
    }
    const node = document.getElementById('toast-root');
    if (node) return node;
    const created = document.createElement('div');
    created.id = 'toast-root';
    document.body.appendChild(created);
    return created;
  }, []);

  if (!mountNode) {
    return null;
  }

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[9999] flex flex-col gap-3 p-4 sm:p-6">
      <div className="ml-auto flex w-full flex-col gap-3 sm:max-w-sm">
        {toasts.map((toastItem) => (
          <ToastCard key={toastItem.id} {...toastItem} dismiss={dismiss} />
        ))}
      </div>
    </div>,
    mountNode
  );
};
