import Link from 'next/link'
import React from 'react'
import localfont from 'next/font/local';
import Image from 'next/image';
import Footer from "../app/footer";

const nugget = localfont(
  {
    src: [
      {
        path: "../../public/fonts/AudioNugget.ttf"
      }
    ],
    variable: "--font-nugget",
  }
);

function page() {
  return (
    <div>
      {/* Card*/}
      <div className='Home_card'>
        {/* Mobile*/}
        <div>
          <Image
            src='/Images/home.png'
            alt='Home-Image'
            width={700}
            height={400}
          />

        </div>
        {/* web ui*/}
        <div className="card">
          <div className="card-content">
            <div className='card-content-dots'></div>
            <div className='card-content-dots'></div>
            <div className='card-content-dots'></div>
          </div>
          <div className='card-text'>
            <p>Who needs real-life social skills when you have anonymous chat?</p>
          </div>
          <div className='card-text-quote'>
            <p>Explore, connect, and converse – all anonymously</p>
          </div>
        </div>
      </div>

      <Link href="/yapnow" className="no-underline">
        <div className="Btn-main">
          <p className={nugget.className}>YAP NOW</p>
        </div>
      </Link>

      <Footer />
    </div>
  )
}

export default page