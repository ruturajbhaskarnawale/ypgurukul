import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '../animations/MotionUtils';
import { Card, CardContent } from '../global/Card';

export const Testimonials = () => {
  const testimonials = [
    { quote: "YP Gurukul transformed my average scores into top percentiles. The teachers are incredibly supportive and available 24/7 for doubts.", name: "Rajat K.", detail: "Batch 2024" },
    { quote: "The study material is perfectly aligned with the latest exam pattern. I didn't need any extra reference books outside of the modules.", name: "Priya S.", detail: "Batch 2023" },
    { quote: "Weekly mock tests and the detailed analytics provided on the student portal helped me identify my weak areas clearly. Highly recommended!", name: "Anil D.", detail: "Batch 2024" },
  ];

  return (
    <section className="py-32 bg-background border-b border-border overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-12">
        
        <div className="flex flex-col items-center mb-32">
          <span className="font-script text-4xl text-muted-foreground lowercase mb-6">the</span>
          <h2 className="text-7xl md:text-[8rem] font-black uppercase tracking-tighter-editorial text-center leading-[0.85]">
            Unfiltered <br /> <span className="text-foreground/30">Voices</span>
          </h2>
        </div>

        <StaggerContainer className="grid md:grid-cols-3 gap-24">
          {testimonials.map((t, i) => (
            <StaggerItem key={i}>
              <div className="flex flex-col h-full items-start group">
                <span className="text-5xl font-black text-foreground/10 group-hover:text-foreground/40 transition-colors mb-12">"</span>
                <p className="text-2xl font-bold text-foreground mb-12 leading-relaxed lowercase tracking-tight italic">
                  {t.quote}
                </p>
                <div className="flex flex-col gap-2 mt-auto">
                  <h4 className="font-black text-foreground text-lg uppercase tracking-tighter">{t.name}</h4>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.3em]">{t.detail}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
