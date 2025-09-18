import { useForm } from 'react-hook-form';
import { toast } from '../store/toastStore';

const topics = [
  'Product question',
  'Order status',
  'Warranty & repairs',
  'Partnerships',
  'Something else'
];

type ContactFormValues = {
  name: string;
  email: string;
  topic: string;
  orderId?: string;
  message: string;
};

export const ContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormValues>({
    defaultValues: {
      topic: topics[0]
    }
  });

  const onSubmit = async (values: ContactFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast.success('Message sent', 'Thanks for reaching out. We will reply within 24 hours.');
    reset();
  };

  return (
    <div className="grid gap-10 pb-20 lg:grid-cols-[minmax(0,1fr)_320px]">
      <section className="space-y-6 rounded-3xl border border-slate-800/60 bg-slate-900/50 p-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold text-white">Contact us</h1>
          <p className="text-sm text-slate-300">
            We’re here to help with device recommendations, order info, and setup questions. Fill out the form and our specialists will respond within one business day.
          </p>
        </header>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-slate-200">
              Name
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-100"
              />
              {errors.name ? <span className="text-xs text-rose-300">{errors.name.message}</span> : null}
            </label>
            <label className="flex flex-col gap-2 text-sm text-slate-200">
              Email
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/, // simple format check
                    message: 'Enter a valid email address'
                  }
                })}
                className="rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-100"
              />
              {errors.email ? <span className="text-xs text-rose-300">{errors.email.message}</span> : null}
            </label>
          </div>
          <label className="flex flex-col gap-2 text-sm text-slate-200">
            Topic
            <select
              {...register('topic', { required: true })}
              className="rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-100"
            >
              {topics.map((topic) => (
                <option key={topic}>{topic}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-200">
            Order number <span className="text-xs text-slate-500">(optional)</span>
            <input
              type="text"
              {...register('orderId')}
              className="rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-100"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-200">
            Message
            <textarea
              rows={5}
              {...register('message', {
                required: 'Let us know how we can help',
                minLength: {
                  value: 20,
                  message: 'Please provide at least 20 characters so we can assist effectively'
                }
              })}
              className="rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-3 text-sm text-slate-100"
            />
            {errors.message ? <span className="text-xs text-rose-300">{errors.message.message}</span> : null}
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-400 disabled:opacity-60"
          >
            {isSubmitting ? 'Sending…' : 'Send message'}
          </button>
        </form>
      </section>
      <aside className="space-y-4 rounded-3xl border border-brand-500/40 bg-brand-500/10 p-6 text-sm text-brand-100">
        <h2 className="text-lg font-semibold text-white">Chat with our team</h2>
        <p className="text-brand-100/80">
          Live chat is available weekdays 9:00-18:00 CET. Tap the messenger icon in the bottom-right corner when you’re on the store.
        </p>
        <div className="space-y-1">
          <p className="font-semibold text-white">Email</p>
          <a href="mailto:hello@devmobile.store" className="text-brand-100 underline">
            hello@devmobile.store
          </a>
        </div>
        <div className="space-y-1">
          <p className="font-semibold text-white">Phone</p>
          <a href="tel:+493022221234" className="text-brand-100 underline">
            +49 30 2222 1234
          </a>
        </div>
      </aside>
    </div>
  );
};
