
import { formatTimeAgo } from './utils';

describe('formatTimeAgo', () => {
  // This test will fail initially, demonstrating the bug.
  it('should return "in the future" for a future date', () => {
    const futureDate = new Date(Date.now() + 1000 * 60 * 5); // 5 minutes in the future
    expect(formatTimeAgo(futureDate)).toBe('in the future');
  });

  it('should return "just now" for a very recent past date', () => {
    const pastDate = new Date(Date.now() - 1000 * 10); // 10 seconds ago
    expect(formatTimeAgo(pastDate)).toBe('just now');
  });

  it('should return "1 minute ago" for a date 1 minute ago', () => {
    const pastDate = new Date(Date.now() - 1000 * 60);
    expect(formatTimeAgo(pastDate)).toBe('1 minute ago');
  });

    it('should return "2 minutes ago" for a date 2 minutes ago', () => {
    const pastDate = new Date(Date.now() - 1000 * 60 * 2);
    expect(formatTimeAgo(pastDate)).toBe('2 minutes ago');
  });
});
