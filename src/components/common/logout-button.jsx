import { clearToken } from "@/store/slices/auth-slice"
import { clearProfile } from "@/store/slices/user-slice"
import { LogOut } from "lucide-react"
import { useDispatch } from "react-redux"
import { Button } from "../ui/button"

export default function LogoutButton() {
  const dispath = useDispatch()

  const onLogout = () => {
    dispath(clearProfile())
    dispath(clearToken())
  }

  return (
    <Button
      className="px-3"
      onClick={(e) => {
        e.stopPropagation()
        onLogout()
      }}>
      <LogOut className="h-[1.2rem] w-[1.2rem]" />
    </Button>
  )
}
