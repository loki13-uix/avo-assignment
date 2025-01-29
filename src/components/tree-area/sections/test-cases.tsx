import FolderIcon from '../../../assets/folder.svg'
import { useTreeState } from '../../../context/tree-state'
import Tree from '../tree'
import { Node } from './data/test-cases'
import TitleAndSearch from './title-search'
import { useState } from 'react'

function TestCasesSection() {
  const { tree, setTree } = useTreeState()
  const [treeData, setTreeData] = useState<Node>(tree)

  const handleTreeUpdate = (newData: Node) => {
    setTreeData(newData)
    setTree(newData)
  }

  return (
    <div className='w-full h-3/5 flex flex-col border-b border-border-primary'>
      <TitleAndSearch title='Test Cases' image={FolderIcon} />
      <Tree
        data={treeData}
        noSelection={false}
        treeType='test-cases'
        onTreeUpdate={handleTreeUpdate}
      />
    </div>
  )
}

export default TestCasesSection
