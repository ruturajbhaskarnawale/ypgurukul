import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

const faculty = [
  { name: 'Dr. A. Verma',   subject: 'Physics',     exp: '15+ Years Experience', image: '/images/faculty/verma.png' },
  { name: 'Mr. R. Sharma',  subject: 'Mathematics',  exp: 'Ex-IIT Delhi Faculty',  image: '/images/faculty/sharma.png' },
  { name: 'Dr. S. Patil',   subject: 'Chemistry',   exp: 'Published Author',      image: '/images/faculty/patil.png' },
  { name: 'Ms. K. Iyer',    subject: 'Biology',     exp: '10+ Years Experience',  image: '/images/faculty/iyer.png' },
];

export const FacultyPreview = () => {
  return (
    <section className="py-20 md:py-32 bg-secondary border-b border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Heading */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Our Teachers
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground max-w-md leading-tight">
              Learn from the Best
            </h2>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-4 transition-all duration-300 shrink-0"
            >
              Meet All Faculty <FaArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Faculty grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {faculty.map((member, idx) => (
            <div
              key={idx}
              className="group flex flex-col rounded-2xl bg-card border border-border overflow-hidden hover:shadow-md hover:border-primary/30 transition-all duration-300"
            >
              {/* Photo */}
              <div className="relative h-56 sm:h-64 w-full bg-muted overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                  {member.subject}
                </span>
                <h3 className="text-base font-bold text-foreground leading-snug">
                  {member.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {member.exp}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
