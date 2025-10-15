import { ImageResponse } from 'next/og'

// Configuration de l'icône Apple
export const runtime = 'edge'
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// Générer l'icône Apple
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
          borderRadius: '40px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 80,
              fontWeight: 'bold',
              color: 'white',
              fontFamily: 'system-ui, sans-serif',
              letterSpacing: '-2px',
            }}
          >
            P
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: '600',
              color: 'white',
              fontFamily: 'system-ui, sans-serif',
              opacity: 0.95,
              marginTop: '-10px',
            }}
          >
            365
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
