import { useRef } from 'react'
import photoPlusLogo from '../../../assets/images/plus-photos.png'
import { Camera } from 'lucide-react'
import { useFormikContext } from 'formik'

const PhotosUploader = ({ name, maxPhotos = 3 }) => {
  const { values, setFieldValue } = useFormikContext()

  const photos = values[name] || []

  const fileInputRef = useRef(null)

  const handlePhotoClick = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const updated = [...photos, { file, preview: reader.result }]
      setFieldValue(name, updated)
    }
    reader.readAsDataURL(file)
  }

  const removePhoto = (index, e) => {
    e.stopPropagation()
    const updated = photos.filter((_, i) => i !== index)
    setFieldValue(name, updated)
  }

  return (
    <div className='mt-4'>
      <div className='flex gap-3'>
        <Camera size={20} className='text-white' />
        <div className='text-white'>Photos</div>
      </div>
      <div className='flex gap-2 mt-3 cursor-pointer'>
        {Array.from({ length: maxPhotos }).map((_, index) => (
          <div
            onClick={() => fileInputRef.current.click()}
            key={index}
            className='relative'
          >
            <img
              className='h-30 w-30 object-cover'
              src={photos[index]?.preview || photoPlusLogo}
              alt=''
            />
            {photos[index] && (
              <div
                onClick={(e) => removePhoto(index, e)}
                className='absolute -top-[10px] right-[-5px] cursor-pointer h-20 w-20 bg-teal-400 flex items-center justify-center rounded-circle'
              >
                &times;
              </div>
            )}
          </div>
        ))}
      </div>
      <input
        type='file'
        hidden
        accept='image/*'
        ref={fileInputRef}
        onChange={handlePhotoClick}
      />
    </div>
  )
}

export default PhotosUploader
