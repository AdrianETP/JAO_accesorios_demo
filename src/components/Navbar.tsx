import { UserButton } from '@clerk/nextjs'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Navbar() {
    const [mobileMenu, setMobileMenu] = useState<boolean>(false)
    return (
        <div className=''>
            <div className="fixed navbar z-10 bg-slate-900/75 backdrop-blur-sm flex w-full justify-between px-4 mb-4 overflow-x-hidden">
                <Image className='rounded-md w-14 h-14' width={50} height={50} src='/logoJAO.png' alt='Logo' />
                <div className=' w-full max-w-xl justify-evenly hidden sm:flex '>
                    <Link className=' text-slate-200 p-2 border-b hover:border-slate-200 border-slate-900/75 transition-all' href='/About'>Sobre Nosotros</Link>
                    <Link className=' text-slate-200 p-2 border-b hover:border-slate-200 border-slate-900/75 transition-all' href='/Products'>Nuestros Productos</Link>
                    <Link className=' text-slate-200 p-2 border-b hover:border-slate-200 border-slate-900/75 transition-all' href='/Blog'>Nuestro Blog</Link>
                </div>
                <div className='w-full max-w-xl justify-evenly flex sm:hidden '>
                    <button className=' text-slate-200 p-2 border-b hover:border-slate-200 border-slate-900/75 transition-all  ' onClick={() => setMobileMenu(!mobileMenu)}>Menu</button>
                </div>
                <UserButton afterMultiSessionSingleSignOutUrl='/' afterSignOutUrl='/' />
            </div>
            <div className={mobileMenu ? "fixed z-20 left-0 right-0  top-16 btn-group-vertical btn-group" : "hidden"}>
                <button className='btn w-full bg-slate-700 border-none' onClick={() => { setMobileMenu(false); location.href = "/About" }}>Sobre Nosotros</button>
                <button className='btn w-full bg-slate-700 border-none' onClick={() => { setMobileMenu(false); location.href = "/Products" }}>Nuestros Productos</button>
                <button className='btn w-full bg-slate-700 border-none' onClick={() => { setMobileMenu(false); location.href = "/Blog" }}>Nuestro Blog</button>
            </div>
        </div>
    )
}

export default Navbar
