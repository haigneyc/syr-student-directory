import { formatDate, getRelativeTime, slugify, cn } from '../utils';

describe('formatDate', () => {
  it('returns "Not verified" for null input', () => {
    expect(formatDate(null)).toBe('Not verified');
  });

  it('formats a valid date string', () => {
    // Use a time in the middle of the day to avoid timezone issues
    const result = formatDate('2024-01-15T12:00:00Z');
    expect(result).toMatch(/Jan 1[45], 2024/);
  });

  it('returns a formatted date (not null)', () => {
    const result = formatDate('2024-12-25T12:00:00Z');
    expect(result).toMatch(/Dec 2[45], 2024/);
  });
});

describe('getRelativeTime', () => {
  const now = new Date();

  it('returns "Today" for current date', () => {
    const result = getRelativeTime(now.toISOString());
    expect(result).toBe('Today');
  });

  it('returns "Yesterday" for previous day', () => {
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const result = getRelativeTime(yesterday.toISOString());
    expect(result).toBe('Yesterday');
  });

  it('returns days ago for dates within a week', () => {
    const threeDaysAgo = new Date(now);
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const result = getRelativeTime(threeDaysAgo.toISOString());
    expect(result).toBe('3 days ago');
  });

  it('returns weeks ago for dates within a month', () => {
    const twoWeeksAgo = new Date(now);
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    const result = getRelativeTime(twoWeeksAgo.toISOString());
    expect(result).toBe('2 weeks ago');
  });

  it('returns months ago for dates within a year', () => {
    const twoMonthsAgo = new Date(now);
    twoMonthsAgo.setDate(twoMonthsAgo.getDate() - 60);
    const result = getRelativeTime(twoMonthsAgo.toISOString());
    expect(result).toBe('2 months ago');
  });

  it('returns years ago for older dates', () => {
    const twoYearsAgo = new Date(now);
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    const result = getRelativeTime(twoYearsAgo.toISOString());
    expect(result).toBe('2 years ago');
  });
});

describe('slugify', () => {
  it('converts text to lowercase', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('replaces spaces with hyphens', () => {
    expect(slugify('hello world')).toBe('hello-world');
  });

  it('removes special characters', () => {
    expect(slugify("King David's Restaurant")).toBe('king-davids-restaurant');
  });

  it('handles multiple spaces', () => {
    expect(slugify('hello   world')).toBe('hello-world');
  });

  it('handles multiple hyphens', () => {
    expect(slugify('hello---world')).toBe('hello-world');
  });

  it('handles empty string', () => {
    expect(slugify('')).toBe('');
  });

  it('handles numbers', () => {
    expect(slugify('15% Off Pizza')).toBe('15-off-pizza');
  });
});

describe('cn', () => {
  it('combines class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    expect(cn('foo', true && 'bar', false && 'baz')).toBe('foo bar');
  });

  it('merges Tailwind classes', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  it('handles undefined and null', () => {
    expect(cn('foo', undefined, null, 'bar')).toBe('foo bar');
  });

  it('handles arrays', () => {
    expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz');
  });
});
