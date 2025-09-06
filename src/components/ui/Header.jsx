import { useState } from 'react';
import { HelpCircle, X, Droplets } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from './SearchBar';

const Header = () => {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 w-full lg:h-[70px] h-[50px]"
        style={{
          backgroundColor: 'var(--bg-color)',
          borderBottom: '1px solid rgba(39, 70, 144, 0.1)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0, 118, 192, 0.1)'
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between h-full"
          style={{
            padding: '0 2rem',
          }}
        >
          {/* Logo Section */}
          <motion.div 
            className="flex items-center gap-[0.5rem]"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-center lg:w-12 lg:h-12 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 pz-8">
              <Droplets className="lg:w-6 lg:h-6 w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="lg:text-lg text-md font-semibold" style={{ color: 'var(--heading-color)' }}>
                KAZYPW
              </h1>
              <p className="lg:text-xs text-[10px] opacity-70" style={{ color: 'var(--accent-color)' }}>
                Water Organizations
              </p>
            </div>
          </motion.div>

          <div className='lg:block hidden'>
            <SearchBar />
          </div>

          {/* Info Button */}
          <motion.button
            onClick={toggleInfo}
            className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:bg-blue-50"
            style={{ color: 'var(--accent-color)' }}
            whileHover={{ scale: 1.1, rotate: 15, cursor: 'pointer' }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <HelpCircle className="w-6 h-6" />
          </motion.button>
        </div>
      </motion.header>

      {/* Info Modal */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            className="fixed inset-0 z-60 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={toggleInfo}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* Modal Content */}
            <motion.div
              className="relative bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
              style={{ backgroundColor: 'var(--bg-color)', padding: '2rem 3rem' }}
              initial={{ scale: 0.8, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Close Button */}
              <motion.button
                onClick={toggleInfo}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1, rotate: 90, cursor: 'pointer' }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5" style={{ color: 'var(--accent-color)' }} />
              </motion.button>

              {/* Modal Header */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold" style={{ color: 'var(--heading-color)' }}>
                    About KAZYPW
                  </h2>
                  <p className="text-sm opacity-70" style={{ color: 'var(--accent-color)' }}>
                    Water Organizations Portal
                  </p>
                </div>
              </div>

              {/* Modal Content */}
              <div className="space-y-4">
                <p style={{ color: 'var(--font-color)', fontSize: 'var(--main-size)' }}>
                  KAZYPW is a comprehensive platform dedicated to connecting water organizations 
                  across Kazakhstan. Our mission is to promote sustainable water management 
                  and facilitate collaboration between water-related institutions.
                </p>
                
                <div className="space-y-2">
                  <h3 className="font-semibold" style={{ color: 'var(--heading-color)' }}>
                    Key Features:
                  </h3>
                  <ul className="space-y-1 text-sm" style={{ color: 'var(--font-color)' }}>
                    <li>• Directory of water organizations in Kazakhstan</li>
                    <li>• Real-time search across multiple fields</li>
                    <li>• Interactive map visualization</li>
                    <li>• Resource sharing and collaboration tools</li>
                    <li>• Water quality monitoring data</li>
                    <li>• Educational resources and best practices</li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm" style={{ color: 'var(--accent-color)' }}>
                    Supporting sustainable water management across Kazakhstan since 2024
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;