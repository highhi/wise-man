import React, { InputHTMLAttributes, useCallback } from 'react'

const Input: React.FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange != null) props.onChange(event)
  }, [])

  return <input {...props} onChange={onChange} />
}

export default Input
