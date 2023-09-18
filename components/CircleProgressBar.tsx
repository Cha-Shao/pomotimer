import { SVGAttributes } from "react"

const CircleProgressBar = (props: {
  label?: string
  percentage: number
  radius?: number
  width?: number
  weight?: number
} & SVGAttributes<SVGSVGElement>) => {
  const {
    label,
    percentage,
    radius = 85,
    width = 200,
    weight = 15,
    ...attrs
  } = props

  const strokeDasharray = radius * Math.PI * 2
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100

  return (
    <svg
      {...attrs}
      width={width}
      height={width}
      viewBox={`0 0 ${width} ${width}`}
    >
      {/* 背景 */}
      <circle
        cx={width / 2}
        cy={width / 2}
        strokeWidth={`${weight - 4}px`}
        r={radius}
        className="fill-none stroke-border/10"
        style={{
          strokeDasharray: `${weight / 4} ${weight / 2}`,
          strokeDashoffset: strokeDasharray - strokeDasharray,
        }}
        transform={`rotate(-90 ${width / 2} ${width / 2})`}
      />
      {/* 进度条 */}
      <circle
        cx={width / 2}
        cy={width / 2}
        strokeWidth={`${weight}px`}
        r={radius}
        className="fill-none stroke-primary "
        style={{
          strokeDasharray,
          strokeDashoffset,
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }}
        transform={`rotate(-90 ${width / 2} ${width / 2})`}
      />
      {label && (
        <text x="50%" y="50%" dy="0.3em" textAnchor="middle" className="">
          {label}
        </text>
      )}
    </svg>
  )
}

export default CircleProgressBar
