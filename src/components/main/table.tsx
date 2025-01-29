import Globe from '../../assets/globe.svg'
import Hamburger from '../../assets/hamburger.svg'
import ChevronDownGrey from '../../assets/chevron-down-grey.svg'
import PlusIcon from '../../assets/plus.svg'
import PlusGrey from '../../assets/plus-grey.svg'

interface TableRow {
  id: number
  name: string
  action: string
  inputValue: string
  outputValue: string
  isExpanded?: boolean
}

interface TableProps {
  data: TableRow[]
  title: string
  isLastTable: boolean
}

function Table({ data, title, isLastTable }: TableProps) {
  return (
    <div className='flex flex-col gap-2.5 mb-2.5 text-[13px] leading-[20px] text-[#495057]'>
      <div className='w-full border border-[#E9ECEF] rounded'>
        <div className='flex items-center gap-2 bg-[#EDF3F8] border-b border-[#E9ECEF]'>
          <div className='w-20 border-r border-l border-[#DFE7EF] h-full py-2.5 flex items-center justify-between px-2'>
            <img src={Hamburger} alt='Hamburger' />
            <div className='size-5 bg-white border border-[#BDBDBD] rounded-[4px]' />
            <img src={ChevronDownGrey} alt='Chevron Down Grey' />
          </div>
          <span className='flex items-center'>
            <img src={Globe} alt='Globe' className='mr-1 size-5' />
            {title}
          </span>
        </div>

        <table className='w-full border'>
          <thead className='bg-[#F6F9FC] border-b border-[#E9ECEF]'>
            <tr className='text-left font-semibold'>
              <th className='w-20 px-2 py-1 border border-[#DFE7EF]'></th>
              <th className='w-10 px-2 py-1 border border-[#DFE7EF]'>#</th>
              <th className='px-2 py-1 border border-[#DFE7EF]'>Name</th>
              <th className='px-2 py-1 border border-[#DFE7EF]'>Action</th>
              <th className='px-2 py-1 border border-[#DFE7EF]'>Input value</th>
              <th className='px-2 py-1 border border-[#DFE7EF]'>
                Output value
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className='border-b border-[#E9ECEF]'>
                <td className='px-2 py-2 w-20 flex justify-end items-center h-full gap-2'>
                  <img src={Hamburger} alt='Hamburger' />
                  <div className='size-5 bg-white border border-[#BDBDBD] rounded-[4px]' />
                </td>
                <td className='px-2 py-1 border border-[#DFE7EF]'>{row.id}</td>
                <td className='px-2 py-1 border border-[#DFE7EF]'>
                  {row.name}
                </td>
                <td className='px-2 py-1 border border-[#DFE7EF]'>
                  {row.action}
                </td>
                <td className='px-2 py-1 border border-[#DFE7EF]'>
                  {row.inputValue}
                </td>
                <td className='px-2 py-1 border border-[#DFE7EF]'>
                  {row.outputValue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='w-full flex justify-center'>
        <img
          src={isLastTable ? PlusIcon : PlusGrey}
          className='size-[18px]'
          alt='Plus Icon'
        />
      </div>
    </div>
  )
}

export default Table
