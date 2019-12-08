import React from 'react'

export const When: React.FC<{ condition: boolean }> = ({ condition, children }) => {
  if (condition) return <>{children}</>
  return null
}
