import BottomNavbar from "@/components/common/bottom-navbar"
import CreateThreadButton from "@/components/common/create-thread-button"
import TopLoadingBar from "@/components/common/loading-bar"
import Navbar from "@/components/common/navbar"
import { cn } from "@/lib/tailwind-utils"
import PropTypes from "prop-types"
import { useLocation } from "react-router-dom"

export default function ProtectedLayout({ className, children }) {
  const location = useLocation()
  return (
    <main className="max-w-[500px] mx-auto ">
      <TopLoadingBar />
      <Navbar />
      <section
        className={cn(
          "pt-[80px] pb-[80px] flex flex-col relative px-4 h-screen overflow-hidden  ",
          className,
        )}>
        <div className="flex-grow overflow-auto">{children}</div>
        {location.pathname === "/" && <CreateThreadButton />}
      </section>
      <BottomNavbar />
    </main>
  )
}

ProtectedLayout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}
