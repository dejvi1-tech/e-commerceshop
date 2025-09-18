const policies = [
  {
    id: 'privacy',
    title: 'Privacy policy',
    content: [
      'We only collect data required to process your order, ship your products, and provide support. Payment details are handled securely by our payment partners and never stored on Dev Mobile servers.',
      'Analytics is aggregated and anonymous. You can request data deletion at any time by emailing privacy@devmobile.store.'
    ]
  },
  {
    id: 'returns',
    title: 'Returns & exchanges',
    content: [
      'You have 30 days after delivery to request a return. Products must be in original condition with accessories. Contact support to receive a prepaid label.',
      'We cover return shipping on defective items. For changed-mind returns, €6.50 is deducted to cover the return label.'
    ]
  },
  {
    id: 'shipping',
    title: 'Shipping & delivery',
    content: [
      'Orders placed before 15:00 CET ship the same day. Express shipments arrive in 1-2 business days across the EU and are carbon-offset.',
      'We’ll email you a tracking link once the parcel leaves our warehouse. Lost or delayed packages are covered by our shipping protection program.'
    ]
  }
];

export const PoliciesPage = () => {
  return (
    <div className="space-y-8 pb-20">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-white">Store policies</h1>
        <p className="text-sm text-slate-300">
          We keep policies transparent so you know what to expect when you order from Dev Mobile.
        </p>
      </header>
      <div className="space-y-6">
        {policies.map((policy) => (
          <section key={policy.id} id={policy.id} className="space-y-3 rounded-3xl border border-slate-800/60 bg-slate-900/40 p-6">
            <h2 className="text-xl font-semibold text-white">{policy.title}</h2>
            {policy.content.map((paragraph, index) => (
              <p key={index} className="text-sm text-slate-300">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
};
