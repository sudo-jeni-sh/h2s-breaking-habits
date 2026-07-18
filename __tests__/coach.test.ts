jest.mock('@mistralai/mistralai', () => ({
  Mistral: jest.fn().mockImplementation(() => ({
    chat: {
      complete: jest.fn()
    }
  }))
}));

import { POST } from '../app/api/coach/route';
import { NextRequest } from 'next/server';

describe('Mindful Space Framework - Advanced Cloud Route Integrity', () => {
  it('should cleanly expose production endpoints', () => {
    expect(POST).toBeDefined();
    expect(typeof POST).toBe('function');
  });

  it('should strictly reject malformed incoming browser payloads', async () => {
    const brokenPayload = new NextRequest('http://localhost:3000/api/coach', {
      method: 'POST',
      body: JSON.stringify({ message: 12345 })
    });

    const res = await POST(brokenPayload);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data).toHaveProperty('error');
  });
});
