import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import NameEntry from './pages/NameEntry'
import Home from './pages/Home'
import Workouts from './pages/Workouts'
import PhasePage from './pages/PhasePage'
import DayPage from './pages/DayPage'
import FuelGoal from './pages/FuelGoal'
import FuelSetup from './pages/FuelSetup'
import FuelPreference from './pages/FuelPreference'
import FuelFoods from './pages/FuelFoods'
import FuelTracker from './pages/FuelTracker'
import FuelTarget from './pages/FuelTarget'
import Progress from './pages/Progress'
import Recovery from './pages/Recovery'
import Log from './pages/Log'
import Profile from './pages/Profile'
import BottomNav from './components/BottomNav'
import './App.css'
import MealPage from './pages/MealPage'
function Guard({ children }) {
  const ok = localStorage.getItem('ntf_auth') === 'true'
  return ok ? children : <Navigate to="/" replace />
}

function FuelEntry() {
  const setup = localStorage.getItem('ntf_fuel_setup')
  const targets = localStorage.getItem('ntf_fuel_targets')
  if (setup && targets) return <Navigate to="/fuel/tracker" replace />
  return <Navigate to="/fuel/setup" replace />
}

const SHOW_NAV = ['/home','/workouts','/fuel','/fuel/tracker','/fuel/preference','/fuel/foods','/recovery','/log','/profile','/progress']

function Layout() {
  const location = useLocation()
  const auth = localStorage.getItem('ntf_auth') === 'true'
  const showNav = auth && (
    SHOW_NAV.includes(location.pathname) ||
    location.pathname.startsWith('/workouts') ||
    location.pathname.startsWith('/fuel')
  )

  return (
    <>
      <Routes>
        <Route path="/" element={<NameEntry />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Guard><Home /></Guard>} />
        <Route path="/workouts" element={<Guard><Workouts /></Guard>} />
        <Route path="/workouts/phase/:phase" element={<Guard><PhasePage /></Guard>} />
        <Route path="/workouts/phase/:phase/week/:wk/day/:day" element={<Guard><DayPage /></Guard>} />
        <Route path="/fuel" element={<Guard><FuelEntry /></Guard>} />
        <Route path="/fuel/setup" element={<Guard><FuelSetup /></Guard>} />
        <Route path="/fuel/goal" element={<Guard><FuelGoal /></Guard>} />
        <Route path="/fuel/target" element={<Guard><FuelTarget /></Guard>} />
        <Route path="/fuel/preference" element={<Guard><FuelPreference /></Guard>} />
        <Route path="/fuel/foods" element={<Guard><FuelFoods /></Guard>} />
        <Route path="/fuel/tracker" element={<Guard><FuelTracker /></Guard>} />
        <Route path="/progress" element={<Guard><Progress /></Guard>} />
        <Route path="/recovery" element={<Guard><Recovery /></Guard>} />
        <Route path="/log" element={<Guard><Log /></Guard>} />
        <Route path="/profile" element={<Guard><Profile /></Guard>} />
        <Route path="/fuel/meal/:mealId" element={<Guard><MealPage /></Guard>} />
      </Routes>
      {showNav && <BottomNav />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}