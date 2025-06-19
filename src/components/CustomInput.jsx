import React, { useState } from 'react'
import hidePassword from '../assets/images/hide-password.png'
import viewPassword from '../assets/images/show-password.png'
import mcpCameraICon from '../assets/images/camera-black.png'
import calenderIcon  from '../assets/images/calendar.svg'


import { cn } from '../utils/cn'
import { ErrorMessage } from 'formik'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';


function CustomInput({
  field,
  form: { touched, errors, setFieldValue, setFieldTouched },
  type = 'text',
  label = '',
  placeholder = '',
  password,
  inputclasses,
  labelclasses,
  cols = 0,
  rows = 0,
  name,
  isDisabled,
  isMcp,
  errorStyle,
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
    setFieldTouched(field.name, true, false)
  }

  const inputType =
    type === 'password' ? (showPassword ? 'text' : 'password') : type

  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor={field.name} className={cn("font-bold text-[18px]", labelclasses)}>
        {label}
      </label>
      <div className='relative'>
        {
          type === "textarea" ? (
            <textarea
              cols={cols}
              {...props}
              {...field}
              rows={rows}
              className={cn("bg-white outline-0 p-2 border-2 rounded-sm border-teal-600 ", inputclasses)}
            ></textarea>
          ) : type === "date" ? (
            <div className='relative w-full'>
              <DatePicker
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) => setFieldValue(field.name, date)}
                onBlur={() => setFieldTouched(field.name, true)}
                placeholderText={placeholder}
                dateFormat="yyyy-MM-dd"
                className={cn("bg-white border border-teal-600 w-full p-4 rounded-md outline-0", inputclasses)}
                disabled={isDisabled}
                {...props}
              />

              <div
                className='absolute right-2 top-1/2 -translate-y-50-per cursor-pointer'
              >
                <img
                  className='max-w-20 max-h-20'
                  src={calenderIcon}
                  alt=''
                />
              </div>

            </div>

          ) : (
            <input
              className={cn("bg-white border border-teal-600 w-full p-4  outline-0", inputclasses)}
              type={inputType}
              id={field.name}
              placeholder={placeholder}
              disabled={isDisabled}
              onChange={(e) => handleChange(e)}
              {...props}
              {...field}
              onFocus={handleFocus}
              value={field.value ?? ""}
            />
          )
        }

        {password && (
          <div
            onClick={() => setShowPassword((prev) => !prev)}
            className='absolute right-2 top-1/2 -translate-y-50-per cursor-pointer'
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
            className='absolute right-2 top-1/2 -translate-y-50-per cursor-pointer'
          >
            <img
              className='max-w-20 max-h-20'
              src={mcpCameraICon}
              alt=''
            />
          </div>
        )}

        <ErrorMessage
          name={field.name}
          component='div'
          className={cn("text-xs text-navy  font-semibold ",errorStyle)}
          aria-live="polite" aria-atomic="true"
        />
      </div>
    </div>
  )
}

export default CustomInput
