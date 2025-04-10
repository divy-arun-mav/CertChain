import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button"; 

const NotFound: React.FC = () => {
  const visorRef = useRef<HTMLCanvasElement>(null);
  const cordRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const drawVisor = () => {
      const canvas = visorRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.beginPath();
      ctx.moveTo(5, 45);
      ctx.bezierCurveTo(15, 64, 45, 64, 55, 45);
      ctx.lineTo(55, 20);
      ctx.bezierCurveTo(55, 15, 50, 10, 45, 10);
      ctx.lineTo(15, 10);
      ctx.bezierCurveTo(15, 10, 5, 10, 5, 20);
      ctx.lineTo(5, 45);
      ctx.fillStyle = "#2f3640";
      ctx.strokeStyle = "#f5f6fa";
      ctx.fill();
      ctx.stroke();
    };

    const cordCanvas = cordRef.current;
    if (!cordCanvas) return;
    const ctx = cordCanvas.getContext("2d");
    if (!ctx) return;

    let y1 = 160;
    let y2 = 100;
    let y3 = 100;
    let y1Forward = true;
    let y2Forward = false;
    let y3Forward = true;

    const animate = () => {
      ctx.clearRect(0, 0, cordCanvas.width, cordCanvas.height);
      ctx.beginPath();
      ctx.moveTo(130, 170);
      ctx.bezierCurveTo(250, y1, 345, y2, 400, y3);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 8;
      ctx.stroke();

      if (y1 === 100) y1Forward = true;
      if (y1 === 300) y1Forward = false;
      if (y2 === 100) y2Forward = true;
      if (y2 === 310) y2Forward = false;
      if (y3 === 100) y3Forward = true;
      if (y3 === 317) y3Forward = false;

      y1 = y1Forward ? y1 + 1 : y1 - 1;
      y2 = y2Forward ? y2 + 1 : y2 - 1;
      y3 = y3Forward ? y3 + 1 : y3 - 1;

      requestAnimationFrame(animate);
    };

    drawVisor();
    animate();
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-r from-[#2F3640] to-[#181B20]">
      <div className="moon absolute top-[-100px] left-[-300px] w-[900px] h-[900px] rounded-full shadow-[0px_0px_30px_-4px_rgba(0,0,0,0.5)]" />
      <div className="absolute top-[250px] left-[500px] w-[60px] h-[180px] rounded-full bg-gradient-to-r from-[rgba(208,208,208,1)] to-[rgba(145,145,145,1)] opacity-60" />
      <div className="absolute top-[650px] left-[340px] w-[40px] h-[80px] rotate-[55deg] rounded-full bg-gradient-to-r from-[rgba(208,208,208,1)] to-[rgba(145,145,145,1)] opacity-60" />
      <div className="absolute top-[-20px] left-[40px] w-[65px] h-[120px] rotate-[250deg] rounded-full bg-gradient-to-r from-[rgba(208,208,208,1)] to-[rgba(145,145,145,1)] opacity-60" />

      <div
        className="absolute top-[40%] left-[50%] w-[5px] h-[5px] rounded-full bg-gray-400 opacity-40 animate-[shimmer_1.5s_alternate_infinite]"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-[60%] left-[90%] w-[5px] h-[5px] rounded-full bg-gray-400 opacity-40 animate-[shimmer_1.5s_alternate_infinite]"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute top-[10%] left-[70%] w-[5px] h-[5px] rounded-full bg-gray-400 opacity-40 animate-[shimmer_1.5s_alternate_infinite]"
        style={{ animationDelay: "2s" }}
      />
      <div className="absolute top-[90%] left-[40%] w-[5px] h-[5px] rounded-full bg-gray-400 opacity-40 animate-[shimmer_1.5s_alternate_infinite]" />
      <div
        className="absolute top-[20%] left-[30%] w-[5px] h-[5px] rounded-full bg-gray-400 opacity-40 animate-[shimmer_1.5s_alternate_infinite]"
        style={{ animationDelay: "0.5s" }}
      />

      <div className="absolute left-[100px] top-[400px] -translate-y-1/2 font-[Righteous] text-[#363e49]">
        <div className="text-white text-[10em]">404</div>
        <div className="text-white text-2xl">Hmmm...</div>
        <div className="text-white opacity-50">
          It looks like one of the developers fell asleep
        </div>
      </div>

      <div className="absolute w-[185px] h-[300px] left-[70%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 rotate-[20deg] scale-125">
        <div className="absolute top-[90px] left-[47px] w-[86px] h-[90px] rounded-lg bg-[#bfbfbf]" />
        <div className="absolute top-[115px] left-[55px] w-[70px] h-[80px] rounded-lg bg-[#e6e6e6]" />
        <div className="absolute top-[140px] left-[68px] w-[45px] h-[25px] rounded-md bg-[#d9d9d9]" />
        <div className="absolute top-[127px] left-[9px] w-[65px] h-[20px] rounded-lg bg-[#e6e6e6] -rotate-30" />
        <div className="absolute top-[102px] left-[7px] w-[20px] h-[45px] rounded-lg bg-[#e6e6e6] -rotate-12" />
        <div className="absolute top-[113px] left-[100px] w-[65px] h-[20px] rounded-lg bg-[#e6e6e6] -rotate-10" />
        <div className="absolute top-[78px] left-[141px] w-[20px] h-[45px] rounded-lg bg-[#e6e6e6] -rotate-10" />
        <div className="absolute top-[110px] left-[21px] w-[10px] h-[6px] rounded-full bg-[#e6e6e6] -rotate-35" />
        <div className="absolute top-[90px] left-[133px] w-[10px] h-[6px] rounded-full bg-[#e6e6e6] rotate-[20deg]" />
        <div className="absolute top-[122px] left-[6.5px] w-[21px] h-[4px] rounded-full bg-[#e67e22] -rotate-15" />
        <div className="absolute top-[98px] left-[141px] w-[21px] h-[4px] rounded-full bg-[#e67e22] -rotate-10" />
        <div className="absolute top-[188px] left-[50px] w-[23px] h-[75px] bg-[#e6e6e6] rotate-[10deg]" />
        <div className="absolute top-[188px] left-[108px] w-[23px] h-[75px] bg-[#e6e6e6] -rotate-10" />
        <div className="absolute top-[240px] left-[43px] w-[28px] h-[20px] rounded-sm bg-white rotate-[10deg] border-t-4 border-[#e67e22]" />
        <div className="absolute top-[240px] left-[111px] w-[28px] h-[20px] rounded-sm bg-white -rotate-10 border-t-4 border-[#e67e22]" />

        <div className="absolute">
          <canvas ref={cordRef} width="500" height="500" />
        </div>

        <div className="absolute top-[60px] left-[60px] w-[60px] h-[60px] rounded-full bg-white">
          <canvas ref={visorRef} width="60" height="60" />
          <div className="absolute top-[28px] left-[40px] w-[10px] h-[10px] rounded-full bg-[#7f8fa6] opacity-50" />
          <div className="absolute top-[40px] left-[38px] w-[5px] h-[5px] rounded-full bg-[#718093] opacity-30" />
        </div>
      </div>

      <div className="text-white absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <Button variant="outline" onClick={() => (window.location.href = "/")}>
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;