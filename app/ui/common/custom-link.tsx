'use client'

import { toggleSearchBar } from "@/redux/features/nav/searchBarSlice";
import clsx from "clsx";
import Link from "next/link";
import { useDispatch } from "react-redux";

export default function CustomLink({
    href,
    className,
    theme = 'dark',
    navSearch = false,
    children,
}: {
    href: string
    className?: string
    theme?: 'light' | 'dark'
    navSearch?: boolean
    children: React.ReactNode
}) {
    const dispatch = useDispatch()
    let handleClick = () => {
        if (navSearch) {
            dispatch(toggleSearchBar())
        }
    }

    return (
        <Link
            className={clsx(
                'rounded w-full block py-2 px-8 capitalize text-center',
                {
                    'text-black bg-white border' : theme === 'light',
                    'text-white bg-black' : theme === 'dark'
                }
            ) + ` ${className}`}
            href={href}
            onClick={handleClick}
        >
            {children}
        </Link>
    )
}