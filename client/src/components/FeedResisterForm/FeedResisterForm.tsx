import React, { useCallback, useState } from 'react'
import Button from '../Button/Button'
import { useDispatch } from 'react-redux'
import { subscribeFeedRequest } from '../../modules/feed'

const FeedResisterForm: React.FC = () => {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value.trim())
  }, [setValue])

  const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!value) return
    dispatch(subscribeFeedRequest({ url: value }))
    setValue('')
  }, [value])

  return <form onSubmit={onSubmit}>
    <div>
      <input type="text" placeholder='Input feed url' onChange={onChange} value={value} />
    </div>
    <Button>Resister</Button>
  </form>
}

export default FeedResisterForm
