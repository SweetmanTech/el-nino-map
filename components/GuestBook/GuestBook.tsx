const GuestBook = ({ onClose }: { onClose: () => void }) => {
  return (
    <div
      className="absolute left-0 top-0 w-full h-full z-[15]
        flex items-center justify-center"
      onClick={(e: any) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="max-w-[584px] min-w-[400px] p-3 bg-white rounded-md flex-col flex gap-2"
        id="guestbook"
      ></div>
    </div>
  )
}

export default GuestBook
