import { useUser } from '@clerk/nextjs'
import { SignOutButton } from '@clerk/nextjs'
import React, { useState } from 'react'

function Navbar() {
    const profileImage = useUser().user?.profileImageUrl
    const [userMenu, setUserMenu] = useState<boolean>(false)
    return (
        <div className="navbar bg-slate-900 flex w-full justify-between px-4 mb-4">
            <img className='rounded-md w-14 h-14' src='/logoJAO.png' />
            <div className='flex w-full max-w-xl justify-evenly '>
                <a className=' text-slate-200 p-2 border-b hover:border-slate-200 border-slate-900 transition-all  '>Sobre Nosotros</a>
                <a className=' text-slate-200 p-2 border-b hover:border-slate-200 border-slate-900 transition-all  '>Nuestros Productos</a>
                <a className=' text-slate-200 p-2 border-b hover:border-slate-200 border-slate-900 transition-all  '>Contactanos</a>
            </div>
            <img src={profileImage} className='w-14 h-14 rounded-full' onClick={() => { setUserMenu(!userMenu) }} />
            <div className={userMenu ? "absolute right-1 top-16 btn-group btn-group-vertical" : "hidden"}>
                <SignOutButton className="btn bg-slate-700 border-none" />
            </div>
        </div>
    )
}

export default Navbar
