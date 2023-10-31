'use client'

import React, { useState, ReactNode } from 'react';
import './post.css'

interface PostProps {
  day: string
  month: string
  year: string
  title: string
  children?: ReactNode
}

const Post: React.FC<PostProps> = ({ day, month, year, title, children }) => {
  const [more, setMore] = useState(false)

  const onReadMore = () => setMore(true)

  const css_completed = more ? 'blog-complete' : '';

  return (
    <article>
      <div className='blog-date'>
        <div className='day'>{day}</div>
        <div className='uppercase text-lg font-bold font-satisfy hidden'>{month} - {year}</div>
        <div className='uppercase text-sm font-bold font-satisfy lg:hidden'>{month}</div>
        <div className='uppercase text-sm font-bold font-satisfy lg:hidden'>{year}</div>
      </div>
      <div className='blog-post'>
        <h3 className='uppercase text-xl lg:text-3xl font-bold lg:mb-4'>{title}</h3>
        <div className={`blog-content ${css_completed}`}>
          {children}
        </div>
        {more === false &&
          <a href='#' className='button' onClick={onReadMore}>Leer más</a>
        }
      </div>
    </article>
  )
}

export default Post
