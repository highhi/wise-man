import React, { ButtonHTMLAttributes } from 'react'

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return <button {...props}>{props.children}</button>
}

export default Button
