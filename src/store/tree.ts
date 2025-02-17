import { create } from 'zustand'
import {
  erpTree,
  TreeNode,
} from '../components/tree-area/sections/data/test-cases'

type TreeState = {
  tree: TreeNode
  setTree: (tree: TreeNode) => void
}

const useTreeStore = create<TreeState>((set) => ({
  tree: erpTree,
  setTree: (tree) => set({ tree }),
}))

export default useTreeStore
