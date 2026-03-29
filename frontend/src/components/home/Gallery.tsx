"use client";

import React from 'react';
import Image from 'next/image';

const galleryItems = [
  { title: 'Smart Classroom',  image: '/images/gallery/smart_classroom.png',  span: 'md:col-span-2 md:row-span-2' },
  { title: 'Tech Lab',         image: '/images/gallery/tech_lab.png',          span: 'md:col-span-2' },
  { title: 'Library',          image: '/images/gallery/library.png',            span: '' },
  { title: 'Doubt Desk',       image: '/images/gallery/doubt_desk.png',         span: '' },
];

export const Gallery = () => {
  return (
    <section className="py-20 md:py-32 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Heading */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
            Campus Life
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground max-w-md leading-tight">
            Our Infrastructure
          </h2>
        </div>

        {/* Bento-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[600px]">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-muted ${item.span}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Label */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white text-sm font-bold">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
