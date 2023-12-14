'use client'
import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

export default function Searchbar() {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const { replace } = useRouter()

  const handleChange = (term) => {
    console.log('term', term)

    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  const handleSubmit = (e) => {
    console.log('hook up the click', searchUser)
    e.preventDefault()
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <h1>Search for players!</h1>

        <input
          type='text'
          placeholder='Search for players'
          defaultValue={searchParams.get('query')?.toString()}
          onChange={(e) => handleChange(e.target.value)}
        />

        <button type='submit' className='border-4' onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </Suspense>
  )
}
