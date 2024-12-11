import { Outlet } from "react-router-dom";
import NavBar from "../components/navigation/NavBar";
import CostCalculator from "../components/costCalculator/CostCalculator";
import { useAtom } from "jotai";
import { costCalculatorAtom, projectMaterialDetailsAtom } from "../variables/NavbarVariables";
import { useEffect, useRef, useState } from "react";
import ProjectMaterialDetails from "../components/projectMaterialDetails/ProjectMaterialDetails";
const App = () => {
  const [isDragging, setIsDragging] = useState<number | null>(null);
  const [isProjectDragging, setIsProjectDragging] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragProjectOffset, setDragProjectOffset] = useState({ x: 0, y: 0 });
  const [panelPosition, setPanelPosition] = useState({
    x: window.innerWidth - 50, 
    y: 100 
  });

  const [projectPanelPosition, setProjectPanelPosition] = useState({
    x: window.innerWidth - 50, 
    y: 400 
  });

  const panelRef = useRef<HTMLDivElement>(null);
  const projectPanelRef = useRef<HTMLDivElement>(null);

  
  const [costCalculator] = useAtom(costCalculatorAtom);
  const [projectMaterialDetails] = useAtom(
    projectMaterialDetailsAtom
  );
  useEffect(() => {
    const stopDragging = () => {
      setIsDragging(0);
      setIsProjectDragging(0);
    };

    window.addEventListener("mouseup", stopDragging);
    return () => {
      window.removeEventListener("mouseup", stopDragging);
    };
  }, []);

  // const handlePanelMouseDown = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   setIsDragging(1);
  // };

  const handlePanelMouseDown = (e: React.MouseEvent) => {
    if (panelRef.current) {
      const panelRect = panelRef.current.getBoundingClientRect();
      const offsetX = e.clientX - panelRect.left;
      const offsetY = e.clientY - panelRect.top;
      setDragOffset({ x: offsetX, y: offsetY });
      setIsDragging(1);
    }
  };

  const handleProjectPanelMouseDown = (e: React.MouseEvent) => {
    if (projectPanelRef.current) {
      const panelRect = projectPanelRef.current.getBoundingClientRect();
      const offsetX = e.clientX - panelRect.left;
      const offsetY = e.clientY - panelRect.top;
      setDragProjectOffset({ x: offsetX, y: offsetY });
      setIsProjectDragging(1);
    }
  };

  const handlePanelMouseMove = (e: React.MouseEvent) => {
    if (isDragging && panelRef.current) {
      // const newX = e.clientX - panelRef.current.offsetWidth / 2;
      // const newY = e.clientY - panelRef.current.offsetHeight / 2;
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      setPanelPosition({
        x: Math.max(0, Math.min(newX, window.innerWidth - panelRef.current.offsetWidth)), // Prevent horizontal overflow
        y: Math.max(0, Math.min(newY, window.innerHeight - panelRef.current.offsetHeight)), // Prevent vertical overflow
      });
    }
    if (isProjectDragging && projectPanelRef.current) {
      // const newX = e.clientX - panelRef.current.offsetWidth / 2;
      // const newY = e.clientY - panelRef.current.offsetHeight / 2;
      const newX = e.clientX - dragProjectOffset.x;
      const newY = e.clientY - dragProjectOffset.y;

      setProjectPanelPosition({
        x: Math.max(0, Math.min(newX, window.innerWidth - projectPanelRef.current.offsetWidth)), // Prevent horizontal overflow
        y: Math.max(0, Math.min(newY, window.innerHeight - projectPanelRef.current.offsetHeight)), // Prevent vertical overflow
      });
    }
  };

  

  return (
    <div  onMouseMove={handlePanelMouseMove} className="w-screen relative bg-secondary dark:bg-custom-bgcl-gradient dark:text-white h-screen flex flex-col items-center ">
      <NavBar />
      <Outlet />
      {costCalculator && (
        <div
        ref={panelRef}
        style={{
          left: `${panelPosition.x}px`,
          top: `${panelPosition.y}px`,
        }}
        onMouseDown={handlePanelMouseDown}
        className="absolute z-[1] cursor-grab bg-transparent"
      >
        <CostCalculator />
      </div>
        
      )}

      {projectMaterialDetails && (
        <div
        ref={projectPanelRef}
        style={{
          left: `${projectPanelPosition.x}px`,
          top: `${projectPanelPosition.y}px`,
        }}
        onMouseDown={handleProjectPanelMouseDown}
        className="absolute z-[2] cursor-grab bg-transparent"
      >
        <ProjectMaterialDetails />
      </div>
        
      )}
    </div>
  );
};

export default App;
