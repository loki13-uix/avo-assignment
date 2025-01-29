import { useState } from 'react'
import FileIcon from '../../assets/file-grey.svg'
import FolderIcon from '../../assets/folder.svg'
import MainNavbar from './navbar'
import { useTreeState } from '../../context/tree-state'

function FolderView() {
  const { selectedItem } = useTreeState()
  const [showDropArea] = useState(false)

  if (!selectedItem) return null

  const FolderName = selectedItem.name
  const testCases = selectedItem.nodes?.map((node) => node.name) || []

  return (
    <div className='w-full h-full flex flex-col'>
      <MainNavbar title={FolderName} image={FolderIcon} />
      <div className='p-2 border-t border-[#DFE7EF] bg-[#F6F9FC]'>
        <h4 className='text-[#495057] text-[13px] leading-[20px] font-semibold'>
          Test Cases View
        </h4>
      </div>

      {/* Test Cases */}
      {testCases.map((testCase, index) => (
        <div
          className={`p-2 flex items-center gap-1 border border-l-0 border-[#DFE7EF] ${
            index === testCases.length - 1 ? 'border-b' : 'border-b-0'
          }`}
          key={index}
        >
          <img src={FileIcon} alt='file' className='size-4' />
          <h4 className='text-[#495057] text-[13px] leading-[20px]'>
            {testCase}
          </h4>
        </div>
      ))}

      {/* Test case drop area */}
      {showDropArea && (
        <div className='p-2 flex-1'>
          <div className='size-full bg-[#605BFF0D] border border-[#605BFF] rounded-[8px] border-dashed' />
        </div>
      )}
    </div>
  )
}

export default FolderView
