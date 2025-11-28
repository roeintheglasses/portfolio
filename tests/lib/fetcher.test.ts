import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import fetcher from '@/lib/fetcher';

describe('fetcher utility', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch and parse JSON correctly', async () => {
    const mockData = { foo: 'bar' };
    vi.mocked(global.fetch).mockResolvedValueOnce({
      json: () => Promise.resolve(mockData),
    } as Response);

    const result = await fetcher('/api/test');

    expect(global.fetch).toHaveBeenCalledWith('/api/test', undefined);
    expect(result).toEqual(mockData);
  });

  it('should pass request options correctly', async () => {
    const mockData = { success: true };
    const options = { method: 'POST', body: JSON.stringify({ data: 'test' }) };

    vi.mocked(global.fetch).mockResolvedValueOnce({
      json: () => Promise.resolve(mockData),
    } as Response);

    await fetcher('/api/test', options);

    expect(global.fetch).toHaveBeenCalledWith('/api/test', options);
  });

  it('should handle fetch errors', async () => {
    vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network error'));

    await expect(fetcher('/api/test')).rejects.toThrow('Network error');
  });

  it('should return typed data', async () => {
    interface TestResponse {
      id: number;
      name: string;
    }

    const mockData: TestResponse = { id: 1, name: 'test' };
    vi.mocked(global.fetch).mockResolvedValueOnce({
      json: () => Promise.resolve(mockData),
    } as Response);

    const result = await fetcher<TestResponse>('/api/test');

    expect(result.id).toBe(1);
    expect(result.name).toBe('test');
  });
});
