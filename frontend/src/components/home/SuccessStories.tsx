import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaMedal } from 'react-icons/fa';

const stories = [
  { rank: 'AIR 12',       name: 'Kavya Menon', exam: 'NEET 2023',       quote: 'YP Gurukul\'s consistent mentorship was the key to my success.',  image: '/images/students/kavya.png' },
  { rank: 'AIR 45',       name: 'Rahul Das',   exam: 'JEE Adv 2023',    quote: 'Doubt clearing sessions sharpened my core concepts perfectly.',   image: '/images/students/rahul.png' },
  { rank: 'State Topper', name: 'Aisha Khan',  exam: 'Class 12 Boards', quote: 'I owe my 98.6% to the rigorous test series and great faculty.',   image: '/images/students/aisha.png' },
  { rank: 'AIR 89',       name: 'Vikram S.',   exam: 'NEET 2024',       quote: 'The study material quality is truly unmatched in the region.',      image: '/images/students/vikram.png' },
];

export const SuccessStories = () => {
  return (
    <section className="py-20 md:py-32 bg-secondary border-b border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Heading */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Our Achievers
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground max-w-md leading-tight">
              Student Success Stories
            </h2>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-4 transition-all duration-300 shrink-0"
            >
              View All Results <FaArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Story cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stories.map((story, i) => (
            <div
              key={i}
              className="group flex flex-col rounded-2xl bg-card border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all duration-300"
            >
              {/* Photo */}
              <div className="relative h-48 sm:h-56 w-full bg-muted overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                {/* Rank badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md">
                  <FaMedal size={10} />
                  {story.rank}
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col gap-1.5 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                  {story.exam}
                </span>
                <h3 className="text-base font-bold text-foreground leading-snug">
                  {story.name}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                  "{story.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
