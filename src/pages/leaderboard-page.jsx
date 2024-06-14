import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import ProtectedLayout from "@/layouts/protected-layout"
import { useGetLeaderBoardQuery } from "@/store/api-slices/leaderboard-api-slice"

export default function LeaderBoardPage() {
  const {
    data: leaderboards,
    isLoading: isLoadingGetLeaderboard,
    isSuccess: isSuccessGetLeaderboard,
  } = useGetLeaderBoardQuery()

  return (
    <ProtectedLayout>
      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <h1>Leaderboard</h1>
          <p className="pr-4">Skor</p>
        </div>
        <div className="flex flex-col gap-5 pr-3">
          {isLoadingGetLeaderboard &&
            Array.from({ length: 3 }).map((_, idx) => {
              return (
                <Card
                  key={idx + 1}
                  className="pt-3 pr-3 pb-3 pl-2 flex items-center justify-between">
                  <div className="flex items-center gap-x-4">
                    <div className="flex items-center gap-x-2">
                      <span>{idx + 1}.</span>
                      <Avatar>
                        <AvatarFallback>US</AvatarFallback>
                      </Avatar>
                    </div>
                    <h1 className="text-[14px]">Sedang Memuat...</h1>
                  </div>
                  <p>0</p>
                </Card>
              )
            })}

          {isSuccessGetLeaderboard && leaderboards?.length > 0
            ? leaderboards.map((leaderboard, idx) => {
                return (
                  <Card
                    key={idx + 1}
                    className="pt-3 pr-3 pb-3 pl-2 flex items-center justify-between">
                    <div className="flex items-center gap-x-4">
                      <div className="flex items-center gap-x-2">
                        <span>{idx + 1}.</span>
                        <Avatar>
                          <AvatarImage src={leaderboard.user.avatar} />
                        </Avatar>
                      </div>
                      <h1 className="text-[14px]">{leaderboard.user.name}</h1>
                    </div>
                    <p>{leaderboard.score}</p>
                  </Card>
                )
              })
            : !isLoadingGetLeaderboard && <h1>Not Found!</h1>}
        </div>
      </div>
    </ProtectedLayout>
  )
}
