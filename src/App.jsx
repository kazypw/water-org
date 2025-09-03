import { motion } from "framer-motion"
import MapContainer from "./components/map/MapContainer"
import Header from "./components/ui/Header"
import IconMenu from "./components/ui/IconMenu"
import ListItem from "./components/ui/sidebar/ListItem"
import AttributeSidebar from "./components/map/AttributeSidebar"
import StatsItem from "./components/ui/sidebar/StatsItem"
import FilterItem from "./components/ui/sidebar/FilterItem"


function App() {

  return (
    <>
      <div className="flex flex-col h-screen">
        <Header />
        <motion.div>
          <ListItem />
          <StatsItem />
          <FilterItem />
          <AttributeSidebar />
        </motion.div>
        <IconMenu />
        <MapContainer />
      </div>
    </>
  )
}

export default App
