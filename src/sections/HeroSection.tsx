import { useState } from "react";
import Button from "../components/ui/Button";
import ResumeModal from "../components/ui/ResumeModal";
import Ticker from "../components/ui/Ticker";

function HeroSection() {
  const [showResume, setShowResume] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center justify-center min-h-svh py-8 md:h-svh md:py-0">
      {/* Heading  */}
      <div className="relative z-10 text-center w-full px-2 sm:max-w-5xl sm:px-4">
        <h1
          className="
          text-[18vw]
          sm:text-[15vw]
          md:text-[12vw]
          lg:text-[10vw]
          xl:text-[9vw]
          2xl:text-[8vw]
          leading-[0.85]
          font-black uppercase tracking-tighter mb-4 sm:mb-6
        "
        >
          FULL STACK
          <br />
          <span
            className="text-white text-stroke-black"
            style={{ WebkitTextStroke: "3px black" }}
          >
            DEVELOPER
          </span>
        </h1>
      </div>

      {/* Info Paragraph */}
      <div className="w-full px-4 py-2">
        <p
          className="
            font-mono
            text-sm sm:text-lg md:text-2xl
            max-w-[92vw] sm:max-w-md md:max-w-2xl
            leading-5 sm:leading-7 md:leading-9
            bg-accent-blue text-white text-center
            mx-auto mb-4 sm:mb-6 md:mb-10
            border-2 border-black
            px-3 py-2 sm:px-4 sm:py-3 md:py-4
            shadow-brutal reveal active
        "
        >
          I build things for the web that actually work.{" "}
          <br className="hidden sm:block" />
          <span className="font-bold block sm:inline mt-1 sm:mt-0">
            Full-Stack · React · TypeScript · Node.js
          </span>
        </p>
      </div>

      {/* CTA */}
      <div className="flex gap-3 md:gap-6">
        <Button
          label="Explore"
          to="#skills"
          className="py-1.5 px-5 text-lg bg-black! hover:bg-accent-blue! text-white md:py-3 md:px-8 md:text-2xl!"
        />
        <Button
          label="View Resume"
          onClick={() => setShowResume(true)}
          className="py-1.5 px-5 text-lg hover:bg-accent-blue! hover:text-white md:py-3 md:px-8 md:text-2xl!"
        />
      </div>

      {showResume && <ResumeModal onClose={() => setShowResume(false)} />}

      <div className="overflow-x-hidden w-full mt-6 md:mt-0">
        <Ticker />
      </div>
    </div>
  );
}

export default HeroSection;
