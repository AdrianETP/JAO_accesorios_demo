import { useUser } from '@clerk/nextjs'
import { SignOutButton } from '@clerk/nextjs'
import React, { useState } from 'react'

function Navbar() {
    const profileImage = useUser().user?.profileImageUrl
    const [userMenu, setUserMenu] = useState<boolean>(false)
    const [mobileMenu, setMobileMenu] = useState<boolean>(false)
    return (
        <div className=''>
            <div className="fixed navbar bg-slate-900/75 backdrop-blur-sm flex w-full justify-between px-4 mb-4 overflow-x-hidden">
                <img className='rounded-md w-14 h-14' src='/logoJAO.png' />
                <div className=' w-full max-w-xl justify-evenly hidden sm:flex '>
                    <a className=' text-slate-200 p-2 border-b hover:border-slate-200 border-slate-900/75 transition-all  '>Sobre Nosotros</a>
                    <a className=' text-slate-200 p-2 border-b hover:border-slate-200 border-slate-900/75 transition-all  '>Nuestros Productos</a>
                    <a className=' text-slate-200 p-2 border-b hover:border-slate-200 border-slate-900/75 transition-all  '>Nuestro Blog</a>
                </div>
                <div className='w-full max-w-xl justify-evenly flex sm:hidden '>
                    <a className=' text-slate-200 p-2 border-b hover:border-slate-200 border-slate-900/75 transition-all  ' onClick={() => setMobileMenu(!mobileMenu)}>Menu</a>
                </div>

                <img src={profileImage} className='w-14 h-14 rounded-full' onClick={() => { setUserMenu(!userMenu) }} />
            </div>
            <div className={userMenu ? "absolute right-1 top-16 btn-group btn-group-vertical" : "hidden"}>
                <SignOutButton className="btn bg-slate-700 text-xs border-none" />
            </div>
            <div className={mobileMenu ? "absolute z-20 left-0 right-0  top-16 btn-group-vertical btn-group" : "hidden"}>
                <button className='btn w-full bg-slate-700 border-none' onClick={() => { setMobileMenu(false) }}>Sobre Nosotros</button>
                <button className='btn w-full bg-slate-700 border-none' onClick={() => { setMobileMenu(false) }}>Nuestros Productos</button>
                <button className='btn w-full bg-slate-700 border-none' onClick={() => { setMobileMenu(false) }}>Nuestro Blog</button>
            </div>
        </div>
    )
}

export default Navbar
