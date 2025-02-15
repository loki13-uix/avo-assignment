import { create } from 'zustand'
import { TreeNode } from '../components/tree-area/sections/data/test-cases'

type SelectionState = {
  selectedItem: {
    type: 'file' | 'folder'
    item: TreeNode | null
  }
  setSelectedItem: (selectedItem: {
    type: 'file' | 'folder'
    item: TreeNode | null
  }) => void
}

const useSelectionStore = create<SelectionState>((set) => ({
  selectedItem: {
    type: 'file',
    item: null,
  },
  setSelectedItem: (selectedItem) => set({ selectedItem }),
}))

export default useSelectionStore
