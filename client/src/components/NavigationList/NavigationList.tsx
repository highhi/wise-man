import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../modules'
import { Link } from 'react-router-dom'

export const Navigation: React.FC<{ id: string }> = React.memo(({ id, children }) => {
  return <li key={id}><Link to={`/feeds/${id}`}>{children}</Link></li>
})

const NavigationList: React.FC = () => {
  const publisher = useSelector<RootState, RootState['publisher']>((state) => state.publisher)

  return <div>
    <ul>
      {publisher.result.map((id) => {
        const entity = publisher.entities.publishers[id]
        return <Navigation id={id}>{entity.name}</Navigation>
      })}
    </ul>
  </div>
}

export default NavigationList
