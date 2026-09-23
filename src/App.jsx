import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import NoCodeDashboard from './NoCodeDashboard'
import DashboardBuilder from './DashboardBuilder'
import GrapesJSBuilder from './EditorPage'
import ParentComponent from './ParentComponent'
import ToggleComponent from './ParentComponent'
import LocalStorageComp from './LocalStorageComp'
// import SearchComponent from './Typeahead'
import SearchComponent from './TypeaheadwithCustomHooks'
import FileExplorerPattern from './components/FileExplorerPattern'
import TodoApp from './todos/TodoApp'
import TodoWithReducer from './todos/TodoWithReducer'
import Terminal from './terminalpage'
import TypeheadContainer from './pages/Problem_Typeahead/TypeheadContainer'
import TableJson from './pages/table_json/TableJson'
import NestedComment from './pages/nested_comment/NestedComment'
import InfiniteScroll from './pages/infinite_scroll/InfiniteScroll'
import CounterUsingUseReducer from './pages/counter_using_useReducer/CounterUsingUseReducer'
import AdvanceCounterUsingUseReducer from './pages/advance_counter_using_useReducer/AdvanceCounterUsingUseReducer'
import MainReduxCounter from './pages/counter_using_redux/MainReduxCounter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <NoCodeDashboard /> */}
      {/* <DashboardBuilder /> */}
      {/* <GrapesJSBuilder /> // here we have no code ui screen  */}
      {/* <PreviousComponent /> */}
      {/* <ToggleComponent /> */}
      {/* <LocalStorageComp /> */}
      {/* <SearchComponent /> */}
      {/* <FileExplorerPattern /> */}
      {/* <TodoApp /> */}
      {/* <TodoWithReducer/> */}
      {/* <Terminal /> */}
      {/* <TypeheadContainer /> */}
      {/* <TableJson /> */}
      {/* <NestedComment /> */}
      {/* <InfiniteScroll /> */}
      {/* <CounterUsingUseReducer /> */}
      {/* <AdvanceCounterUsingUseReducer /> */}
      {/* <MainReduxCounter /> */}
      {/* <div className="min-h-screen bg-blue-900 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-red-900">
          Tailwind v4 Working
        </h1>
      </div> */}
    </>
  )
}

export default App
