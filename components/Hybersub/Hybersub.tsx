import useSubscribe from '@/hooks/useSubscribe'

const Hybersub = ({ onClose }: { onClose: () => void }) => {
  const { title, setTitle, description, setDescription, subscribe, loading } = useSubscribe()
  const inputClasses = '!outline-none border-[1px] border-black rounded-md px-2 py-1'
  const labelClasses = 'text-md text-black'

  const handleClick = async () => {
    await subscribe()
    onClose()
  }

  return (
    <div
      className="absolute left-0 top-0 w-full h-full z-[15]
        flex items-center justify-center"
      onClick={(e: any) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="max-w-[584px] p-3 bg-white rounded-md flex-col flex gap-2" id="youtube">
        <p className="text-xl font-bold text-center">Subscription</p>
        <fieldset className="flex gap-2">
          <label className={labelClasses}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClasses}
          />
        </fieldset>
        <fieldset className="flex gap-2">
          <label className={labelClasses}>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputClasses}
          />
        </fieldset>
        <button
          type="button"
          className="border-[1px] border-black rounded-md font-bold py-1"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? 'Subsribing...' : 'Subscribe'}
        </button>
      </div>
    </div>
  )
}

export default Hybersub
