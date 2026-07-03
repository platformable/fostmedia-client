import React from "react"

interface CircleLoaderProps {
  size?: number
  color?: string
  thickness?: number
  className?: string
}

const Loader: React.FC<CircleLoaderProps> = ({
  size = 40,
  color = "#A18EFF",
  thickness = 4,
  className = "",
}) => {
  return (
    <div
      className={`inline-block animate-spin ${className}`}
      style={{
        width: size,
        height: size,
        border: `${thickness}px solid #0B0F1C`,
        borderTopColor: color,
        borderRadius: "50%",
      }}
    />
  )
}

export default Loader
