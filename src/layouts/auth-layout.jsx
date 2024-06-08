import TopLoadingBar from "@/components/common/loading-bar"
import { cn } from "@/lib/tailwind-utils"
import PropTypes from "prop-types"

export default function AuthLayout({ children, className }) {
  return (
    <>
      <TopLoadingBar />
      <main
        className={cn(
          className,
          "w-full lg:grid px-5 lg:px-0 lg:min-h-[600px] h-screen overflow-hidden lg:grid-cols-2 ",
        )}>
        {children}
      </main>
    </>
  )
}

AuthLayout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}
