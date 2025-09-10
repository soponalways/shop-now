import React from 'react'

export default function Button({ children, onClick, className, variant='filled' }) {
    let classes; 
    if (variant === 'outline') {
        classes = `cursor-pointer border border-primary bg-gradient-to-r hover:from-primary hover:to-secondary from-base-200 to-base-200 text-base-content font-semibold py-2 px-4 rounded transition duration-500`;
    } else {
        classes = `cursor-pointer bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-base-content font-semibold py-2 px-4 rounded transition duration-500`;
    }
    return (
        <div>
            <button className={`${classes} ${className}`} onClick={onClick && onClick}>
                {children}
            </button>
        </div>

    )
}
