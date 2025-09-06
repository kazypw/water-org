import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { memo, useEffect, useState } from 'react';
import { useMapStore } from '../../store/useMapStore'; 

const SearchBar = memo(() => {
  const [searchQuery, setSearchQuery] = useState('');
  const { setSearchOrg } = useMapStore.getState()

  
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setSearchOrg(searchQuery.trim());
        }, 300);

        return () => clearTimeout(debounceTimer);
        }, [searchQuery, setSearchOrg]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchOrg('');
  };
  return (
    <>
          <motion.div 
            className="flex-1 max-w-sm mx-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search organizations"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full h-10 pl-9 pr-10 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                  style={{ 
                    backgroundColor: 'var(--secondary-color)',
                    fontSize: 'var(--main-size)',
                  }}
                />
                
                {/* Search Icon */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Search className="w-4 h-4" style={{ color: 'var(--accent-color)' }} />
                </div>
                
                {/* Clear Button */}
                {searchQuery && (
                  <motion.button
                    onClick={clearSearch}
                    className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-3 h-3" style={{ color: 'var(--accent-color)' }} />
                  </motion.button>
                )}
                
                {/* Search indicator */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-blue-400"
                    animate={{ 
                      scale: searchQuery ? [1, 1.2, 1] : 1,
                      opacity: searchQuery ? [1, 0.6, 1] : 0.3
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: searchQuery ? Infinity : 0,
                      ease: "easeInOut" 
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
    </> 
  );
});

export default SearchBar;