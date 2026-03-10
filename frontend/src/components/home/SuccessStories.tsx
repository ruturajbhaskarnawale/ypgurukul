import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '../animations/MotionUtils';
import { Button } from '../global/Button';
import Link from 'next/link';
import Image from 'next/image';
import { Starfield } from './Starfield';

export const SuccessStories = () => {
  const stories = [
    { rank: "AIR 12", name: "Kavya Menon", exam: "NEET 2023", quote: "YP Gurukul's consistent mentorship was the key to my success.", image: "/images/students/kavya.png" },
    { rank: "AIR 45", name: "Rahul Das", exam: "JEE Adv 2023", quote: "The doubt clearing sessions cleared my core concepts perfectly.", image: "/images/students/rahul.png" },
    { rank: "State Topper", name: "Aisha Khan", exam: "Class 12 Boards", quote: "I owe my 98.6% to the rigorous test series.", image: "/images/students/aisha.png" },
    { rank: "AIR 89", name: "Vikram S.", exam: "NEET 2024", quote: "The study material is unmatched in quality.", image: "/images/students/vikram.png" },
  ];

  return (
    <section className="relative py-16 md:py-20 bg-background border-b border-white/5 overflow-hidden">
      <Starfield opacity={0.6} />
      <div className="relative z-10 max-w-[1800px] mx-auto px-6 md:px-12">
        
        <div className="flex flex-col items-center mb-16 md:mb-32">
          <span className="font-script text-3xl md:text-4xl text-muted-foreground lowercase mb-4 md:mb-6">our</span>
          <h2 className="text-fluid-title font-black uppercase tracking-tighter-editorial text-center leading-[0.85]">
            Wall of <br /> <span className="text-foreground/30">Fame</span>
          </h2>
        </div>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4">
          {stories.map((story, i) => (
            <StaggerItem key={i}>
              <div className="text-center group flex flex-col items-center">
                <div className="bg-muted/20 h-[350px] md:h-[400px] w-full relative overflow-hidden mb-6 md:mb-8 border border-border">
                   <Image 
                     src={story.image} 
                     alt={story.name} 
                     fill 
                     className="object-cover group-hover:scale-110 transition-transform duration-700"
                   />
                   <div className="absolute inset-0 bg-background/10 group-hover:bg-transparent transition-colors duration-700" />
                   <div className="absolute inset-0 flex items-center justify-center text-foreground/20 font-bold uppercase tracking-widest text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                     Achiever
                   </div>
                </div>
                <div className="flex flex-col items-center mb-4">
                  <span className="text-foreground font-black text-3xl mb-1 tracking-tighter-editorial uppercase">
                    {story.rank}
                  </span>
                  <span className="text-[10px] font-bold px-3 py-1 bg-foreground text-background uppercase tracking-[0.2em]">
                    {story.exam}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 uppercase tracking-tight">
                  {story.name}
                </h3>
                <p className="text-sm font-medium text-muted-foreground lowercase max-w-[200px]">
                  {story.quote}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-8 text-center md:hidden">
            <Link href="/about">
              <Button variant="outline" className="w-full">View All Results</Button>
            </Link>
        </div>

      </div>
    </section>
  );
};
