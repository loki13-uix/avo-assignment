import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import Main from './components/main'
import TreeArea from './components/tree-area'
import useSelectionStore from './store/selection'
import useTreeStore from './store/tree'
import { TreeNode } from './components/tree-area/sections/data/test-cases'
import {
  findNodeById,
  insertNodeInto,
  isDroppable,
  removeNodeById,
} from './utils/tree'

function App() {
  const setSelectedItems = useSelectionStore((state) => state.setSelectedItems)
  const setTree = useTreeStore((state) => state.setTree)
  const tree = useTreeStore((state) => state.tree)
  const selectedItem = useSelectionStore((state) => state.selectedItem)
  const setSelectedItem = useSelectionStore((state) => state.setSelectedItem)
  const setLastClickedItem = useSelectionStore(
    (state) => state.setLastClickedItem
  )

  function onTreeUpdate(newTree: TreeNode) {
    setTree(newTree)
  }

  function handleDragEndInFolder(result: DropResult) {
    const { source, destination, draggableId } = result

    if (!destination || !onTreeUpdate) return

    // Make sure we cannot drop to the same folder
    const destinationReformatted = destination.droppableId.split('-')[1]

    const sourceFolder = findNodeById(tree, source.droppableId)
    const destinationFolder = findNodeById(tree, destinationReformatted)

    if (!sourceFolder || !destinationFolder) return

    if (sourceFolder.id === destinationFolder.id) return

    // Means we can drop to that folder, so we need to remove the node from the source folder and insert it into the destination folder
    let newTree = JSON.parse(JSON.stringify(tree))
    const draggedIds = draggableId.split(',')

    for (const id of draggedIds) {
      const draggedNode = findNodeById(newTree, id)
      if (!draggedNode) continue

      if (!isDroppable(destinationFolder)) {
        console.warn('Invalid drop target')
        continue
      }

      if (draggedNode.nodes !== undefined) {
        console.warn('Can only drag files')
        continue
      }

      newTree = removeNodeById(newTree, id)
      newTree = insertNodeInto(
        newTree,
        draggedNode,
        destinationFolder.id,
        destination.index
      )
    }

    if (selectedItem.type === 'folder' && selectedItem.item?.id) {
      const newSelectedItem = findNodeById(newTree, selectedItem.item.id)
      if (newSelectedItem)
        setSelectedItem({ type: 'folder', item: newSelectedItem })
    }

    setSelectedItems([])
    setLastClickedItem(null)
    onTreeUpdate(newTree)
  }

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result

    if (!destination || !onTreeUpdate) return

    if (destination.droppableId.startsWith('folder-')) {
      return handleDragEndInFolder(result)
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    let newTree = JSON.parse(JSON.stringify(tree))
    const draggedIds = draggableId.split(',')

    // Handle multiple items
    for (const id of draggedIds) {
      const draggedNode = findNodeById(newTree, id)
      const destinationFolder = findNodeById(newTree, destination.droppableId)

      if (!draggedNode || !destinationFolder) continue

      if (!isDroppable(destinationFolder)) {
        console.warn('Invalid drop target')
        continue
      }

      if (draggedNode.nodes !== undefined) {
        console.warn('Can only drag files')
        continue
      }

      newTree = removeNodeById(newTree, id)
      newTree = insertNodeInto(
        newTree,
        draggedNode,
        destination.droppableId,
        destination.index
      )
    }

    // Clear selection after drag
    setSelectedItems([])
    setLastClickedItem(null)

    // Update the tree
    onTreeUpdate(newTree)
  }

  return (
    <div className='w-screen h-screen flex font-open-sans'>
      <DragDropContext onDragEnd={handleDragEnd}>
        <TreeArea />
        <Main />
      </DragDropContext>
    </div>
  )
}

export default App
