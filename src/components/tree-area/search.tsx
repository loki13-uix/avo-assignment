import SearchIcon from '../../assets/search.svg'

function Search() {
  return (
    <div className='relative w-full border border-[#DFE7EF] rounded-sm'>
      <input
        id='search'
        className='pe-9 w-full placeholder:text-[#BDBDBD] text-[13px] leading-[20px] p-1.5 outline-none'
        placeholder='Search ...'
        type='text'
      />

      <button className='absolute inset-y-0 end-0 flex items-center justify-center pe-3 cursor-pointer'>
        <img src={SearchIcon} alt='search' className='size-4' />
      </button>
    </div>
  )
}

export default Search
