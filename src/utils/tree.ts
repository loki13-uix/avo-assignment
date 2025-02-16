import { TreeNode } from '../components/tree-area/sections/data/test-cases'

// Helper functions
export function findNodeById(root: TreeNode, id: string): TreeNode | null {
  if (root.id === id) return root

  if (!root.nodes) return null

  for (const node of root.nodes) {
    const found = findNodeById(node, id)
    if (found) return found
  }

  return null
}

export function removeNodeById(root: TreeNode, id: string): TreeNode {
  if (!root.nodes) return root

  root.nodes = root.nodes.filter((node) => node.id !== id)
  root.nodes = root.nodes.map((node) => removeNodeById(node, id))

  return root
}

export function insertNodeInto(
  root: TreeNode,
  nodeToInsert: TreeNode,
  parentId: string,
  index: number
): TreeNode {
  if (root.id === parentId && root.nodes) {
    root.nodes = [
      ...root.nodes.slice(0, index),
      nodeToInsert,
      ...root.nodes.slice(index),
    ]
    return root
  }

  if (!root.nodes) return root

  root.nodes = root.nodes.map((node) =>
    insertNodeInto(node, nodeToInsert, parentId, index)
  )

  return root
}

// Helper function to check if a folder has any sub-folders
export function hasSubFolders(nodes: TreeNode[] | undefined): boolean {
  if (!nodes) return false
  return nodes.some((node) => node.nodes !== undefined)
}

// Helper function to check if node is droppable
export function isDroppable(node: TreeNode): boolean {
  // A node is droppable if it's a folder (has nodes array) and has no sub-folders
  return node.nodes !== undefined && !hasSubFolders(node.nodes)
}
