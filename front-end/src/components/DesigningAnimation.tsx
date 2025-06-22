import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, SplitText);

function DesigningAnimation() {
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;
    const split = new SplitText(textRef.current, { type: "chars" });
    gsap.set(textRef.current, { opacity: 1 });
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.7 });
    tl.fromTo(
      split.chars,
      { opacity: 0, y: 30, color: "#0ea5e9" },
      {
        opacity: 1,
        y: 0,
        color: "#0ea5e9",
        duration: 0.7,
        stagger: 0.07,
        ease: "back.out(1.7)",
      }
    ).to(
      split.chars,
      {
        opacity: 0,
        y: -20,
        duration: 0.5,
        stagger: 0.05,
        ease: "power1.in",
      },
      "+=0.5"
    );
    return () => {
      tl.kill();
      split.revert();
    };
  }, []);

  return (
    <h1
      ref={textRef}
      className="text-4xl font-bold text-[#1a3a3a] tracking-tight select-none mb-8 min-h-[2.5em]"
    >
      디자인 중입니다
    </h1>
  );
}

export default DesigningAnimation;
