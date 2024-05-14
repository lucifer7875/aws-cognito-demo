import React from 'react'
import Header from './Header'

const Home = () => {
    return (
        <div>
            <div className=''>
                <Header />
            </div>
            <section className="body-font relative ">
                <div className='animate-bounce animate-once animate-duration-1000 animate-delay-100 animate-ease-linear text-center text-9xl Text'>Welcome </div>
            </section>
        </div>
    )
}

export default Home
