import { useState } from 'react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import ChevronDownIcon from '../../../assets/chevron-down.svg'
import FileE2EIcon from '../../../assets/file-e2e.svg'
import FileIcon from '../../../assets/file-grey.svg'
import FolderE2EIcon from '../../../assets/folder-e2e.svg'
import FolderIcon from '../../../assets/folder.svg'
import { useTreeState } from '../../../context/tree-state'
import { Node } from '../sections/data/test-cases'

type TreeType = 'test-cases' | 'e2e'

// Helper functions
function findNodeById(root: Node, id: string): Node | null {
  if (root.id === id) return root

  if (!root.nodes) return null

  for (const node of root.nodes) {
    const found = findNodeById(node, id)
    if (found) return found
  }

  return null
}

function removeNodeById(root: Node, id: string): Node {
  if (!root.nodes) return root

  root.nodes = root.nodes.filter((node) => node.id !== id)
  root.nodes = root.nodes.map((node) => removeNodeById(node, id))

  return root
}

function insertNodeInto(
  root: Node,
  nodeToInsert: Node,
  parentId: string,
  index: number
): Node {
  if (root.id === parentId && root.nodes) {
    root.nodes = [
      ...root.nodes.slice(0, index),
      nodeToInsert,
      ...root.nodes.slice(index),
    ]
    return root
  }

  if (!root.nodes) return root

  root.nodes = root.nodes.map((node) =>
    insertNodeInto(node, nodeToInsert, parentId, index)
  )

  return root
}

function TreeItem({
  data,
  level = 0,
  noSelection,
  treeType,
  index,
}: {
  data: Node
  level?: number
  noSelection: boolean
  treeType: TreeType
  index: number
}) {
  const [isOpen, setIsOpen] = useState(false)
  const { setSelectionType, setSelectedItem } = useTreeState()
  const isFolder = data.nodes !== undefined

  function hasNoFolders(nodes: Node[]) {
    return nodes.every(
      (node) => node.nodes === undefined || node.nodes?.length === 0
    )
  }

  function handleClick() {
    if (isFolder) {
      setIsOpen(!isOpen)

      if (noSelection) return

      if (data.nodes && hasNoFolders(data.nodes)) {
        setSelectionType('folder')
        setSelectedItem(data)
      }
    } else {
      if (noSelection) return
      setSelectionType('file')
      setSelectedItem(data)
    }
  }

  const content = (
    <div className='w-full hover:bg-[#EBEBFF]'>
      <span
        className='flex items-center gap-1.5 py-1'
        onClick={handleClick}
        style={{ paddingLeft: `${level * 24}px` }}
      >
        {isFolder && (
          <button className='p-1 -m-1 cursor-pointer'>
            <img
              src={ChevronDownIcon}
              alt='chevron-down'
              className={`size-4 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        )}

        {isFolder ? (
          <img
            src={treeType === 'test-cases' ? FolderIcon : FolderE2EIcon}
            alt='folder'
            className='size-4'
          />
        ) : (
          <img
            src={treeType === 'test-cases' ? FileIcon : FileE2EIcon}
            alt='file'
            className='ml-6 size-4'
          />
        )}

        <span className='text-nowrap base-font'>{data.name}</span>
      </span>
    </div>
  )

  return (
    <li className='cursor-pointer'>
      {!isFolder && !noSelection ? (
        <Draggable draggableId={data.id} index={index}>
          {(provided, snapshot) => (
            <>
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  ...provided.draggableProps.style,
                  opacity: snapshot.isDragging ? 0.7 : 1,
                }}
                className={`transition-all duration-200 ${
                  snapshot.isDragging ? 'shadow-md' : ''
                }`}
              >
                {content}
              </div>
              {snapshot.isDragging && (
                <div className='opacity-50 bg-[#F5F5FF] border border-dashed border-[#EBEBFF]'>
                  {content}
                </div>
              )}
            </>
          )}
        </Draggable>
      ) : (
        <Droppable droppableId={data.id}>
          {(provided, snapshot) => (
            <div>
              {content}
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`transition-colors duration-200 min-h-[2px] ${
                  snapshot.isDraggingOver ? 'bg-[#F5F5FF]' : ''
                }`}
              >
                {isOpen && data.nodes && (
                  <ul>
                    {data.nodes.map((node, idx) => (
                      <TreeItem
                        key={node.id}
                        data={node}
                        level={level + 1}
                        noSelection={noSelection}
                        treeType={treeType}
                        index={idx}
                      />
                    ))}
                  </ul>
                )}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      )}
    </li>
  )
}

interface TreeProps {
  data: Node
  noSelection: boolean
  treeType: TreeType
  onTreeUpdate?: (newData: Node) => void
}

function Tree({ data, noSelection, treeType, onTreeUpdate }: TreeProps) {
  const { selectedItem, setSelectedItem } = useTreeState()

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result

    if (!destination || !onTreeUpdate) return

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    let newTree = JSON.parse(JSON.stringify(data))

    const draggedNode = findNodeById(newTree, draggableId)
    const destinationFolder = findNodeById(newTree, destination.droppableId)

    if (!draggedNode || !destinationFolder) return

    // Initialize nodes array if it doesn't exist
    if (destinationFolder.nodes === undefined) {
      destinationFolder.nodes = []
    }

    // Ensure we're only dragging files
    if (draggedNode.nodes !== undefined) {
      console.warn('Can only drag files')
      return
    }

    newTree = removeNodeById(newTree, draggableId)
    newTree = insertNodeInto(
      newTree,
      draggedNode,
      destination.droppableId,
      destination.index
    )

    // Update selected item if the destination folder is currently selected
    if (selectedItem && selectedItem.id === destination.droppableId) {
      const updatedSelectedFolder = findNodeById(
        newTree,
        destination.droppableId
      )
      if (updatedSelectedFolder) {
        setSelectedItem(updatedSelectedFolder)
      }
    }

    onTreeUpdate(newTree)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className='h-full flex flex-col overflow-hidden'>
        <Droppable droppableId={data.id}>
          {(provided) => (
            <ul
              className='flex-1 overflow-y-auto w-full overflow-x-auto'
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                padding: '12px',
                minHeight: '100%',
              }}
            >
              {data.nodes?.map((node, index) => (
                <TreeItem
                  key={node.id}
                  data={node}
                  level={0}
                  noSelection={noSelection}
                  treeType={treeType}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  )
}

export default Tree
