import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const testimonials = [
  {
    quote: "YP Gurukul transformed my average scores into top percentiles. The teachers are incredibly supportive and available for doubts anytime.",
    name: 'Rajat K.',
    batch: 'NEET 2024',
    rating: 5,
  },
  {
    quote: "The study material is perfectly aligned with the latest exam pattern. I didn't need any extra reference books outside of the modules.",
    name: 'Priya S.',
    batch: 'JEE 2023',
    rating: 5,
  },
  {
    quote: "Weekly mock tests and the detailed analytics helped me clearly identify my weak areas and improve systematically. Highly recommended!",
    name: 'Anil D.',
    batch: 'Board Exams 2024',
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section className="py-20 md:py-32 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Student Reviews
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            What Our Students Say
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex flex-col p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <FaStar key={s} size={13} className="text-yellow-400" />
                ))}
              </div>

              {/* Quote icon */}
              <FaQuoteLeft size={20} className="text-primary/30 mb-4" />

              {/* Quote text */}
              <p className="text-sm md:text-base text-foreground leading-relaxed flex-1 mb-6">
                {t.quote}
              </p>

              {/* Attribution */}
              <div className="border-t border-border pt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.batch}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
