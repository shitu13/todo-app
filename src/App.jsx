
import './index.css'
import Todo from './components/Todo.jsx'

function App() {

  return (
    <>
      <div className='bg-stone-900 min-h-screen w-full flex-row'>
        <div className="container mx-auto p-4">
          {/* Your Todo List component */}
          <Todo />
        </div>

      </div>
    </>
  )
}

export default App
