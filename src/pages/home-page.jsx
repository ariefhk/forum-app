import ProtectedLayout from "@/layouts/protected-layout"
import { useGetAllThreadQuery } from "@/store/api-slices/thread-api-slice"
import {
  getThreadCategory,
  getThreadCountByCategory,
} from "@/store/slices/thread-slice"
import { useSelector } from "react-redux"

export default function HomePage() {
  const {
    data: threads,
    isLoading: isLoadinggetThreads,
    isSuccess: isSuccessGetThreads,
  } = useGetAllThreadQuery()

  const threadCategory = useSelector(getThreadCategory)
  const threadCountByCategory = useSelector(getThreadCountByCategory)

  if (isSuccessGetThreads) {
    console.log({
      threads,
      threadCategory,
      threadCountByCategory,
    })
  }

  return (
    <ProtectedLayout>
      <div>HomePage</div>
    </ProtectedLayout>
  )
}
