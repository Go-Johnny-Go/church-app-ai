import { BiSearch, BiNotification, BiFilterAlt } from "react-icons/bi";
import { HiMenu } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export default function Topbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center flex-1">
          <HiMenu className="h-6 w-6 text-gray-600 mr-4" />
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <BiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <BiNotification className="h-5 w-5 text-gray-600" />
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>

          <button className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
            <BiFilterAlt className="h-4 w-4 mr-2" />
            Filter
          </button>

          <div className="flex items-center space-x-3 border-l pl-4">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <FaUser className="h-5 w-5 text-purple-700" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-700">John Doe</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <MdOutlineKeyboardArrowDown className="h-4 w-4 text-gray-500" />
          </div>
        </div>
      </div>
    </header>
  );
}