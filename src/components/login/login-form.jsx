import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useInput from "@/hooks/useInput"
import { useLoginMutation } from "@/store/api-slices/auth-api-slice"
import { setToken } from "@/store/slices/auth-slice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useToast } from "../ui/use-toast"

const initialState = {
  email: "",
  password: "",
}

export default function LoginForm() {
  const { values, handleChange } = useInput(initialState)
  const [login] = useLoginMutation()
  const { toast } = useToast()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLoginSubmit = async (e) => {
    e.preventDefault()
    try {
      const userToken = await login({
        email: values?.email,
        password: values?.password,
      }).unwrap()
      dispatch(setToken(userToken))
      toast({
        title: "Berhasil Login!",
        description: `Selamat, Anda berhasil login`,
      })
      navigate("/")
    } catch (error) {
      console.log("ERROR LOGIN: ", error)
      toast({
        variant: "destructive",
        title: "Gagal Login!",
        description: `Tolong periksa akun Anda`,
      })
    }
  }

  return (
    <form className="grid gap-4" onSubmit={onLoginSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          values={values?.email}
          onChange={(e) => handleChange(e)}
          placeholder="m@example.com"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          name="password"
          required
          values={values?.password}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
    </form>
  )
}
