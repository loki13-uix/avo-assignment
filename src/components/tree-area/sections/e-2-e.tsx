import TitleAndSearch from './title-search'
import E2EIcon from '../../../assets/e-2-e.svg'
import ChevronDownIcon from '../../../assets/chevron-down.svg'
import Tree from '../tree'
import { avoBankTree } from './data/e2e'

function E2ESection() {
  return (
    <div className='w-full h-2/5 flex flex-col'>
      <TitleAndSearch
        title='E2E Flows'
        image={E2EIcon}
        chevronImage={ChevronDownIcon}
      />
      <Tree data={avoBankTree} noSelection={true} treeType='e2e' />
    </div>
  )
}

export default E2ESection
