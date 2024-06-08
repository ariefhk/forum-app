// import TopLoadingBar from "@/components/common/loading-bar"
import TopLoadingBar from "@/components/common/loading-bar"
import { cn } from "@/lib/tailwind-utils"
import PropTypes from "prop-types"

export default function ProtectedLayout({ className, children }) {
  return (
    <>
      <TopLoadingBar />
      <main className={cn(className)}>{children}</main>
    </>
  )
}

ProtectedLayout.propTypes = {
  className: PropTypes.className,
  children: PropTypes.node,
}
