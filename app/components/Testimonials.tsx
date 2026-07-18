import { Testimonial } from '../types';

interface TestimonialsProps {
  items: Testimonial[];
}

export default function Testimonials({ items }: TestimonialsProps) {
  return (
    <section className="mb-6">
      <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">Community Success Insights</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((t) => (
          <div key={t.id} className="bg-white border border-stone-200 p-4 rounded-xl shadow-sm transition-all hover:border-emerald-200">
            <p className="text-stone-600 text-xs italic leading-relaxed">"{t.text}"</p>
            <span className="block text-stone-400 text-[10px] font-medium mt-2 text-right">— {t.author}</span>
          </div>
        ))}
      </div>
    </section>
  );
}