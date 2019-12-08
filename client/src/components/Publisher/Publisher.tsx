import React from 'react'
import { TPublisher } from '../../modules/schema/publisher'
import { Link } from 'react-router-dom'

const Publisher: React.FC<TPublisher> = React.memo((props) => {
  return <p>
    <Link to={`/feeds/${props.id}`}>{props.name}</Link>
  </p>
})

export default Publisher
