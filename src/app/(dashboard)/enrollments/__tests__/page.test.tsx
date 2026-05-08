import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EnrollmentsPage from '../page';
import { renderWithProviders } from '@/test-utils';

describe('Enrollments Feature', () => {
  it('renders enrollments page and fetches data', async () => {
    renderWithProviders(<EnrollmentsPage />);
    
    // Check initial loading state
    // We might have a loading skeleton or just PageHeader
    expect(screen.getByText('Enrollments')).toBeInTheDocument();
    
    // Wait for the mocked API data to be fetched and rendered
    // The msw handler mock (src/mocks/handlers/enrollments.ts) returns mock enrollments.
    // Assuming the mock data has an enrollment with a specific name or enrollmentNo
    await waitFor(() => {
      // Look for the "Student Name" header to ensure table is rendered
      expect(screen.getByText('Student Name')).toBeInTheDocument();
    }, { timeout: 3000 });

    // Since we don't know the exact names from faker, we can just assert that the table body is present
    // and there are rows or at least no "No enrollments found"
    expect(screen.queryByText('No enrollments found')).not.toBeInTheDocument();
  });
});
