import React from 'react'
import dayjs from 'dayjs'

type DateTimeProps = {
  time: string
  format?: string
}

const DateTime: React.FC<DateTimeProps> = ({ time, format = 'YYYY-MM-DD HH:mm' }) => {
  return <time dateTime={time}>{dayjs(time).format(format)}</time>
}

export default DateTime
