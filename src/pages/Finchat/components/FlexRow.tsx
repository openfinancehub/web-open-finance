import React from "react"

const FlexRow = ({ children }) => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
      }}
    >
      {children}
    </div>
  )

export default FlexRow;