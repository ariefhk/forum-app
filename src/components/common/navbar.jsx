import { cn } from "@/lib/tailwind-utils"
import PropTypes from "prop-types"
import { DarkModeToggle } from "./darkmode-toggle"
import LogoutButton from "./logout-button"

export default function Navbar({ className }) {
  return (
    <div
      className={cn(
        "fixed top-0 z-20 bg-background h-[64px] border-t px-4 max-w-[500px] flex items-center mx-auto w-full border-b justify-between",
        className,
      )}>
      <h1 className="text-xl font-semibold">Forum App</h1>
      <div className="flex items-center gap-x-3">
        <DarkModeToggle />
        <LogoutButton />
      </div>
    </div>
  )
}

Navbar.propTypes = {
  className: PropTypes.string,
}
