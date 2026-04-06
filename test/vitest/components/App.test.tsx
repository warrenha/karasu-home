import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react';

import { App } from '@/components/App/App';

// - - - - - Tests - - - - - //

describe.skip('App component', () => {
    it('renders the Vite + React heading', () => {
        render(<App />);
        expect(screen.getByText(/Vite \+ React/i)).toBeInTheDocument();
    });
});
