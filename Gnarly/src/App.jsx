import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Assignments } from './pages/Assignments'
import { CourseView } from './pages/CourseView'
import { MyCourses } from './pages/MyCourses'
import Layout from './Layout'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}> 
          <Route path="/" element={<Navigate to="/my-courses" replace />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/course/:courseId" element={<CourseView />} />
          <Route path="*" element={<Navigate to="/my-courses" replace />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
