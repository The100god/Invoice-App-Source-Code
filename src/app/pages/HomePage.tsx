import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import {
  activeProjectIdAtom,
  homeClickAtom,
  isEnterInvoiceAtom,
  projectsAtom,
} from "../../variables/NavbarVariables";
import { useNavigate } from "react-router";
import { IoClose } from "react-icons/io5";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState("");
  const [recentFiles, setRecentFiles] = useState<
    {
      name: string;
      id: number;
      date: string;
    }[]
  >(() => {
    return JSON.parse(localStorage.getItem("recentFileToSave") || "[]");
  });

  const [sortOrder, setSortOrder] = useState("Recent");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenModalOpen, setIsOpenModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  const [, setIsEnterInvoice] = useAtom(isEnterInvoiceAtom);
  const [projects, setProjects] = useAtom(projectsAtom);
  const [, setActiveProjectId] = useAtom(activeProjectIdAtom);

  const [homeClick, setHomeClick] = useAtom(homeClickAtom);

  const parseRelativeDate = (relativeDate: string): Date => {
    const [value] = relativeDate.split(" ");
    const daysAgo = parseInt(value, 10);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - daysAgo);
    return currentDate;
  };

  useEffect(() => {
    const sortedFiles = [...recentFiles].sort((a, b) => {
      const dateA = parseRelativeDate(a.date);
      const dateB = parseRelativeDate(b.date);

      if (sortOrder === "Recent") {
        return dateB.getTime() - dateA.getTime();
      }
      return dateA.getTime() - dateB.getTime();
    });

    setRecentFiles(sortedFiles);
  }, [sortOrder]);
  const sortedFiles = [...recentFiles].sort((a, b) => {
    if (sortOrder === "Recent") {
      return new Date(a.date) > new Date(b.date) ? -1 : 1;
    }
    return new Date(a.date) < new Date(b.date) ? -1 : 1;
  });

  const filteredFiles = sortedFiles.filter((file) =>
    file.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleSaveProject = () => {
    if (newProjectName.trim() === "") return;

    const newProject = {
      name: newProjectName,
      id: projects.length,
      d: new Date().toISOString(), // Save as ISO date for consistency
    };

    setProjects((prev) => [
      ...prev,
      { name: newProject.name, id: newProject.id },
    ]);
    setActiveProjectId(newProject.id);
    setIsModalOpen(false);
    setNewProjectName("");
    setIsEnterInvoice(true);
    setHomeClick((prev) => {
      const updated = [...prev];
      updated[newProject.id] = { elctronicHomeClick: true };
      return updated;
    });

    // Update recentFiles and store in localStorage
    setRecentFiles((prev) => {
      const updatedRecentFiles = [
        ...prev,
        { name: newProject.name, id: newProject.id, date: newProject.d },
      ];
      localStorage.setItem(
        "recentFileToSave",
        JSON.stringify(updatedRecentFiles)
      );
      return updatedRecentFiles; // Return the new state
    });

    setTimeout(() => {
      console.log("Updated recent files:", recentFiles); // Debugging
      navigate(`/project/${newProject.id}`);
    }, 100);
  };

  const handleGoToSelectedProject = (name: string, id: number) => {
    setProjects((prev) => [...prev, { name: name, id: id }]);
    setActiveProjectId(id);
    setIsEnterInvoice(true);
    navigate(`/project/${id}`);
  };

  return (
    <div className="flex flex-row h-screen w-full bg-transparent">
      {/* <div className="w-full fixed">
      <Navbar/>
      </div> */}
      {/* <div className="flex h-full w-full"> */}

      {/* Sidebar */}

      <div className="w-1/4 bg-transparent p-6 flex flex-col">
        <div className="flex item-center text-[24px] font-medium w-[314px] h-[44px] bg-[#0000000D] pl-2 mt-10 rounded-lg">
          Home
        </div>
        <div className="flex flex-col gap-3 w-full mt-14">
          <div className="relative w-fit h-fit rounded-[50px] bg-gradient-to-tr from-[#00C5FF] to-[#0054F0] p-[1px]">
            <button
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="flex justify-center items-center bg-black w-[181px] h-[49px] rounded-[50px] text-white text-[24px] border-[1px]"
            >
              Create New
            </button>
          </div>
          <div className="relative w-fit h-fit rounded-[50px] bg-gradient-to-tr from-[#00C5FF] to-[#0054F0] p-[1px]">
            <button
              onClick={() => setIsOpenModalOpen(!isOpenModalOpen)}
              className="flex justify-center items-center bg-black w-[110px] h-[49px] rounded-[50px] text-white text-[24px] border-[1px]"
            >
              Open
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-9 w-3/4 p-6 mt-20">
        <h1 className="flex justify-center items-center w-full text-3xl font-medium mb-3">
          Welcome to WiseCharge
        </h1>

        {/* Recent Section */}
        <div className="flex flex-col gap-4">
          <div className="flex text-[24px] font-medium">Recent</div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-8">
              <span className="text-[#00000080] dark:text-[#FFFFFF80] text-[18px]">
                Sort
              </span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border-b-[1px] text-[#000000] dark:text-[#ffffff] bg-transparent text-[18px] w-[122px] border-[#00000066] dark:border-[#FFFFFF66] px-2 py-1"
              >
                <option value="Recent" className="bg-transparent">
                  Recent
                </option>
                <option value="Oldest" className="bg-transparent">
                  Oldest
                </option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#000000] dark:text-[#ffffff] text-[18px]">
                Filter
              </span>
              <input
                type="text"
                placeholder="Filter Recent Files"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="border-b-[1px] bg-transparent text-[#000000] text-[18px] w-[213px] border-[#00000040] dark:border-[#FFFFFF66] px-2 py-1"
              />
            </div>
          </div>
        </div>

        {/* File Cards */}
        <div className="grid grid-cols-3 gap-8 p-3 pl-6 overflow-y-auto ">
          <div
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="relative w-fit h-fit rounded-lg bg-gradient-to-tr from-[rgb(0,197,255)] to-[#0054F0] p-[1px] cursor-pointer"
          >
            <div className=" bg-white dark:bg-[#000000] rounded-lg w-[257px] h-[191px] flex justify-center text-center dark:text-[#ffffff] items-center text-[150px] font-bold">
              +
            </div>
          </div>

          {filteredFiles.map((file, index) => (
            <div
              key={index}
              className="flex flex-col w-[257px] h-[244px] gap-2 cursor-pointer"
              onClick={() => handleGoToSelectedProject(file.name, file.id)}
            >
              <div className="relative w-fit h-fit rounded-lg bg-gradient-to-tr from-[#00C5FF] to-[#0054F0] p-[1px]">
                <div className="bg-gray-200 dark:bg-[#000000] rounded-lg  w-[257px] h-[191px] flex justify-center items-center text-md font-bold">
                  <div className="bg-[#FFFFFF] rounded-lg h-[171px] w-[125px] m-auto" />
                </div>
              </div>
              <div className="pt-2 pl-1">
                <div className="font-[400] text-[14px] dark:text-[#ffffff] text-[#000000]">
                  {file.name}
                </div>
                <div className="text-[12px] dark:text-[#FFFFFFB2] font-[400] text-[#00000060]">
                  {new Date(file.date).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* </div> */}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl text-[#000000] font-bold mb-4">
              Create New Project
            </h2>
            <input
              type="text"
              placeholder="Enter project name"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProject}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {isOpenModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white relative p-6 rounded-lg shadow-md w-96">
            <span onClick={() => setIsOpenModalOpen(false)} className="absolute hover:bg-red-400 right-2 top-2 text-[20px] cursor-pointer p-1 rounded-sm"><IoClose/></span>
            <h2 className="text-xl text-[#000000] font-bold mb-4 border-b-2">
              Open Existing Project
            </h2>
            <ol
              type="1"
              className="list-decimal list-inside flex flex-col gap-4"
            >
              {recentFiles.map((rfiles, index) => (
                <li
                onClick={() => handleGoToSelectedProject(rfiles.name, rfiles.id)}
                  key={index}
                  className="flex justify-between items-center p-2 border-b-2 cursor-pointer"
                >
                  <span className="font-[400] text-[14px] text-[#000000]">
                    {index+1 + "."}{" "}{rfiles.name}
                  </span>
                  <span className="font-[400] text-[12px] text-[#00000080]">
                    {new Date(rfiles.date).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
