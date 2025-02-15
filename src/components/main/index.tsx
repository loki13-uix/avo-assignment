import useSelectionStore from '../../store/selection'
import FileView from './file-view'
import FolderView from './folder-view'

function Main() {
  const { selectedItem } = useSelectionStore()

  return (
    <main className='w-3/4 h-screen overflow-y-auto pb-20'>
      {selectedItem.type === 'folder' && <FolderView />}
      {selectedItem.type === 'file' && <FileView />}
    </main>
  )
}

export default Main
