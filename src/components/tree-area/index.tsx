import TestCasesSection from './sections/test-cases'
import E2ESection from './sections/e-2-e'

function TreeArea() {
  return (
    <div className='w-1/4 h-screen tree-area-shadow flex flex-col'>
      <TestCasesSection />
      <E2ESection />
    </div>
  )
}

export default TreeArea
