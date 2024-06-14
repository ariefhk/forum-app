import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import useInput from "@/hooks/useInput"
import { useCreateThreadMutation } from "@/store/api-slices/thread-api-slice"
import { XCircle } from "lucide-react"
import { useState } from "react"
import { HiMiniPencilSquare } from "react-icons/hi2"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { useToast } from "../ui/use-toast"

const initialValue = {
  title: "",
  category: "",
  body: "",
}

export default function CreateThreadButton() {
  const [createThread, { isLoading: isLoadingCreateThread }] =
    useCreateThreadMutation()
  const { values, handleChange, reset } = useInput(initialValue)
  const { toast } = useToast()
  const [isOpenCreateThread, setIsOpenCreateThread] = useState(false)

  const onCreateThread = async (e) => {
    e.preventDefault()
    try {
      await createThread({
        title: values?.title,
        category: values?.category,
        body: values?.body,
      }).unwrap()
      toast({
        title: "Berhasil Buat Thread!",
        description: `Selamat, Anda berhasil buat thread`,
      })
      reset()
      setIsOpenCreateThread(false)
    } catch (error) {
      console.log("GAGAL BUAT THREAD: ", error)
      toast({
        variant: "destructive",
        title: "Gagal Buat Thread!",
        description: `Tolong periksa inputan Anda!`,
      })
    }
  }

  return (
    <AlertDialog open={isOpenCreateThread} onOpenChange={setIsOpenCreateThread}>
      <AlertDialogTrigger asChild>
        <Button className=" absolute bottom-32 border w-14 flex rounded-full justify-center items-center h-14  z-20 right-3 ">
          <HiMiniPencilSquare className="flex-shrink-0 w-6 h-6" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="h-screen lg:h-max">
        <div className="space-y-10">
          <AlertDialogHeader className="text-start">
            <div className="flex items-center justify-between">
              <div>
                <AlertDialogTitle className="text-2xl">
                  Buat Thread
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Expresikan dirimu dalam thread!
                </AlertDialogDescription>
              </div>
              <AlertDialogCancel className="p-0 m-0 w-10 h-10 rounded-full">
                <XCircle className="w-10 h-10" />
              </AlertDialogCancel>
            </div>
          </AlertDialogHeader>

          <div>
            <form onSubmit={onCreateThread} className="space-y-8">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label>Judul</Label>
                  <Input
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Kategori</Label>
                  <Input
                    type="text"
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Isi</Label>
                  <Textarea
                    type="text"
                    name="body"
                    value={values.body}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <Button
                disabled={isLoadingCreateThread}
                type="submit"
                className="w-full">
                Buat Thread
              </Button>
            </form>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
