import Link from 'next/link'
import React from 'react'
import localfont from 'next/font/local';

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

function Nav() {
  return (
    <div>
      <div className='Nav'>
        <div>
          <Link href="/" className="no-underline text-black"><p className={nugget.className}>YAPPING</p></Link>
        </div>
        <div className={`Nav_links ${nugget.className}`}>
          <Link href="/yapnow" className="no-underline text-black">
            <h3 className="nav-link-text">CHAt</h3>
          </Link>

          <h3 className="nav-link-text">ABOUt</h3>
        </div>
      </div>
    </div>
  )
}

export default Nav