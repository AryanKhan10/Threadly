import React from 'react'

function Button({
    type,
    children,
    className="",
    ...props
}) {
  return (
    <div>
      <button className={`px-4 py-2 bg- text-white rounded-xl
        ${className} ` }{...props}>
        {children}
      </button>
    </div>
  )
}

export default Button
