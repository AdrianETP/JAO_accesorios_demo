import React from 'react'
import Image from 'next/image'

interface Props {
    image: string,
    description: string,
    price: number,
    name: string,
    id: string,
}
function Product(props: Props) {
    return (
        <div className="card card-compact min-w-80 w-80 h-96 bg-base-100 backdrop-blur-md shadow-xl mx-10 my-5">
            <figure className='w-full h-3/4 overflow-y-hidden'><img src={props.image} alt={props.name} width={600} height={50} /></figure>
            <div className="card-body">
                <h2 className="card-title">{props.name}</h2>
                <p className='text-slate-400 text-md'>{props.description}</p>
                <p className='text-slate-400'>${props.price}MXN</p>
                <div className="card-actions justify-end">
                    <button className="btn bg-sky-700 text-sky-100 border-sky-800" onClick={() => { location.href = "/Products/" + props.id }}>Comprar</button>
                </div>
            </div>
        </div>
    )
}

export default Product
