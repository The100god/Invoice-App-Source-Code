import React, { useState, useRef } from "react";
import { CgColorPicker } from "react-icons/cg";

const ColorPicker: React.FC = () => {
  const [color, setColor] = useState<string>("#BF4B26");
  const [opacity, setOpacity] = useState<number>(100);
  const [brightness, setBrightness] = useState<number>(100);
  const [selectedButton, setSelectedButton] = useState<number>(0); // 0: None, 1: First, 2: Second
  const colorWheelRef = useRef<HTMLDivElement>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 150, y: 150 });
  const [isPicking, setIsPicking] = useState(false);

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
    const x = event.clientX - rect.left - rect.width / 2; // X offset
    const y = event.clientY - rect.top - rect.height / 2; // Y offset
    const radius = Math.sqrt(x ** 2 + y ** 2);
    const maxRadius = rect.width / 2;

    // Restrict the cursor within the circle
    if (radius > maxRadius) return;

    setCursorPosition({ x: x + rect.width / 2, y: y + rect.height / 2 });

    // Calculate hue and saturation based on position
    let hue = Math.atan2(y, x) * (180 / Math.PI);
    if (hue < 0) hue += 360;
    const saturation = radius / maxRadius;

    // Convert HSV to HEX and apply brightness adjustment
    const selectedColor = hsvToHex(hue, saturation, brightness / 100);
    setColor(selectedColor);
  };

  const hsvToHex = (h: number, s: number, v: number): string => {
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
      Math.round(val * 255)
    );
    return `#${R.toString(16).padStart(2, "0")}${G.toString(16).padStart(2, "0")}${B.toString(16).padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center p-4 bg-primary text-white rounded-lg shadow-lg w-80">
      {/* Top Buttons */}
      <div className="flex justify-center mb-4 space-x-4">
        <button
          onClick={() => setSelectedButton(1)}
          className={`w-10 h-10 flex items-center justify-center rounded-md ${
            selectedButton === 1
              ? "bg-gray-300 shadow-lg"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          <div className="w-6 h-6 border border-black bg-gray-500"></div>
        </button>

        <button
          onClick={() => setSelectedButton(2)}
          className={`w-10 h-10 flex items-center justify-center rounded-md ${
            selectedButton === 2
              ? "bg-gray-300 shadow-lg"
              : "bg-gray-700 hover:bg-gray-600"
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

        <button className="w-10 h-10 flex items-center justify-center rounded-md bg-transparent hover:bg-gray-600">
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
            className="w-full appearance-none h-2 rounded-lg bg-gradient-to-r from-gray-300 to-purple-700"
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
        <label className="text-sm">Hex</label>
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-32 p-2 text-black rounded-md"
        />
        <span>{opacity}%</span>
      </div>

      {/* Predefined Color Swatches */}
      <div className="grid grid-cols-6 gap-2 mt-6">
        {[
          "#FFFFFF",
          "#000000",
          "#FF0000",
          "#00FF00",
          "#0000FF",
          "#FFFF00",
          "#FF00FF",
          "#00FFFF",
          "#BF4B26",
          "#FF5733",
          "#33FF57",
          "#3357FF",
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

