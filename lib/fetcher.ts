export class FetchError extends Error {
  status: number;
  info?: unknown;

  constructor(message: string, status: number, info?: unknown) {
    super(message);
    this.name = 'FetchError';
    this.status = status;
    this.info = info;
  }
}

export default async function fetcher<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);

  if (!res.ok) {
    let info: unknown;
    try {
      info = await res.json();
    } catch {
      info = await res.text();
    }
    throw new FetchError(`HTTP error ${res.status}`, res.status, info);
  }

  return res.json();
}
