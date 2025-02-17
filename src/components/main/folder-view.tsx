import { Droppable } from 'react-beautiful-dnd'
import FileIcon from '../../assets/file-grey.svg'
import FolderIcon from '../../assets/folder.svg'
import useSelectionStore from '../../store/selection'
import { isDroppable } from '../../utils/tree'
import MainNavbar from './navbar'

function FolderView() {
  const { selectedItem } = useSelectionStore()

  if (!selectedItem.item) return null

  const FolderName = selectedItem.item.name
  const testCases = selectedItem.item.nodes?.map((node) => node.name) || []
  const canDrop = isDroppable(selectedItem.item)

  return (
    <div className='w-full h-full flex flex-col base-font'>
      <MainNavbar title={FolderName} image={FolderIcon} />
      <div className='p-2 border-t border-border-secondary bg-[#F6F9FC]'>
        <h4 className='text-base font-semibold'>Test Cases View</h4>
      </div>

      {/* Test Cases */}
      {testCases.map((testCase, index) => (
        <div
          className={`p-2 flex items-center gap-1 border border-l-0 border-border-secondary ${
            index === testCases.length - 1 ? 'border-b' : 'border-b-0'
          }`}
          key={index}
        >
          <img src={FileIcon} alt='file' className='size-4' />
          <h4 className='text-base'>{testCase}</h4>
        </div>
      ))}

      {/* Droppable Area */}
      <Droppable
        droppableId={`folder-${selectedItem.item.id}`}
        isDropDisabled={!canDrop}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className='flex-1'
          >
            <div
              className={`size-full transition-colors duration-200 ${
                snapshot.isDraggingOver
                  ? 'bg-[#F5F5FF] border border-[#605BFF] border-dashed rounded-lg'
                  : ''
              }`}
              style={{ minHeight: '100px' }}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default FolderView
