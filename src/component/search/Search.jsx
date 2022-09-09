import React from 'react'
import './search.css'
export const Search = (props) => {
  return (
    <div className="topnav">
        <input onChange={(e) => props.onChange(e.target.value)} type="text" placeholder="Search.."/>
        <button className='btn' onClick={props.onSearch}><i className="fa-solid fa-magnifying-glass fa-fa"></i></button>
    </div>
  )
}
