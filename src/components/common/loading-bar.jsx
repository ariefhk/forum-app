import LoadingBar from "react-redux-loading-bar"

export default function TopLoadingBar() {
  return (
    <div className="sticky top-0  w-full">
      <LoadingBar
        style={{ backgroundColor: "red", height: "5px", width: "100%" }}
      />
    </div>
  )
}
