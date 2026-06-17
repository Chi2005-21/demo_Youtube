import { Home, PlaySquare, Clock, Library, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  collapsed?: boolean;
  onCollapse?: () => void;
}

const menuItems = [
  { icon: Home, label: 'Trang chủ', active: true },
  { icon: PlaySquare, label: 'Shorts' },
  { icon: GraduationCap, label: 'Học tập' },
  { icon: Clock, label: 'Lịch sử' },
  { icon: Library, label: 'Thư viện' },
];

export default function Sidebar({ collapsed, onCollapse }: SidebarProps) {
  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 240 }}
      className="fixed left-0 top-14 h-[calc(100vh-56px)] bg-white border-r border-gray-200 z-40"
    >
      <div className="flex flex-col h-full py-2">
        <div className="flex justify-end px-2 mb-2">
          <motion.button
            onClick={onCollapse}
            className="p-1.5 hover:bg-gray-100 rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </motion.button>
        </div>

        <nav className="flex-1 px-2">
          <AnimatePresence mode="wait">
            {menuItems.map((item) => (
              <motion.button
                key={item.label}
                onClick={() => {}}
                className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-lg mb-0.5 ${
                  item.active ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'
                }`}
                whileHover={{ backgroundColor: '#f3f4f6' }}
              >
                <item.icon size={24} className={item.active ? 'text-gray-900' : 'text-gray-700'} />
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`text-sm ${item.active ? 'text-gray-900' : 'text-gray-700'}`}
                  >
                    {item.label}
                  </motion.span>
                )}
              </motion.button>
            ))}
          </AnimatePresence>
        </nav>

        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-4 py-4 border-t border-gray-200"
          >
            <p className="text-xs text-gray-500">
              YouTube Learn Demo
              <br />
              Phiên bản trình bày
            </p>
          </motion.div>
        )}
      </div>
    </motion.aside>
  );
}
