import Link from "next/link"


const Navbar = () => {
  return (
    <header>
      <nav className="flex justify-between items-center w-[92%] m-auto">
        <div>
          <h1 className="m-5 font-bold text-[22px] cursor-pointer">Blogify</h1>
        </div>
        <div className="flex items-center gap-[4vw]">
          <Link className="hover:text-primary" href="/">Home</Link>
          <Link className="hover:text-primary" href="/about">About</Link>
          <Link className="hover:text-primary" href="/contact">Pricing</Link>
          <button className=" text-primary px-5 py-2 rounded-lg hover:outline-[#f7a36c] outline outline-1 outline-primary">
            Get Started
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
