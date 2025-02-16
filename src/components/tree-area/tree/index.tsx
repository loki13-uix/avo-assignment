import { useEffect, useRef, useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import ChevronDownIcon from '../../../assets/chevron-down.svg'
import FileE2EIcon from '../../../assets/file-e2e.svg'
import FileIcon from '../../../assets/file-grey.svg'
import FileIconPurple from '../../../assets/file-purple.svg'
import FolderE2EIcon from '../../../assets/folder-e2e.svg'
import FolderIcon from '../../../assets/folder.svg'
import useClickOutside from '../../../hooks/use-click-outside'
import useSelectionStore from '../../../store/selection'
import { findNodeById, isDroppable } from '../../../utils/tree'
import { TreeNode } from '../sections/data/test-cases'

type TreeType = 'test-cases' | 'e2e'

function TreeItem({
  data,
  level = 0,
  noSelection,
  treeType,
  index,
  onTreeUpdate,
  handleNameChange,
}: {
  data: TreeNode
  level?: number
  noSelection: boolean
  treeType: TreeType
  index: number
  onTreeUpdate?: (newData: TreeNode) => void
  handleNameChange: (id: string, newName: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(data.name)
  const setSelectedItem = useSelectionStore((state) => state.setSelectedItem)
  const isFolder = data.nodes !== undefined
  const canDrop = isDroppable(data)
  const [isSelected, setIsSelected] = useState(false)
  const selectedItems = useSelectionStore((state) => state.selectedItems)
  const setSelectedItems = useSelectionStore((state) => state.setSelectedItems)

  // Add ref for textarea
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  useClickOutside(textareaRef, () => {
    setIsEditing(false)
    setEditedName(data.name)
  })

  // Add useEffect to handle auto-resize
  useEffect(() => {
    if (textareaRef.current && isEditing) {
      const textarea = textareaRef.current
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight + 4}px`
    }
  }, [editedName, isEditing])

  useEffect(() => {
    if (isEditing) {
      textareaRef.current?.focus()
      textareaRef.current?.select()
    }
  }, [isEditing])

  useEffect(() => {
    setIsSelected(selectedItems.some((item) => item.id === data.id))
  }, [selectedItems, data.id])

  function hasNoFolders(nodes: TreeNode[]) {
    return nodes.every(
      (node) => node.nodes === undefined || node.nodes?.length === 0
    )
  }

  function handleClick(e: React.MouseEvent) {
    // Always stop event propagation for file clicks
    if (!isFolder) {
      e.stopPropagation()
    }

    if (noSelection) {
      if (isFolder) {
        setIsOpen(!isOpen)
      }
      return
    }

    if (isFolder) {
      if (data.nodes && hasNoFolders(data.nodes)) {
        if (isOpen) {
          setIsOpen(false)
          setSelectedItem({
            type: 'folder',
            item: null,
          })
        } else {
          setSelectedItem({
            type: 'folder',
            item: data,
          })
        }
      }
      setIsOpen(!isOpen)
    } else {
      // Handle multiple selection with Ctrl/Cmd key
      if (e.ctrlKey || e.metaKey) {
        console.log('ctrl/cmd Reached')

        // If item is already selected, remove it from selection
        if (selectedItems.some((item) => item.id === data.id)) {
          const newSelectedItems = selectedItems.filter(
            (item) => item.id !== data.id
          )
          setSelectedItems(newSelectedItems)

          // If no items left selected, clear the selected item
          if (newSelectedItems.length === 0) {
            setSelectedItem({
              type: 'file',
              item: null,
            })
          }
          return
        }

        // Only allow selection within the same parent folder
        const currentParentId = data.id.split('.').slice(0, -1).join('.')
        const canSelect =
          selectedItems.length === 0 ||
          selectedItems.every((item) => {
            const itemParentId = item.id.split('.').slice(0, -1).join('.')
            return itemParentId === currentParentId
          })

        if (canSelect) {
          const newSelectedItems = [...selectedItems, data]
          setSelectedItems(newSelectedItems)
          setSelectedItem({
            type: 'file',
            item: data,
          })

          return
        }

        console.log(canSelect, 'ctrl/cmd Reached 2')
      } else {
        // Single click without Ctrl/Cmd key - clear all selections and select only this item
        setSelectedItems([data])
        setSelectedItem({
          type: 'file',
          item: data,
        })
      }
    }
  }

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsEditing(true)
  }

  // Update handleNameChange for textarea
  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedName(e.target.value)
  }

  const handleNameSubmit = () => {
    setIsEditing(false)
    if (editedName.trim() === '') {
      setEditedName(data.name)
      return
    }

    if (editedName !== data.name && onTreeUpdate) {
      handleNameChange(data.id, editedName)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      handleNameSubmit()
    } else if (e.key === 'Escape') {
      setEditedName(data.name)
      setIsEditing(false)
    }
  }

  const content = (dragging: boolean) => (
    <div
      className={`w-full relative ${
        isSelected && !dragging ? 'bg-[#EBEBFF]' : ''
      } hover:bg-[#EBEBFF] ${dragging ? 'bg-[#605BFF] text-white p-1.5' : ''}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {dragging && isSelected && selectedItems.length > 1 && (
        <div className='absolute -top-2 -right-2 bg-white text-[#605BFF] rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium shadow-sm'>
          +{selectedItems.length - 1}
        </div>
      )}
      <div
        className={`flex gap-1.5 py-1 items-start`}
        style={{ paddingLeft: `${level * 24}px` }}
      >
        {isFolder && (
          <button className='p-1 -m-1 cursor-pointer'>
            <img
              src={ChevronDownIcon}
              onClick={(e) => {
                e.stopPropagation()
                if (!isEditing) handleClick(e)
              }}
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
            src={
              treeType === 'test-cases'
                ? dragging
                  ? FileIconPurple
                  : FileIcon
                : FileE2EIcon
            }
            alt='file'
            className='ml-6 size-4'
          />
        )}

        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={editedName}
            onChange={onInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleNameSubmit}
            className='flex-1 bg-[#F5F5FF] px-2 py-1 rounded outline-none border border-[#605BFF] min-w-0 resize-none overflow-hidden base-font-input'
            autoFocus
            rows={1}
            style={{
              minHeight: '20px',
            }}
          />
        ) : (
          <span className='base-font whitespace-pre-wrap'>{data.name}</span>
        )}
      </div>
    </div>
  )

  return (
    <li className='cursor-pointer'>
      {!isFolder && !noSelection && !isEditing ? (
        <Draggable
          draggableId={
            isSelected && selectedItems.length > 1
              ? selectedItems.map((item) => item.id).join(',')
              : data.id
          }
          index={index}
          isDragDisabled={isEditing}
        >
          {(provided, snapshot) => (
            <>
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={provided.draggableProps.style}
              >
                {content(snapshot.isDragging)}
              </div>
              {snapshot.isDragging && (
                <div className='opacity-50'>{content(false)}</div>
              )}
            </>
          )}
        </Draggable>
      ) : (
        <Droppable droppableId={data.id} isDropDisabled={!canDrop || isEditing}>
          {(provided, snapshot) => (
            <div>
              {content(false)}
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`transition-colors duration-200 min-h-[2px] ${
                  snapshot.isDraggingOver && canDrop ? 'bg-[#F5F5FF]' : ''
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
                        onTreeUpdate={(updatedNode) => {
                          if (onTreeUpdate) {
                            onTreeUpdate(updatedNode)
                          }
                        }}
                        handleNameChange={handleNameChange}
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
  data: TreeNode
  noSelection: boolean
  treeType: TreeType
  onTreeUpdate?: (newData: TreeNode) => void
}

function Tree({ data, noSelection, treeType, onTreeUpdate }: TreeProps) {
  function handleNameChange(id: string, newName: string) {
    const newTree = { ...data }

    // Find the node to update
    const nodeToUpdate = findNodeById(newTree, id)

    // Update the name
    if (nodeToUpdate) {
      nodeToUpdate.name = newName
    }

    if (onTreeUpdate) {
      onTreeUpdate(newTree)
    }
  }
  return (
    <div className='h-full flex flex-col overflow-hidden'>
      <Droppable droppableId={data.id} isDropDisabled={true}>
        {(provided) => (
          <ul
            className='flex-1 overflow-y-auto'
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
                onTreeUpdate={(updatedNode) => {
                  if (onTreeUpdate) {
                    onTreeUpdate(updatedNode)
                  }
                }}
                handleNameChange={handleNameChange}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  )
}

export default Tree
