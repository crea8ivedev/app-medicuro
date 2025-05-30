import React, { useState } from 'react'
import hidePassword from '../assets/images/hide-password.png'
import viewPassword from '../assets/images/show-password.png'
import mcpCameraICon from '../assets/images/camera-black.png'
import { cn } from '../utils/cn'
import { ErrorMessage } from 'formik'



function CustomInput({
  field,
  form: { touched, errors, setFieldValue, setFieldTouched },
  type = 'text',
  label = '',
  placeholder = '',
  password,
  inputclasses,
  labelclasses,
  cols= 0,
  rows= 0,
  name,
  isDisabled,
  isMcp,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const isInvalid =
    (touched[field.name] && errors[field.name]) ||
    (submitted && errors[field.name])

  const handleChange = (e) => {
    const { name, value } = e.target
    let processedValue = value

    if (uppercase) {
      processedValue = value.toUpperCase()
    }

    if (name === 'phone') {
      processedValue = processedValue.replace(/\D/g, '')

      let formattedPhoneNumber = ''

      if (processedValue.length > 0) {
        formattedPhoneNumber += '(' + processedValue.substring(0, 3)
      }

      if (processedValue.length >= 4) {
        formattedPhoneNumber += ') ' + processedValue.substring(3, 6)
      }

      if (processedValue.length >= 7) {
        formattedPhoneNumber += '-' + processedValue.substring(6, 10)
      }

      processedValue = formattedPhoneNumber
    }

    if (name === 'odometer') {
      processedValue = processedValue.replace(/\D/g, '')
      processedValue = processedValue?.slice(0, 12)
      setFieldValue(name, processedValue)
    }

    if (
      name === 'institution_number' ||
      name === 'account_number' ||
      name === 'seller_account_number'
    ) {
      processedValue = processedValue.replace(/\D/g, '')
      setFieldValue(name, processedValue)
    }

    setFieldValue(name, processedValue)
  }

  const handleFocus = () => {
    setFieldTouched(field.name, true, false) // Mark field as touched when focused
  }

  const inputType =
    type === 'password' ? (showPassword ? 'text' : 'password') : type

  return (
    <div className='flex flex-col gap-2'>
      <div className={cn("font-bold text-xl",labelclasses)}>{label}</div>
      <div className='relative'>
        {
          type == "textarea" ? 
            <textarea cols={cols} {...props} {...field}  rows={rows} className={cn("bg-white",inputclasses)}></textarea>
          :
          <input
            className={cn("bg-white border border-teal-600 w-full p-2 rounded-md outline-0",inputclasses)}
            type={inputType}
            placeholder={placeholder}
            disabled={isDisabled}
            onChange={(e) => handleChange(e)}
            {...props}
            {...field}
            onFocus={handleFocus}
             value={field.value ?? ""}
          />
        }

        {/* right icons */}
        {password && (
          <div
            onClick={() => setShowPassword((prev) => !prev)}
            className='absolute right-3 top-1/2 -translate-y-50-per cursor-pointer'
          >
            <img
              className='max-w-20 max-h-20'
              src={showPassword ? hidePassword : viewPassword}
              alt=''
            />
          </div>
        )}

        {isMcp && (
          <div
            onClick={() => setShowPassword((prev) => !prev)}
            className='absolute right-3 top-1/2 -translate-y-50-per cursor-pointer'
          >
            <img
              className='max-w-20 max-h-20'
              src={mcpCameraICon}
              alt=''
            />
          </div>
        )}









       {
        <ErrorMessage
          name={field.name}
          component='div'
          className='text-xs font-normal text-red-600 mt-1 ml-1 absolute -bottom-15'
        />
      }
      </div>
    </div>
  )
}



export default CustomInput
