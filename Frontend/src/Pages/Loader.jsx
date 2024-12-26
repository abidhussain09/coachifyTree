import React from 'react'

const loaderImg = "https://res.cloudinary.com/dh26dmbg3/image/upload/v1721314579/coming-soon-mystery-retail-concept-vector-13969461_socgoi.jpg"
export const Loader = () => {
  return (
    <div className='flex items-center justify-center my-16 mx-auto h-[500px] w-[500px] hover:scale-110'>
      <img src={loaderImg} />
    </div>
  )
}



