import { useTreeState } from '../../context/tree-state'
import FileView from './file-view'
import FolderView from './folder-view'

function Main() {
  const { selectionType } = useTreeState()

  return (
    <main className='w-4/5 h-screen overflow-y-auto pb-20'>
      {selectionType === 'folder' && <FolderView />}
      {selectionType === 'file' && <FileView />}
    </main>
  )
}

export default Main
