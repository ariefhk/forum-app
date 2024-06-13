import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { HiMiniPencilSquare } from "react-icons/hi2"
import { Button } from "../ui/button"

export default function CreateThreadButton() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className=" absolute bottom-32 border w-12 flex rounded-full justify-center items-center h-12  z-20 right-5 ">
          <HiMiniPencilSquare className="flex-shrink-0 w-6 h-6" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="h-screen lg:h-max">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
