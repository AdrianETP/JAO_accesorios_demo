import { UserButton, useUser } from '@clerk/nextjs'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineUser } from 'react-icons/ai'

function Navbar() {
    const [mobileMenu, setMobileMenu] = useState<boolean>(false)
    const user = useUser()
    const gotoLogin = () => {
        if (typeof window != "undefined") {
            window.location.href = "/Products"
        }
    }
    return (
        <div className=''>
            <div className="fixed navbar z-10 bg-primary/75 backdrop-blur-sm flex w-full justify-between px-4 mb-4 overflow-x-hidden">
                <Image className='rounded-md w-14 h-14' width={50} height={50} src='/logoJAO.png' alt='Logo' />
                <div className=' w-full max-w-xl justify-evenly hidden sm:flex '>
                    <Link className=' text-textColor p-2 border-b-2  hover:border-b-textColor border-primary/75 transition-all' href='/About'>Sobre Nosotros</Link>
                    <Link className=' text-textColor p-2 border-b-2 hover:border-b-textColor border-primary/75 transition-all' href='/Products'>Nuestros Productos</Link>
                    <Link className=' text-textColor p-2 border-b-2 hover:border-b-textColor border-primary/75 transition-all' href='/Blog'>Nuestro Blog</Link>
                </div>
                <div className='w-full max-w-xl justify-evenly flex sm:hidden '>
                    <button className=' text-slate-200 p-2 border-b hover:border-slate-200 border-slate-900/75 transition-all  ' onClick={() => setMobileMenu(!mobileMenu)}>Menu</button>
                </div>
                {user.isSignedIn ?
                    <UserButton afterMultiSessionSingleSignOutUrl='/Products' afterSignOutUrl='/' />
                    :
                    <button className='rounded-full bg-accent hover:bg-secondary  transition-all duration-300  w-10 h-10 flex items-center justify-center border-2 border-slate-700 hover:border-slate-300' onClick={() => gotoLogin()}>
                        <AiOutlineUser className='text-secondaryBlack  hover:text-textColor w-full h-full p-2' size={24} />
                    </button>

                }
            </div>
            <div className={mobileMenu ? "fixed z-20 left-0 right-0  top-16 btn-group-vertical btn-group" : "hidden"}>
                <button className='btn w-full bg-primary border-none' onClick={() => { setMobileMenu(false); location.href = "/About" }}>Sobre Nosotros</button>
                <button className='btn w-full bg-primary border-none' onClick={() => { setMobileMenu(false); location.href = "/Products" }}>Nuestros Productos</button>
                <button className='btn w-full bg-primary border-none' onClick={() => { setMobileMenu(false); location.href = "/Blog" }}>Nuestro Blog</button>
            </div>
        </div>
    )
}

export default Navbar
