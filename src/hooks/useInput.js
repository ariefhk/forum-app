// useForm.js
import { useState } from "react"

const useInput = (initialState) => {
  const [values, setValues] = useState(initialState)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const reset = () => {
    setValues(initialState)
  }

  const resetField = (fieldName, value) => {
    setValues({
      ...values,
      [fieldName]: value,
    })
  }

  return {
    values,
    handleChange,
    reset,
    resetField,
  }
}

export default useInput
