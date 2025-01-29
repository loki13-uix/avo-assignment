type Props = {
  title: string
  image: string
}

function MainNavbar({ title, image }: Props) {
  return (
    <div className='w-full p-4 flex items-center gap-1.5'>
      <img src={image} alt={title} className='size-4' />
      <h4 className='text-2xl font-semibold text-[13px] leading-[20px]'>
        {title}
      </h4>
    </div>
  )
}

export default MainNavbar
