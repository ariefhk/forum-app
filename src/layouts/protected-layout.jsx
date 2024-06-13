import TopLoadingBar from "@/components/common/loading-bar"
import { cn } from "@/lib/tailwind-utils"
import PropTypes from "prop-types"

export default function ProtectedLayout({ className, children }) {
  return (
    <>
      <TopLoadingBar />
      <main className={cn("px-5 lg:px-0", className)}>{children}</main>
    </>
  )
}

ProtectedLayout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}
