import Dashboard from './components/Dashboard'
import Header from './shared-component/Header'

const App = () => {
  return (
    <div>
      <Header />
      <div className=' h-10 bg-linear-to-b from-[#DEF3FB] to-[#F4F6F9]' />
      <Dashboard />
    </div>
  )
}

export default App
