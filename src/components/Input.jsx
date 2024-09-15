import React, {forwardRef, useId} from 'react'

function Input({
    label,
    children,
    type="text",
    className="",
    ...props
},ref) {
    const id = useId()

  return (
    <div>
       { label && <label htmlFor={id}
                    className='text-base font-medium text-gray-900'>{label}</label>}

        <div className="mt-2">
        <input 
            type={type} 
            className={`${className}`} 
            {...props}
            id={id}
            ref={ref}
        />
        </div>
    </div>
  )
}

export default forwardRef(Input)
