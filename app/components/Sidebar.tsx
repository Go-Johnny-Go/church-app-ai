import { useState } from "react";
import { FaUser, FaUsers, FaChurch, FaPlus, FaList } from "react-icons/fa";
import { IoSettings, IoCalendar } from "react-icons/io5";
import { BsFolderPlus, BsCheckSquare, BsBarChartFill } from "react-icons/bs";
import { MdChevronLeft, MdChevronRight, MdExpandMore, MdExpandLess } from "react-icons/md";

interface SidebarProps {
  setActiveSection: (section: string) => void;
}

export default function Sidebar({ setActiveSection }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isChurchMenuOpen, setIsChurchMenuOpen] = useState(false);

  const menuItems = [
    { icon: FaUser, label: "Perfil", path: "#", section: "" },
    { icon: FaUsers, label: "Usuarios", path: "#", section: "users" },
    { icon: IoSettings, label: "Panel de control", path: "#", section: "" },
    { icon: BsFolderPlus, label: "Proyectos", path: "#", section: "projects" },
    { icon: BsCheckSquare, label: "Tareas", path: "#", section: "" },
    {
      icon: FaChurch,
      label: "Iglesias",
      path: "#",
      section: "churches",
      subMenu: [
        { icon: FaPlus, label: "Añadir Iglesias", section: "add-church" },
        { icon: FaList, label: "Ver Iglesias", section: "churches" }
      ]
    },
    { icon: IoCalendar, label: "Events", path: "#", section: "events" },
    { icon: BsBarChartFill, label: "Reports", path: "#", section: "" }
  ];

  return (
    <div className={`${isExpanded ? "w-64" : "w-20"} bg-purple-700 text-white transition-all duration-300 ease-in-out relative`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-8 bg-purple-700 text-white p-1 rounded-full shadow-lg hover:bg-purple-800 transition-colors"
      >
        {isExpanded ? <MdChevronLeft className="h-4 w-4" /> : <MdChevronRight className="h-4 w-4" />}
      </button>
      
      <div className="flex items-center p-4 mb-6">
        <FaChurch className="h-8 w-8 text-white" />
        {isExpanded && <span className="ml-3 text-xl font-bold">Church App</span>}
      </div>

      <nav className="px-4">
        {menuItems.map((item, index) => (
          <div key={index}>
            {item.subMenu ? (
              // Menú con submenú (Churches)
              <div className="mb-2">
                <button
                  onClick={() => setIsChurchMenuOpen(!isChurchMenuOpen)}
                  className={`w-full flex items-center py-3 px-4 rounded-lg hover:bg-purple-600 transition-colors ${
                    isExpanded ? "justify-between" : "justify-center"
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon className={`h-5 w-5 ${!isExpanded && "mx-auto"}`} />
                    {isExpanded && <span className="ml-3 text-sm font-medium">{item.label}</span>}
                  </div>
                  {isExpanded && (
                    isChurchMenuOpen ? <MdExpandLess className="h-5 w-5" /> : <MdExpandMore className="h-5 w-5" />
                  )}
                </button>

                {isExpanded && isChurchMenuOpen && (
                  <div className="ml-4 space-y-2 mt-2">
                    {item.subMenu.map((subItem, subIndex) => (
                      <button
                        key={subIndex}
                        onClick={() => setActiveSection(subItem.section)}
                        className="w-full flex items-center py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors text-left"
                      >
                        <subItem.icon className="h-4 w-4" />
                        <span className="ml-3 text-sm">{subItem.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // Menú sin submenú
              <a
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection(item.section);
                }}
                className={`flex items-center py-3 px-4 rounded-lg mb-2 hover:bg-purple-600 transition-colors ${
                  isExpanded ? "justify-start" : "justify-center"
                }`}
              >
                <item.icon className={`h-5 w-5 ${!isExpanded && "mx-auto"}`} />
                {isExpanded && <span className="ml-3 text-sm font-medium">{item.label}</span>}
              </a>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}