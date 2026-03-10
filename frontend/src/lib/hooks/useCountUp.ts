"use client";

import { useState, useEffect } from 'react';
import gsap from 'gsap';

/**
 * useCountUp — A custom hook to animate a numerical value from 0 to a target value
 * using GSAP for smooth easing and timing.
 * 
 * @param endValue - The target value to count up to.
 * @param duration - Animation duration in seconds.
 * @param suffix - Optional string to append to the value (e.g., "%", "K+").
 * @param startTrigger - Whether the animation should start (useful for scroll triggering).
 */
export const useCountUp = (
    endValue: number,
    duration: number = 2,
    suffix: string = "",
    startTrigger: boolean = false
) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!startTrigger) return;

        const obj = { value: 0 };
        gsap.to(obj, {
            value: endValue,
            duration: duration,
            ease: "power2.out",
            onUpdate: () => {
                setCount(Math.floor(obj.value));
            },
        });
    }, [endValue, duration, startTrigger]);

    return `${count}${suffix}`;
};
