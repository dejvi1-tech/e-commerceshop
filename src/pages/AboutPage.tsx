import { CheckCircle, Globe, Users } from 'lucide-react';

const milestones = [
  {
    year: '2018',
    title: 'Founded in Berlin',
    description: 'We started as a boutique retailer focused on flagship Android devices.'
  },
  {
    year: '2020',
    title: 'Expanded accessories catalog',
    description: 'Added curated accessories from premium brands with EU-wide shipping.'
  },
  {
    year: '2023',
    title: 'Concierge checkout launched',
    description: 'Introduced personalised checkout assistance for high-value orders and corporate clients.'
  }
];

const values = [
  {
    icon: <CheckCircle className="h-5 w-5" aria-hidden="true" />,
    title: 'Authenticity guaranteed',
    description: 'We partner directly with manufacturers and authorized distributors.'
  },
  {
    icon: <Globe className="h-5 w-5" aria-hidden="true" />,
    title: 'Carbon-aware logistics',
    description: 'We offset every shipment and choose low-impact packaging.'
  },
  {
    icon: <Users className="h-5 w-5" aria-hidden="true" />,
    title: 'Human support',
    description: 'Need help choosing? Message our crew and talk to real product specialists.'
  }
];

export const AboutPage = () => {
  return (
    <div className="space-y-12 pb-20">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold text-white">About Dev Mobile</h1>
        <p className="max-w-3xl text-base text-slate-300">
          Dev Mobile is an independent, future-ready phones and accessories store. We vet every
          product against a rigorous checklist: strong customer experience, reliable software updates,
          and sustainability commitments from our partners. The result is a compact catalog that you can
          trust without reading dozens of reviews.
        </p>
      </section>
      <section className="grid gap-6 rounded-3xl border border-slate-800/60 bg-slate-900/40 p-6 md:grid-cols-3">
        {values.map((value) => (
          <article key={value.title} className="space-y-2">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-200">
              {value.icon}
            </span>
            <h2 className="text-lg font-semibold text-white">{value.title}</h2>
            <p className="text-sm text-slate-400">{value.description}</p>
          </article>
        ))}
      </section>
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Milestones</h2>
        <dl className="space-y-4">
          {milestones.map((milestone) => (
            <div key={milestone.year} className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-4">
              <dt className="text-xs uppercase tracking-wide text-brand-200">{milestone.year}</dt>
              <dd className="mt-2 text-lg font-semibold text-white">{milestone.title}</dd>
              <p className="mt-2 text-sm text-slate-400">{milestone.description}</p>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
};
