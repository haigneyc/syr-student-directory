// Utility functions for deal expiration handling
// Can be used on both server and client

export function isDealExpired(expiresAt: string | null): boolean {
  if (!expiresAt) return false;
  return new Date(expiresAt) < new Date();
}

export function isDealExpiringSoon(
  expiresAt: string | null,
  days: number = 7
): boolean {
  if (!expiresAt) return false;
  const expirationDate = new Date(expiresAt);
  const now = new Date();
  const soonDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  return expirationDate > now && expirationDate <= soonDate;
}

export function formatExpirationDate(expiresAt: string): string {
  return new Date(expiresAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getTimeUntilExpiration(expiresAt: string): string {
  const now = new Date();
  const expiration = new Date(expiresAt);
  const diffMs = expiration.getTime() - now.getTime();

  if (diffMs <= 0) return 'Expired';

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
  }

  return `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
}
