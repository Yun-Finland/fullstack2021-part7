import { useState } from 'react'

const useField = (id,type) => {
  const [ value, setValue ] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const resetValue = () => { setValue('')}

  return{
    field: {
      id: id,
      type: type,
      value: value,
      name: value,
      onChange
    },
    resetValue
  }
}

export default useField