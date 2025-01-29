import { useState } from 'react'
import FolderIcon from '../../../assets/folder.svg'
import Tree from '../tree'
import { erpTree } from './data/test-cases'
import TitleAndSearch from './title-search'
import { Node } from './data/test-cases'

function TestCasesSection() {
  const [treeData, setTreeData] = useState<Node>(erpTree)

  const handleTreeUpdate = (newData: Node) => {
    setTreeData(newData)
    // Optional: Persist changes to backend
    // saveTreeDataToBackend(newData)
  }

  return (
    <div className='w-full h-3/5 flex flex-col border-b border-[#DEE2E6]'>
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
