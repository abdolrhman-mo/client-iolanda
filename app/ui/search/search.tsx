'use client'

import clsx from 'clsx'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { useDispatch } from 'react-redux'
import { toggleSearchBar } from '@/redux/features/nav/searchBarSlice'
import { Suspense } from 'react'
import { NavSearchResultsSkeleton } from '@/app/ui/common/skeletons'

export default function Search({
  placeholder,
}: { 
  placeholder?: string
}) {
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  let handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <Suspense fallback={<NavSearchResultsSkeleton />}>
      <div className={clsx(
        'relative grid grid-cols-12 w-full border rounded ',
        // Spacing
        'py-4 px-12', 
      )}
      >
        <MagnifyingGlassIcon 
          className={clsx(
            // Sizing
            'h-6',
            // Grid
            'col-span-1',
            // Typography
            'text-gray-500 peer-focus:text-gray-900',
          )}
          />
        <input
          className={clsx(
            // Layout & Sizing
            'peer block w-full',
            // Grid
            'col-span-10',
            // Borders
            'rounded-md border-none',
            // Spacing
            'py-0',
            // Typography 
            'text-sm placeholder:text-gray-500',
          )}
          onChange={e => {
            handleSearch(e.target.value)
          }}
          placeholder={placeholder}
          defaultValue={searchParams.get('query')?.toString()}
        />
        <div className="col-span-1 flex justify-end">
          <XMarkIcon
            className='h-6 cursor-pointer'
            onClick={() => dispatch(toggleSearchBar())}
          />
        </div>
      </div>
    </Suspense>
  )
}
