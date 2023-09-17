import Card from "./Card"

const
  time = 42,
  prevTime = 186

const FocusTime = () => {
  return (
    <Card className="mb-4" title="今日已专注">
      <p className="mb-4">
        <span className="text-primary font-bold text-4xl">{Math.floor(time / 60)}</span>
        小时
        {" "}
        <span className="text-primary font-bold text-4xl">{time % 60}</span>
        分钟
      </p>
      <p className="text-sm mb-2">近一月专注情况</p>
      <div className="grid grid-cols-21 gap-1 place-items-stretch mb-2">
        {Array(84).fill(null).map((day, i) => (
          <div key={i} className="w-[13px] h-[13px] rounded-sm border border-primary bg-primary" />
        ))}
      </div>
      <div className="flex gap-1 justify-end">
        <p className="text-xs">不专注</p>
        <div className="w-[13px] h-[13px] rounded-sm border border-border bg-border/10" />
        {Array(4).fill(null).map((_, i) => (
          <div
            key={i}
            className="w-[13px] h-[13px] rounded-sm border border-primary bg-primary"
            style={{ opacity: 0.25 * (i + 1) }}
          />
        ))}
        <p className="text-xs">专注</p>
      </div>
    </Card>
  )
}

export default FocusTime
