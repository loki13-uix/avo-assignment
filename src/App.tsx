import { useState } from 'react'
import Main from './components/main'
import TreeArea from './components/tree-area'
import { TreeStateProvider } from './context/tree-state'
import { erpTree, Node } from './components/tree-area/sections/data/test-cases'

function App() {
  const [tree, setTree] = useState<Node>(erpTree)
  const [selectionType, setSelectionType] = useState<'file' | 'folder'>('file')
  const [selectedItem, setSelectedItem] = useState<Node | null>(null)

  return (
    <div className='w-screen h-screen flex'>
      <TreeStateProvider
        tree={tree}
        setTree={setTree}
        selectionType={selectionType}
        selectedItem={selectedItem}
        setSelectionType={setSelectionType}
        setSelectedItem={setSelectedItem}
      >
        <TreeArea />
        <Main />
      </TreeStateProvider>
    </div>
  )
}

export default App
