import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { useGetProfileQuery } from "@/store/api-slices/user-api-slice"
import { useMemo } from "react"

export function ProfileHeader({ avatar, name, email }) {
  return (
    <div className="flex items-center gap-x-5 px-4">
      <Avatar>
        <AvatarImage src={avatar} />
      </Avatar>
      <div>
        <h1>{name}</h1>
        <h1 className="text-xs">{email}</h1>
      </div>
    </div>
  )
}

export function ProfileHeaderSkeleton() {
  return (
    <div className="flex items-center gap-x-5 px-4">
      <Avatar>
        <AvatarFallback>US</AvatarFallback>
      </Avatar>
      <div>
        <h1>Sedang Memuat Nama</h1>
        <h1 className="text-xs">Sedang Memuat Email</h1>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  const {
    data: profile,
    isLoading: isLoadingGetProfile,
    isSuccess: isSuccesGetProfile,
  } = useGetProfileQuery()
  const {
    data: allThread,
    isLoading: isLoadingGetAllThread,
    isSuccess: isSuccesGetAllThread,
  } = useGetAllThreadQuery(undefined, {
    refetchOnFocus: true,
  })

  const filteredUserThreads = useMemo(() => {
    if (isSuccesGetProfile && isSuccesGetAllThread && allThread.length > 0) {
      const userId = profile?.id

      return allThread.filter((thread) => thread.ownerId === userId)
    }

    return null
  }, [isSuccesGetProfile, allThread, isSuccesGetAllThread, profile?.id])

  console.log({
    profile,
    allThread,
    filteredUserThreads,
  })

  return (
    <ProtectedLayout className=" px-0">
      <div className="border-b pb-5">
        {isSuccesGetProfile ? (
          <ProfileHeader
            avatar={profile.avatar}
            name={profile.name}
            email={profile.email}
          />
        ) : (
          <ProfileHeaderSkeleton />
        )}
      </div>
      <div className="px-4 pt-2 space-y-3">
        <h1>Your Thread</h1>
        <div className="flex flex-col gap-5 pr-3">
          {(isLoadingGetAllThread || isLoadingGetProfile) &&
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
          {(isSuccesGetAllThread || isSuccesGetProfile) &&
          filteredUserThreads?.length > 0 ? (
            filteredUserThreads.map((thread, idx) => {
              return (
                <Card key={idx + 1}>
                  <CardHeader>
                    <CardTitle>{thread?.title}</CardTitle>
                    <CardDescription>{thread.createdAt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{thread?.body}</p>
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
