import { create } from 'zustand'
import { TreeNode } from '../components/tree-area/sections/data/test-cases'

interface SelectionState {
  selectedItem: { type: string; item: TreeNode | null }
  selectedItems: TreeNode[]
  setSelectedItem: (item: { type: string; item: TreeNode | null }) => void
  setSelectedItems: (items: TreeNode[]) => void
}

const useSelectionStore = create<SelectionState>((set) => ({
  selectedItem: { type: '', item: null },
  selectedItems: [],
  setSelectedItem: (item) => set({ selectedItem: item }),
  setSelectedItems: (items) => set({ selectedItems: items }),
}))

export default useSelectionStore
