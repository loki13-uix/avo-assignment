import { create } from 'zustand'
import { TreeNode } from '../components/tree-area/sections/data/test-cases'

interface SelectionState {
  selectedItem: { type: string; item: TreeNode | null }
  selectedItems: TreeNode[]
  lastClickedItem: TreeNode | null
  setSelectedItem: (item: { type: string; item: TreeNode | null }) => void
  setSelectedItems: (items: TreeNode[]) => void
  setLastClickedItem: (item: TreeNode | null) => void
}

const useSelectionStore = create<SelectionState>((set) => ({
  selectedItem: { type: '', item: null },
  selectedItems: [],
  lastClickedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
  setSelectedItems: (items) => set({ selectedItems: items }),
  setLastClickedItem: (item) => set({ lastClickedItem: item }),
}))

export default useSelectionStore
