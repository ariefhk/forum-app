import { cn } from "@/lib/tailwind-utils"
import PropTypes from "prop-types"
import {
  HiAtSymbol,
  HiMagnifyingGlass,
  HiMagnifyingGlassCircle,
  HiMiniChartBar,
  HiMiniChatBubbleLeftRight,
  HiOutlineAtSymbol,
  HiOutlineChartBar,
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserCircle,
  HiUserCircle,
} from "react-icons/hi2"
import { Link, useLocation } from "react-router-dom"

const bottomNavLinks = [
  {
    id: 1,
    name: "For You",
    href: "/",
    icon: {
      active: HiMiniChatBubbleLeftRight,
      notActive: HiOutlineChatBubbleLeftRight,
    },
  },
  {
    id: 2,
    name: "Explore",
    href: "/explore",
    icon: {
      active: HiMagnifyingGlassCircle,
      notActive: HiMagnifyingGlass,
    },
  },
  {
    id: 3,
    name: "Leaderboard",
    href: "/leaderboard",
    icon: {
      active: HiMiniChartBar,
      notActive: HiOutlineChartBar,
    },
  },
  {
    id: 4,
    name: "Profile",
    href: "/profile",
    icon: {
      active: HiUserCircle,
      notActive: HiOutlineUserCircle,
    },
  },
]

export default function BottomNavbar({ className }) {
  const location = useLocation()
  return (
    <div
      className={cn(
        "fixed bottom-0 bg-background flex justify-between items-center px-4 h-[64px] border-t max-w-[500px] mx-auto w-full",
        className,
      )}>
      {bottomNavLinks.map((nav, idx) => {
        const IconActive = nav.icon.active
        const IconNotActive = nav.icon.notActive
        const isActive = location.pathname === nav.href

        return (
          <Link
            key={idx + 1}
            to={nav.href}
            className="flex flex-col justify-center items-center">
            {isActive ? (
              <IconActive className="h-6 w-6" />
            ) : (
              <IconNotActive className="h-6 w-6" />
            )}
            <span className="text-xs">{nav.name}</span>{" "}
          </Link>
        )
      })}
    </div>
  )
}

BottomNavbar.propTypes = {
  className: PropTypes.string,
}
