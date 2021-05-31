import { useState } from 'react'

const useComment = (type) => {
  const [ value, setValue ] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const resetValue = () => { setValue('')  }

  return{
    field:{
      type: type,
      value: value,
      onChange: onChange
    },
    resetValue
  }
}

export default useComment