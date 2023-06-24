import Image from "next/image"

const Hero = () => {
  return (
    <div className="hero__container">
      <div className="justify-center items-center">
        <h1 className="hero__title">
          Welcome To <span className="hero-span__title">Blogify</span>
        </h1>
        <p className="hero__subtitle ">Discover Engaging Stories, Insights, And Ideas</p>
        <button className="hero__button ">Read Our Latest Posts</button>
      </div>

      <div className="hero__image-container ">
        <div className="hero__image ">
          <Image
            src="/blogify.png"
            alt="Blogify Logo"
            width={600}
            height={600}
            className='object-contain'
          />
          <div className="hero__bg " />
        </div>
      </div>
    </div>


  )
}

export default Hero
