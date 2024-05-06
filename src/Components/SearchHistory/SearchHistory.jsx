import React from 'react'

export default function SearchHistory({searchHistory , setSearchTerm}) {
    

  return (
    <div>
        {searchHistory.map((term)=>{
            return <div onClick={()=>{setSearchTerm(term)}}>
                {term}
            </div>
        })}
    </div>
  )
}
