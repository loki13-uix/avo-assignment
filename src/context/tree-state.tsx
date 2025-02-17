import { createContext, useContext } from 'react'
import { TreeNode } from '../components/tree-area/sections/data/test-cases'

type TreeState = {
  tree: TreeNode
  setTree: (tree: TreeNode) => void
  selectionType: 'file' | 'folder'
  selectedItem: TreeNode | null
  setSelectionType: (selectionType: 'file' | 'folder') => void
  setSelectedItem: (selectedItem: TreeNode | null) => void
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
  tree: TreeNode
  children: React.ReactNode
  setTree: (tree: TreeNode) => void
  selectionType: 'file' | 'folder'
  selectedItem: TreeNode | null
  setSelectionType: (selectionType: 'file' | 'folder') => void
  setSelectedItem: (selectedItem: TreeNode | null) => void
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
