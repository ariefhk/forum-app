import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useInput from "@/hooks/useInput"
import { useRegisterMutation } from "@/store/api-slices/auth-api-slice"
import { useNavigate } from "react-router-dom"
import { useToast } from "../ui/use-toast"

const initialState = {
  name: "",
  email: "",
  password: "",
}

export default function RegisterForm() {
  const { values, handleChange } = useInput(initialState)
  const [register] = useRegisterMutation()
  const navigate = useNavigate()
  const { toast } = useToast()

  const onRegisterSubmit = async (e) => {
    e.preventDefault()
    try {
      const userRegisResp = await register({
        name: values?.name,
        email: values?.email,
        password: values?.password,
      }).unwrap()

      console.log("ANDA BERHASIL REGISTER: ", userRegisResp)
      toast({
        title: "Berhasil Register!",
        description: `Selamat, Anda berhasil Register`,
      })
      navigate("/login")
    } catch (error) {
      console.log("ERROR REGISTER: ", error)
      toast({
        variant: "destructive",
        title: "Gagal Register!",
        description: `Tolong periksa akun Anda`,
      })
    }
  }

  return (
    <form className="grid gap-4" onSubmit={onRegisterSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Your Name"
          required
          values={values?.name}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="m@example.com"
          required
          values={values?.email}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          values={values?.password}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <Button type="submit" className="w-full">
        Register
      </Button>
    </form>
  )
}
