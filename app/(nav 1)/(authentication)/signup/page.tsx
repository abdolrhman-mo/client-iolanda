'use client'

import Link from "next/link"
import NavSearchResults from "@/app/ui/layout/nav/nav-search-results"
import Input from "@/app/ui/forms/input"

export default function Page({
    searchParams
}: {
    searchParams: {
        query?: string
        page?: string
    }
}) {
    const query = searchParams?.query || ''
    const currentPage = Number(searchParams?.page) || 1

    return (
        <>
            <NavSearchResults query={query} currentPage={currentPage} />
            <h2 className="text-3xl mx-auto w-fit">CREATE ACCOUNT</h2>
            <Input label="first name" />
            <Input label="last name" />
            <Input label="email" />
            <Input label="password" />
            <input className="bg-black text-white py-2 w-full cursor-pointer" type="submit" value="CREATE" />
            <Link className="block py-2 w-full text-center cursor-pointer" href={'/login'}>Already have an acount?</Link>
        </>
    )
}