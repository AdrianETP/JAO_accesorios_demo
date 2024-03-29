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
            <figure className='w-full h-3/4 overflow-y-hidden'><Image src={props.image} alt={props.name} width={600} height={50} /></figure>
            <div className="card-body bg-primarydes rounded-b-md">
                <h2 className="card-title font-bold text-textColor">{props.name}</h2>
                <p className=' text-textColor text-md'>{props.description}</p>
                <div className="card-actions justify-end pt-3 flex items-center">
                    <p className=' text-textColor font-thin'>${props.price}MXN</p>
                    <button className="btn bg-secondary text-textColor border-secondary hover:bg-accent hover:text-secondaryBlack  " onClick={() => { location.href = "/Products/" + props.id }}>Comprar</button>
                </div>
            </div>
        </div>
    )
}

export default Product
