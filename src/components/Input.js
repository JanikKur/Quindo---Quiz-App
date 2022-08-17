import React from 'react'

export default function Input({label, reference, type, placeholder, required, className}) {
    return (
        <div className={`form-group ${className ? className : ''}`}>
            <label>{label}</label>
            <input type={type} ref={reference} placeholder={placeholder} required={required} />
        </div>
    )
}
