import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from './useAuthStore';

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.getState().clearToken();
  });

  it('initializes with null token', () => {
    expect(useAuthStore.getState().token).toBeNull();
  });

  it('sets token correctly', () => {
    useAuthStore.getState().setToken('sample-jwt-token');
    expect(useAuthStore.getState().token).toBe('sample-jwt-token');
  });

  it('clears token properly', () => {
    useAuthStore.getState().setToken('sample-jwt-token');
    useAuthStore.getState().clearToken();
    expect(useAuthStore.getState().token).toBeNull();
  });
});
