import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '../animations/MotionUtils';
import { FaGraduationCap, FaChalkboardTeacher, FaBookOpen, FaTrophy } from 'react-icons/fa';

export const WhyChooseUs = ({ isNested = false }: { isNested?: boolean }) => {
  const features = [
    {
      icon: <FaChalkboardTeacher size={24} />,
      title: "Star Faculty",
      desc: "Learn directly from IITians and doctors with decades of proven teaching experience."
    },
    {
      icon: <FaBookOpen size={24} />,
      title: "Comprehensive Material",
      desc: "Exhaustive study modules, DPPS, and previous year question banks updated annually."
    },
    {
      icon: <FaTrophy size={24} />,
      title: "Proven Track Record",
      desc: "Highest selection ratio in the region with consistent top 100 AIRs every year."
    },
    {
      icon: <FaGraduationCap size={24} />,
      title: "Personalized Mentorship",
      desc: "1-on-1 doubt clearing sessions and regular parent-teacher academic reviews."
    }
  ];

  return (
    <section className={isNested ? "" : "py-32 bg-background border-b border-border"}>
      <div className="max-w-[1800px] mx-auto px-12">
        
        <div className="flex flex-col items-start mb-32">
          <span className="font-script text-4xl text-muted-foreground lowercase mb-6">the</span>
          <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter-editorial leading-[0.85]">
            YP Gurukul <br /> <span className="text-foreground/20">Advantage</span>
          </h2>
        </div>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-24">
          {features.map((feature, idx) => (
            <StaggerItem key={idx}>
              <div className="flex flex-col items-start">
                <span className="text-[12px] font-bold uppercase tracking-[0.4em] text-muted-foreground/30 mb-8 font-manrope">
                  0{idx + 1}
                </span>
                <h3 className="text-3xl font-black mb-6 uppercase tracking-tighter text-foreground">
                  {feature.title}
                </h3>
                <p className="text-base text-muted-foreground lowercase leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
