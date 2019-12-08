import React from 'react'
import DateTime from '../DateTime/DateTime'

export type ArticleProps = {
  id: string
  pubDate: string
  link: string
  title: string
  publisherName: string
}

const Article: React.FC<ArticleProps> = React.memo((props) => {
  return <article>
    <h1>{props.title}</h1>
    <p><DateTime time={props.pubDate} /></p>
    <p>{props.publisherName}</p>
    <a href={props.link} target="_blank" rel="noopener noreferrer">
      {props.link}
    </a>
  </article>
})

export default Article
