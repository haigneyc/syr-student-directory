import {
  isDealExpired,
  isDealExpiringSoon,
  formatExpirationDate,
  getTimeUntilExpiration,
} from '../expiration';

describe('isDealExpired', () => {
  it('returns false for null expiration', () => {
    expect(isDealExpired(null)).toBe(false);
  });

  it('returns true for past date', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    expect(isDealExpired(pastDate.toISOString())).toBe(true);
  });

  it('returns false for future date', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    expect(isDealExpired(futureDate.toISOString())).toBe(false);
  });

  it('returns true for a date far in the past', () => {
    expect(isDealExpired('2020-01-01T00:00:00Z')).toBe(true);
  });

  it('returns false for a date far in the future', () => {
    expect(isDealExpired('2030-01-01T00:00:00Z')).toBe(false);
  });
});

describe('isDealExpiringSoon', () => {
  it('returns false for null expiration', () => {
    expect(isDealExpiringSoon(null)).toBe(false);
  });

  it('returns false for expired deal', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    expect(isDealExpiringSoon(pastDate.toISOString())).toBe(false);
  });

  it('returns true for deal expiring in 3 days (within default 7 days)', () => {
    const soonDate = new Date();
    soonDate.setDate(soonDate.getDate() + 3);
    expect(isDealExpiringSoon(soonDate.toISOString())).toBe(true);
  });

  it('returns false for deal expiring in 10 days (outside default 7 days)', () => {
    const laterDate = new Date();
    laterDate.setDate(laterDate.getDate() + 10);
    expect(isDealExpiringSoon(laterDate.toISOString())).toBe(false);
  });

  it('respects custom days parameter', () => {
    const laterDate = new Date();
    laterDate.setDate(laterDate.getDate() + 10);
    expect(isDealExpiringSoon(laterDate.toISOString(), 14)).toBe(true);
    expect(isDealExpiringSoon(laterDate.toISOString(), 5)).toBe(false);
  });
});

describe('formatExpirationDate', () => {
  it('formats date correctly', () => {
    // Use midday to avoid timezone edge cases
    const result = formatExpirationDate('2024-12-25T12:00:00Z');
    expect(result).toMatch(/Dec 2[45], 2024/);
  });

  it('formats another date correctly', () => {
    const result = formatExpirationDate('2025-06-15T12:00:00Z');
    expect(result).toMatch(/Jun 1[45], 2025/);
  });
});

describe('getTimeUntilExpiration', () => {
  it('returns "Expired" for past dates', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    expect(getTimeUntilExpiration(pastDate.toISOString())).toBe('Expired');
  });

  it('returns days for dates more than a day away', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 3);
    const result = getTimeUntilExpiration(futureDate.toISOString());
    expect(result).toMatch(/^\d+ days?$/);
  });

  it('returns hours for dates less than a day away', () => {
    const futureDate = new Date();
    futureDate.setHours(futureDate.getHours() + 5);
    const result = getTimeUntilExpiration(futureDate.toISOString());
    expect(result).toMatch(/^\d+ hours?$/);
  });

  it('handles plural correctly for 1 day', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    futureDate.setHours(futureDate.getHours() + 1); // Ensure more than 24h
    const result = getTimeUntilExpiration(futureDate.toISOString());
    expect(result).toBe('1 day');
  });
});
