import { NavLink, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <header style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderBottom: '1px solid #e5e7eb',
        position: 'sticky',
        top: 0,
        background: '#fff',
        zIndex: 10
      }}>
        <strong style={{ marginRight: '8px' }}>Gnarly</strong>
        <NavLink to="/my-courses">
          {({ isActive }) => (
            <button style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              background: isActive ? '#111827' : '#f9fafb',
              color: isActive ? '#fff' : '#111827',
              cursor: 'pointer'
            }}>My Courses</button>
          )}
        </NavLink>
        <NavLink to="/assignments">
          {({ isActive }) => (
            <button style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              background: isActive ? '#111827' : '#f9fafb',
              color: isActive ? '#fff' : '#111827',
              cursor: 'pointer'
            }}>Assignments</button>
          )}
        </NavLink>
        <NavLink to="/course/1">
          {({ isActive }) => (
            <button style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              background: isActive ? '#111827' : '#f9fafb',
              color: isActive ? '#fff' : '#111827',
              cursor: 'pointer'
            }}>Course View</button>
          )}
        </NavLink>
      </header>
      <main style={{ padding: '16px' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout


