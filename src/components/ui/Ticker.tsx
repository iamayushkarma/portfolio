import { useRef } from "react";

function Ticker() {
  const tickerRef = useRef<HTMLDivElement>(null);

  const items = [
    "FULL STACK DEVELOPMENT",
    "REACT & TYPESCRIPT",
    "NODE.JS & EXPRESS",
    "REST API DEVELOPMENT",
    "MYSQL & MONGODB",
    "DSA & PROBLEM SOLVING",
  ];

  const separator = <span className="mx-3 text-white/60">///</span>;

  // One full strip of items
  const strip = (
    <div className="flex items-center shrink-0">
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="font-mono font-medium text-sm sm:text-md md:text-2xl text-white tracking-widest whitespace-nowrap px-2 ">
            {item}
          </span>
          {separator}
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="bg-accent-blue border-y-2 mt-8 border-ink overflow-hidden py-2"
      onMouseEnter={() => {
        if (tickerRef.current)
          tickerRef.current.style.animationPlayState = "paused";
      }}
      onMouseLeave={() => {
        if (tickerRef.current)
          tickerRef.current.style.animationPlayState = "running";
      }}
    >
      <div
        ref={tickerRef}
        className="flex w-max"
        style={{ animation: "ticker 150s linear infinite" }}
      >
        {strip}
        {strip}
        {strip}
        {strip}
      </div>
    </div>
  );
}

export default Ticker;
