import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DashboardPage from '../page';
import { renderWithProviders } from '@/test-utils';

// Mock the auth store to return a dummy user
vi.mock('@/stores/auth-store', () => ({
  useAuthStore: vi.fn((selector) =>
    selector({
      user: { name: 'Test Admin', role: 'admin' },
    })
  ),
}));

describe('Dashboard Feature', () => {
  it('renders dashboard with stats', async () => {
    renderWithProviders(<DashboardPage />);
    
    // Check if the user name is rendered
    expect(screen.getByText('Welcome back, Test Admin')).toBeInTheDocument();
    
    // Check if stat titles are rendered
    expect(screen.getByText('Total Enrollments')).toBeInTheDocument();
    expect(screen.getByText('Active Students')).toBeInTheDocument();
    expect(screen.getByText('Exams Pending')).toBeInTheDocument();
    expect(screen.getByText('Courses')).toBeInTheDocument();
    
    // We mocked the user store, but the actual stats on the dashboard are currently hardcoded to "—"
    // and wait for backend connection in this current version. 
    // We verify the static content is rendered correctly.
    const dashes = screen.getAllByText('—');
    expect(dashes.length).toBeGreaterThan(0);
  });
});
