"use client";

import React from 'react';
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Nexus, GlobalNeuralGrid, KnowledgeShards } from './Scene3DComponents';

interface Scene3DWrapperProps {
    isMobile: boolean;
}

const Scene3DWrapper: React.FC<Scene3DWrapperProps> = ({ isMobile }) => {
    // 3D Parallax replaced by 2D CSS-based parallax (Shopify style)
    // Returning null to remove the entire WebGL canvas overhead from all scenes
    return null;
};

export default Scene3DWrapper;
