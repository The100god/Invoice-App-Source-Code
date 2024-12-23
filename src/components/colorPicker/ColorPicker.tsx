import React, { useState, useRef, useEffect } from "react";
import { CgColorPicker } from "react-icons/cg";

interface ColorPickerProps {
  onColorChange: (color: string) => void;
  initialColor?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onColorChange, initialColor = "#FF0000" }) => {
  const [color, setColor] = useState<string>("#FF0000");
  const [opacity, setOpacity] = useState<number>(100);
  const [brightness, setBrightness] = useState<number>(100);
  const [selectedButton, setSelectedButton] = useState<number>(0); // 0: None, 1: First, 2: Second
  const colorWheelRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 150, y: 150 });
  const [isPicking, setIsPicking] = useState(false);

  const [hue, setHue] = useState<number>(0);
  const [saturation, setSaturation] = useState<number>(1);

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsPicking(true);
    handleColorChange(event);
  };

  const handleMouseUp = () => {
    setIsPicking(false);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (isPicking) handleColorChange(event);
  };

  const handleColorChange = (event: React.MouseEvent) => {
    if (!colorWheelRef.current) return;

    const rect = colorWheelRef.current.getBoundingClientRect();
    const centerX = rect.width / 2; // Center X
  const centerY = rect.height / 2; // Center Y

    const x = event.clientX - rect.left - centerX; // X offset
    const y = event.clientY - rect.top - centerY; // Y offset
    const radius = Math.sqrt((x * x) + (y * y));
    const maxRadius = centerX;

    // Restrict the cursor within the circle
    if (radius > maxRadius) return;

    // Calculate hue and saturation based on position
    let newHue = ((Math.atan2(y, x) * 180) / Math.PI+95)%360;
    if (newHue < 0) newHue += 360;
    const newSaturation = radius / maxRadius;

    // Convert HSV to HEX and apply brightness adjustment
    setHue(newHue);
    setSaturation(newSaturation);
    const selectedColor = hsvToHex(newHue, newSaturation, brightness /100, opacity);
    setColor(selectedColor);
    onColorChange(selectedColor);
    setCursorPosition({
      x: x + centerX,
      y: y + centerY,
    });
  };

  const hsvToHex = (h: number, s: number, v: number, opacity: number): string => {
    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;

    let [r, g, b] = [0, 0, 0];
    if (h >= 0 && h < 60) [r, g, b] = [c, x, 0];
    else if (h >= 60 && h < 120) [r, g, b] = [x, c, 0];
    else if (h >= 120 && h < 180) [r, g, b] = [0, c, x];
    else if (h >= 180 && h < 240) [r, g, b] = [0, x, c];
    else if (h >= 240 && h < 300) [r, g, b] = [x, 0, c];
    else if (h >= 300 && h < 360) [r, g, b] = [c, 0, x];

    const [R, G, B] = [r + m, g + m, b + m].map((val) =>
      Math.round(val * 255 * v)
    );

    const alpha = Math.round((opacity / 100) * 255);
  const alphaHex = alpha.toString(16).padStart(2, "0");

  return `#${R.toString(16).padStart(2, "0")}${G.toString(16).padStart(2, "0")}${B.toString(16).padStart(2, "0")}${alphaHex}`;

  };

  useEffect(() => {
    // Update color when brightness or opacity changes
    const selectedColor = hsvToHex(hue, saturation, brightness / 100, opacity);
    setColor(selectedColor);
    onColorChange(selectedColor)
  }, [brightness, opacity, hue, saturation]);

  
  

  return (
    <div className="flex flex-col items-center p-4 bg-primary dark:bg-transparent dark:backdrop-blur-3xl text-white rounded-lg w-80">
      {/* Top Buttons */}
      <div className="flex justify-center mb-4 space-x-4">
        <button
          onClick={() => {setSelectedButton(1)
            setColor("#A9A5A5")
            onColorChange("#A9A5A5")
          }}
          className={`w-10 h-10 flex items-center justify-center border-[1px] border-[solid] border-[#FFFFFF] rounded-md ${
            selectedButton === 1
              ? " bg-gray-300 shadow-lg"
              : "bg-transparent hover:bg-gray-600"
          }`}
        >
          <div className="w-7 h-7 border border-white bg-[#A9A5A5]"></div>
        </button>

        <button
          onClick={() => {setSelectedButton(2)
            setColor("#00FFFFFF")
            setOpacity(0)
          }}
          className={`w-10 h-10 flex items-center justify-center border-[1px] border-[solid] border-[#FFFFFF] rounded-md ${
            selectedButton === 2
              ? "bg-gray-300 shadow-lg"
              : "bg-transparent hover:bg-gray-600"
          }`}
        >
          <div
            className="w-6 h-6 bg-white"
            style={{
              backgroundImage:
                "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2210%22 height=%2210%22 fill=%22black%22><rect width=%225%22 height=%225%22 /><rect x=%225%22 y=%225%22 width=%225%22 height=%225%22 /></svg>')",
            }}
          ></div>
        </button>

        <button className="w-10 h-10 text-[30px] flex items-center justify-center rounded-md bg-transparent hover:bg-gray-600">
          <CgColorPicker />
        </button>
      </div>

      {/* Color Wheel */}
      <div
        ref={colorWheelRef}
        className="relative w-60 h-60 rounded-full"
        style={{
          backgroundImage:
            "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="absolute w-6 h-6 border-2 border-white rounded-full pointer-events-none"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
            backgroundColor: color,
            transform: "translate(-50%, -50%)",
          }}
        ></div>
      </div>

      {/* Sliders */}
      <div className="flex flex-col w-full mt-6 space-y-4">
        {/* Brightness Slider */}
        <div className="relative">
          <input
            type="range"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            min="0"
            max="100"
            className="w-full appearance-none h-2 rounded-lg bg-gradient-to-r from-gray-300"
            style={{
              background: `linear-gradient(to right, #d1d5db, ${color})`
            }}
          />
        </div>

        {/* Opacity Slider */}
        <div className="relative">
          <input
            type="range"
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            min="0"
            max="100"
            className="w-full appearance-none h-2 rounded-lg bg-gradient-to-r from-white to-black"
          />
        </div>
      </div>

      {/* Hex and Opacity */}
      <div className="flex items-center justify-between w-full mt-4">
        <label className="text-sm p-2 text-white border-[0.25px] border-solid border-[#D9D9D9] bg-transparent rounded-md">Hex</label>
        <div className="flex justify-center items-center gap-1">
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-32 p-2 text-white border-[0.25px] border-solid border-[#D9D9D9] bg-transparent rounded-l-[5px] rounded-r-none"
        />
        <span className="text-white text-sm p-2 border-[0.25px] border-solid border-[#D9D9D9] bg-transparent rounded-r-[5px] rounded-l-none">{opacity}%</span>
        </div>
      </div>

      {/* Predefined Color Swatches */}
      <div className="grid grid-cols-7 gap-2 mt-6">
        {[
          "#FFFFFF",
          "#000000",
          "#7FFF6F",
          "#BF4B26",
          "#F43135",
          "#C73760",
          "#9629D4",
          "#57BA0C",
          "#FF69D2",
          "#FFD96F",
          "#FF0000",
          "#00FF11",
          "#0793CF",
          "#FFEA00",
        ].map((swatch) => (
          <div
            key={swatch}
            onClick={() => setColor(swatch)}
            className="w-8 h-8 rounded-md cursor-pointer"
            style={{ backgroundColor: swatch }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;

