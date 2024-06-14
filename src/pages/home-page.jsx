import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
      <div>
        <div className=" flex flex-col gap-5 pr-2 pt-3">
          {isLoadinggetThreads &&
            Array.from({ length: 5 }).map((_, idx) => {
              return (
                <Card key={idx + 1}>
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Card Content</p>
                  </CardContent>
                  <CardFooter>
                    <p>Card Footer</p>
                  </CardFooter>
                </Card>
              )
            })}
          {isSuccessGetThreads && threads?.length > 0 ? (
            threads.map((thread, idx) => {
              return (
                <Card key={idx + 1}>
                  <CardHeader>
                    <CardTitle>{thread?.title}</CardTitle>
                    <CardDescription>{thread.createdAt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div dangerouslySetInnerHTML={{ __html: thread?.body }} />
                  </CardContent>
                  <CardFooter>
                    <p>Card Footer</p>
                  </CardFooter>
                </Card>
              )
            })
          ) : (
            <h1>Not Found!</h1>
          )}
        </div>
      </div>
    </ProtectedLayout>
  )
}
