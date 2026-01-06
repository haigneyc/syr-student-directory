import { ImageResponse } from 'next/og';
import { getDealBySlug } from '@/lib/data';

export const runtime = 'edge';

export const alt = 'Deal details';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const deal = getDealBySlug(params.slug);

  if (!deal) {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f9fafb',
          }}
        >
          <div style={{ fontSize: 48, color: '#6b7280' }}>Deal not found</div>
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '40px 60px',
            backgroundColor: '#ea580c',
            backgroundImage: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 48 }}>🍊</span>
            <span style={{ fontSize: 28, color: 'white', fontWeight: 600 }}>
              Cuse Student Deals
            </span>
          </div>
          <div
            style={{
              backgroundColor: 'white',
              color: '#ea580c',
              fontSize: 36,
              fontWeight: 700,
              padding: '12px 24px',
              borderRadius: 12,
            }}
          >
            {deal.discount_value}
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '60px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 16,
            }}
          >
            <span style={{ fontSize: 36 }}>{deal.category.icon}</span>
            <span style={{ fontSize: 24, color: '#6b7280' }}>
              {deal.category.name}
            </span>
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: '#111827',
              marginBottom: 16,
            }}
          >
            {deal.business.name}
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#374151',
              lineHeight: 1.4,
            }}
          >
            {deal.title}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px 60px',
            backgroundColor: '#f9fafb',
            borderTop: '1px solid #e5e7eb',
          }}
        >
          <div style={{ fontSize: 20, color: '#6b7280' }}>
            Syracuse University Student Discount
          </div>
          {deal.is_verified && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                color: '#16a34a',
                fontSize: 20,
              }}
            >
              ✓ Verified
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
