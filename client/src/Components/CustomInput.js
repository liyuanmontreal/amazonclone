import React from 'react'
import { useField } from 'formik';


const CustomInput = ({label, ...props }) => {

    const [field, meta, helpers] = useField(props);
    console.log('field', field);
    console.log('meta', meta);
    console.log('helpers', helpers);
  return (
    <>
        <label>{label}</label>
        <input {...field} {...meta} {...helpers}{...props}
        className={meta.touched && meta.error ? "input-error" : ""}/>
        {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </>
  )
}

export default CustomInput




