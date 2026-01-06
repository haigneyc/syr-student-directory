import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Cuse Student Deals - Syracuse University Student Discounts';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ea580c',
          backgroundImage: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <span style={{ fontSize: 80 }}>🍊</span>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: 'white',
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          Cuse Student Deals
        </div>
        <div
          style={{
            fontSize: 32,
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
            maxWidth: 800,
          }}
        >
          Every legit student discount in Syracuse — verified, local, and updated.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
