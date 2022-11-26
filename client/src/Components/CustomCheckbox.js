import React from 'react'
import { useField } from 'formik';


const CustomCheckbox = ({label, ...props }) => {

    const [field, meta, helpers] = useField(props);
   
  return (
    <>
    <div className= "checkbox">
        <label>{label}</label>
        <input {...field} {...meta} {...props}
        className={meta.touched && meta.error ? "input-error" : ""}/>
        <span>Check if the product is active</span>

        {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
    </>
  )
}

export default CustomCheckbox