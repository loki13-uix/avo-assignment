import { useTreeState } from '../../context/tree-state'
import MainNavbar from './navbar'
import Table from './table'
import FileIcon from '../../assets/file-grey.svg'

const tableData = [
  {
    id: 1,
    name: 'First name',
    action: 'Set Text',
    inputValue: 'John',
    outputValue: '',
  },
  {
    id: 2,
    name: 'Last name',
    action: 'Set Text',
    inputValue: 'Doe',
    outputValue: '',
  },
  {
    id: 3,
    name: 'Username',
    action: 'Set Text',
    inputValue: 'johndoe',
    outputValue: '',
  },
  {
    id: 4,
    name: 'Password',
    action: 'Set Text',
    inputValue: '**************',
    outputValue: '',
  },
]

function FileView() {
  const { selectedItem } = useTreeState()

  if (!selectedItem) return null

  const FileName = selectedItem.name

  const tablesArr = [1, 2, 3]

  return (
    <div className='w-full h-full flex flex-col mb-10'>
      <MainNavbar title={FileName} image={FileIcon} />
      {tablesArr.map((item) => (
        <Table
          data={tableData}
          title='SignUp - 4steps'
          isLastTable={item === tablesArr.length}
        />
      ))}
    </div>
  )
}

export default FileView
