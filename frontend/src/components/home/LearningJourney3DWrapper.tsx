"use client";
import React from 'react';
import dynamic from 'next/dynamic';

const LearningJourney3D = dynamic(() => import('./LearningJourney3D').then((mod) => mod.LearningJourney3D), {
  ssr: false,
});

export const LearningJourney3DWrapper = () => {
  return <LearningJourney3D />;
};
