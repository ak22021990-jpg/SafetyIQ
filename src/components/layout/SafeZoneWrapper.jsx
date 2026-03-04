// src/components/layout/SafeZoneWrapper.jsx
export default function SafeZoneWrapper({ children, hasTopbar = true }) {
  return (
    <div
      className="w-full overflow-hidden"
      style={{
        paddingTop:    hasTopbar ? '64px' : '0px',
        paddingBottom: '48px',
        height:        '100vh',
      }}
    >
      {children}
    </div>
  )
}
