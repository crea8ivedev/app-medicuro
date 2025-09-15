import { useRef, useState } from 'react'
import hidePassword from '../assets/images/hide-password.png'
import viewPassword from '../assets/images/show-password.png'
import calenderIcon from '../assets/images/calendar.svg'

import { cn } from '../utils/cn'
import { ErrorMessage } from 'formik'
import 'react-datepicker/dist/react-datepicker.css'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

export function MyCalendarIcon() {
  return <img src={calenderIcon} alt='calendar' className='w-5 h-5' />
}

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
  const [open, setOpen] = useState(false)
  const [tempValue, setTempValue] = useState(null)
  const inputRef = useRef()

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
    setFieldValue(name, processedValue)
  }

  const handleKeyDown = (e) => {
    if(type == 'number'){
       if (["e", "E", "+", "-", "."].includes(e.key)) {
      e.preventDefault(); // block unwanted keys
    }
    }
  }

  const handleFocus = () => {
    setFieldTouched(field.name, true, false)
  }

  const inputType =
    type === 'password' ? (showPassword ? 'text' : 'password') : type

  return (
    <div className='flex flex-col gap-2'>
      <label
        htmlFor={field.name}
        className={cn('font-bold', labelclasses)}
      >
        {label}
      </label>
      <div className='relative'>
        {type === 'textarea' ? (
          <textarea
            onDrop={(e) => e.preventDefault()}
            cols={cols}
            {...props}
            {...field}
            rows={rows}
            className={cn(
              'bg-white outline-0 p-2 border-2 rounded-sm border-teal-600 ',
              inputclasses,
            )}
          ></textarea>
        ) : type === 'date' ? (
          <div className='relative w-full date-picker'>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                format='yyyy-MM-dd'
                label={label}
                value={field.value ? new Date(field.value) : tempValue}
                onChange={(val) => {
                  if (val) {
                    const isoString = val.toISOString()
                    setFieldValue(field.name, isoString)
                    setTempValue(null)

                  }
                }}
                onBlur={() => setFieldTouched(field.name, true)}
                onOpen={() => {
                  setOpen(true)
                  if (!field.value) setTempValue(new Date())
                }}
                onClose={() => {
                  setOpen(false)
                  setTempValue(null)
                }}
                open={open}
                onClick={() => setOpen(true)}
                slots={{ openPickerIcon: MyCalendarIcon }}
                slotProps={{
                  textField: {
                    onClick: () => setOpen(true), // ✅ clicking input opens picker
                    readOnly: true                // optional: prevent manual typing
                  }
                }}
                openTo='day'
                {...(props.futureDate ? { minDate: new Date() } : {})}
              />
            </LocalizationProvider>
          </div>
        ) : (
          <input
            className={cn(
              'bg-white border border-teal-600 w-full p-4 outline-0',
              inputclasses,
            )}
            type={inputType}
            id={field.name}
            placeholder={placeholder}
            disabled={isDisabled}
            onChange={(e) => handleChange(e)}
            {...props}
            {...field}
            onFocus={handleFocus}
            value={field.value ?? ''}
            ref={inputRef}
            onDrop={(e) => e.preventDefault()}
            onKeyDown={handleKeyDown}
          />
        )}

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

        <ErrorMessage
          name={field.name}
          component='div'
          className={cn('text-xs text-navy  font-semibold ', errorStyle)}
          aria-live='polite'
          aria-atomic='true'
        />
      </div>
    </div>
  )
}

export default CustomInput
