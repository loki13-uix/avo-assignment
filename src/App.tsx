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

  function onTreeUpdate(newTree: TreeNode) {
    setTree(newTree)
  }

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result

    if (!destination || !onTreeUpdate) return

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
