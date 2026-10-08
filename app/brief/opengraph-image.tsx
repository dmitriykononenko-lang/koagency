import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Онлайн-бриф на внедрение amoCRM / Kommo — ko:agency';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0505 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Red glow spot */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -200,
            width: 700,
            height: 700,
            background: 'radial-gradient(circle, rgba(230,0,0,0.35) 0%, rgba(230,0,0,0) 70%)',
            display: 'flex',
          }}
        />
        {/* Second subtle glow */}
        <div
          style={{
            position: 'absolute',
            bottom: -150,
            left: -150,
            width: 500,
            height: 500,
            background: 'radial-gradient(circle, rgba(230,0,0,0.18) 0%, rgba(230,0,0,0) 70%)',
            display: 'flex',
          }}
        />

        {/* Content wrapper */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '72px 80px',
            width: '100%',
            height: '100%',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Top row: logo + badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  background: '#E60000',
                  borderRadius: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 36,
                  fontWeight: 800,
                  color: 'white',
                  letterSpacing: '-0.02em',
                }}
              >
                ko:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.01em' }}>
                  ko:agency
                </span>
                <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>
                  интегратор amoCRM / Kommo
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 22px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 999,
                fontSize: 18,
                color: 'rgba(255,255,255,0.8)',
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  background: '#E60000',
                  borderRadius: '50%',
                  display: 'flex',
                }}
              />
              онлайн-бриф
            </div>
          </div>

          {/* Main title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h1
              style={{
                fontSize: 92,
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span>Бриф на внедрение</span>
              <span style={{ color: '#E60000' }}>amoCRM / Kommo</span>
            </h1>
            <p
              style={{
                fontSize: 28,
                color: 'rgba(255,255,255,0.75)',
                lineHeight: 1.3,
                margin: 0,
                maxWidth: 900,
              }}
            >
              8 секций · 10–15 минут. Ответы автоматически попадают в сделку CRM — созвон будет сразу по сути.
            </p>
          </div>

          {/* Bottom row: pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {['200+ внедрений', '9 лет на рынке', 'Партнёр amoCRM / Kommo'].map((label) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 24px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 999,
                  fontSize: 20,
                  color: 'white',
                }}
              >
                {label}
              </div>
            ))}
            <div style={{ flex: 1 }} />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 22,
                color: 'rgba(255,255,255,0.6)',
                fontWeight: 500,
              }}
            >
              koagency.me/brief
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
