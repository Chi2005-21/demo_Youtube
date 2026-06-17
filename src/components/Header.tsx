import { Search, Mic, Bell, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  showSidebarToggle?: boolean;
  onToggleSidebar?: () => void;
}

export default function Header({ showSidebarToggle, onToggleSidebar }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white flex items-center justify-between px-4 z-50 border-b border-gray-200">
      <div className="flex items-center gap-2">
        {showSidebarToggle && (
          <motion.button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu size={24} />
          </motion.button>
        )}
        <a href="/" className="flex items-center gap-0.5">
          <div className="bg-red-600 text-white rounded-lg px-1 py-0.5">
            <span className="font-bold text-xl">Tube</span>
          </div>
          <span className="text-xl font-semibold text-gray-800">Learn</span>
        </a>
      </div>

      <div className="flex-1 max-w-2xl mx-4">
        <div className="flex items-center">
          <div className="flex-1 flex items-center border border-gray-300 rounded-l-full px-4 py-2">
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="w-full outline-none text-base"
            />
          </div>
          <button className="bg-gray-100 border border-l-0 border-gray-300 px-6 py-2 rounded-r-full hover:bg-gray-200">
            <Search size={20} className="text-gray-600" />
          </button>
          <motion.button
            className="ml-3 p-2.5 bg-gray-100 rounded-full hover:bg-gray-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mic size={20} />
          </motion.button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <motion.button
          className="p-2 hover:bg-gray-100 rounded-full relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell size={24} />
          <div className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full" />
        </motion.button>
        <motion.div
          className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          <img
            src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100"
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </header>
  );
}
