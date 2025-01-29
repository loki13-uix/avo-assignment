import { createContext, useContext } from 'react'
import { Node } from '../components/tree-area/sections/data/test-cases'

type TreeState = {
  tree: Node
  setTree: (tree: Node) => void
  selectionType: 'file' | 'folder'
  selectedItem: Node | null
  setSelectionType: (selectionType: 'file' | 'folder') => void
  setSelectedItem: (selectedItem: Node | null) => void
} | null

const TreeStateContext = createContext<TreeState>(null)

const Provider = TreeStateContext.Provider

function TreeStateProvider({
  tree,
  setTree,
  children,
  selectionType,
  selectedItem,
  setSelectionType,
  setSelectedItem,
}: {
  tree: Node
  children: React.ReactNode
  setTree: (tree: Node) => void
  selectionType: 'file' | 'folder'
  selectedItem: Node | null
  setSelectionType: (selectionType: 'file' | 'folder') => void
  setSelectedItem: (selectedItem: Node | null) => void
}) {
  return (
    <Provider
      value={{
        selectionType,
        selectedItem,
        setSelectionType,
        setSelectedItem,
        tree,
        setTree,
      }}
    >
      {children}
    </Provider>
  )
}

function useTreeState() {
  const context = useContext(TreeStateContext)

  if (!context) {
    throw new Error('useTreeState must be used within a TreeStateProvider')
  }

  return context
}

export { TreeStateProvider, useTreeState }
