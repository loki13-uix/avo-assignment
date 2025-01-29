import Search from '../search'
import PlusIcon from '../../../assets/plus.svg'

type Props = {
  title: string
  image: string
  chevronImage?: string
}

function TitleAndSearch({ title, image, chevronImage }: Props) {
  return (
    <div className='flex flex-col gap-2.5 w-full border-b border-border-primary px-4 pt-2.5 pb-4'>
      <div className='w-full flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          {chevronImage && (
            <img src={chevronImage} alt='chevron' className='size-4 mr-1' />
          )}
          <img src={image} alt='image' className='size-4' />
          <h4 className='text-base base-font'>{title}</h4>
        </div>

        {/* Plus Button */}
        <button className='size-[18px] rounded-full cursor-pointer'>
          <img src={PlusIcon} alt='plus' className='size-full' />
        </button>
      </div>

      <Search />
    </div>
  )
}

export default TitleAndSearch
