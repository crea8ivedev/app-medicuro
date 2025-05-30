import { useEffect, useState } from "react"
import axiosInstance from "../../../utils/axios"
import { showToast } from "../../../utils/toast"

import { useFormik,Field,FormikProvider } from "formik"
import CustomInput from "../../../components/CustomInput"
import * as Yup from "yup"
import CommonSelectBox from "./CommonSelectBox"

function DynamicFormBKP({id}) {

    const [fields,setFields] = useState([])
    const [initializeValues,setInitializeValues] = useState([])

    useEffect(() => {
        const fetchFields = async  () => {
         try {
             if(id){
              const response = await   axiosInstance.get(`/api/v1/services/fields?serviceId=${id}`)
              console.log(response?.data?.data)
            //   if(response.data?.statusCode == 200){
                setFields(response.data?.data)

                setInitializeValues(response.data?.data?.reduce((acc, curr) => {
                    acc[curr.name] = "";
                    return acc;
                }, {}))
            //   }
          } 
         } catch (error) {
            showToast.error("Somethig went wrong")
         }
        }

        fetchFields()
    },[id])

    const submitHandler = (values) => {

    }

    const validationSchema = () => {
    const shape = {};

    fields.forEach((field) => {
        let validator;

        switch (field.type) {
            case 'text':
            case 'textarea':
                validator = Yup.string();
                break;

            case 'email':
                validator = Yup.string().email('Invalid email address');
                break;

            case 'number':
                validator = Yup.number().typeError('Must be a number');
                break;

            case 'select':
            case 'radio':
                validator = Yup.string().oneOf(field.options, 'Invalid selection');
                break;

            case 'checkbox':
                validator = Yup.boolean();
                break;

            case 'date':
                validator = Yup.date().typeError('Invalid date');
                break;

            case 'file':
                validator = Yup.mixed();
                break;

            case 'array':
                validator = Yup.array();
                break;

            default:
                validator = Yup.mixed();
        }

        // Apply required if specified
        if (field.required) {
        validator = validator.required(`${field.label || field.name} is required`);
        } else {
        validator = validator.notRequired();
        }

        // File field with `withDocuments` flag
        if (field.type === 'file' && field.withDocuments) {
        validator = validator.test(
            'fileRequired',
            `${field.label || field.name} is required`,
            function (value) {
            if (!field.required) return true;
            return value && value instanceof File;
            }
        );
        }

        shape[field.name] = validator;
    });

    return Yup.object().shape(shape);
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues : initializeValues,
        validationSchema,
        onSubmit : (values,helpers) => submitHandler(values,helpers)
    })

  return (
    <div>
        <FormikProvider value={formik}>
            {
                fields?.map((field, index) => {
                    return <div key={index}>
                        <div className='text-white font-bold mb-2'>{field.label}</div>
                        {
                            field.type === 'file' ? <Field 
                                name={field.name}
                                component={CustomInput}
                                type={field.type} 
                                inputclasses="w-full bg-white" 
                                rows="10" 
                                className="forn-field"
                            />: 
                            <Field 
                                component = {CommonSelectBox}
                                options = {field?.options}
                            />
                        }
                    </div>
                })
            }
            <div className='md:text-end text-center mt-5'>
                    <button className='common-btn'>Send Request</button>
                </div>
        </FormikProvider>
    </div>
  )
}

export default DynamicForm