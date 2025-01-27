import { useState } from "react";
import { FaUser, FaUsers, FaChurch } from "react-icons/fa";
import { IoSettings, IoCalendar } from "react-icons/io5";
import { BsFolderPlus, BsCheckSquare, BsBarChartFill } from "react-icons/bs";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Topbar from "../components/Topbar";
import ChurchesTable from "../components/ChurchesTable";
import EventsTable from "../components/EventsTable ";
import ProjectsTable from "../components/ProjectsTable";
import UsersTable from "../components/UsersTable";

export default function Dashboard() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeSection, setActiveSection] = useState(""); // Estado único para manejar la vista activa

  const menuItems = [
    { icon: FaUser, label: "Profile", path: "#", section: "" },
    { icon: FaUsers, label: "Users", path: "#", section: "users" },
    { icon: IoSettings, label: "Control Panel", path: "#", section: "" },
    { icon: BsFolderPlus, label: "Projects", path: "#", section: "projects" },
    { icon: BsCheckSquare, label: "Tasks", path: "#", section: "" },
    { icon: FaChurch, label: "Churches", path: "#", section: "churches" },
    { icon: IoCalendar, label: "Events", path: "#", section: "events" },
    { icon: BsBarChartFill, label: "Reports", path: "#", section: "" }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${
          isExpanded ? "w-64" : "w-20"
        } bg-purple-700 text-white transition-all duration-300 ease-in-out relative`}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -right-3 top-8 bg-purple-700 text-white p-1 rounded-full shadow-lg hover:bg-purple-800 transition-colors"
        >
          {isExpanded ? (
            <MdChevronLeft className="h-4 w-4" />
          ) : (
            <MdChevronRight className="h-4 w-4" />
          )}
        </button>

        <div className="flex items-center p-4 mb-6">
          <FaChurch className="h-8 w-8 text-white" />
          {isExpanded && (
            <span className="ml-3 text-xl font-bold">Church App</span>
          )}
        </div>

        {/* Menú */}
        <nav className="px-4">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.path}
              onClick={(e) => {
                e.preventDefault();
                setActiveSection(item.section); // Cambia la vista activa
              }}
              className={`
                flex items-center py-3 px-4 rounded-lg mb-2
                hover:bg-purple-600 transition-colors
                ${isExpanded ? "justify-start" : "justify-center"}
                ${activeSection === item.section ? "bg-purple-800" : ""}
              `}
            >
              <item.icon className={`h-5 w-5 ${!isExpanded && "mx-auto"}`} />
              {isExpanded && (
                <span className="ml-3 text-sm font-medium">{item.label}</span>
              )}
            </a>
          ))}
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 overflow-hidden">
        <Topbar />
        <main className="p-6 overflow-auto h-[calc(100vh-4rem)]">
          {activeSection === "churches" && <ChurchesTable />}
          {activeSection === "events" && <EventsTable />}
          {activeSection === "projects" && <ProjectsTable />}
          {activeSection === "users" && <UsersTable />}
        </main>
      </div>
    </div>
  );
}
