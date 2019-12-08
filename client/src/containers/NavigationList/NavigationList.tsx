import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../modules'
import { Link } from 'react-router-dom'
import { fetchPublishersRequest } from '../../modules/publisher'

const Navigation: React.FC = () => {
  const dispatch = useDispatch()
  const publisher = useSelector<RootState, RootState['publisher']>((state) => state.publisher)

  useEffect(() => {
    dispatch(fetchPublishersRequest())
  }, [])

  return <div>
    <ul>
      {publisher.result.map((id) => {
        const entity = publisher.entities.publishers[id]
        return <li key={id}><Link to={`/feeds/${id}`}>{entity.name}</Link></li>
      })}
    </ul>
  </div>
}

export default Navigation
