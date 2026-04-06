import { describe, it/*, expect*/ } from 'vitest'
import { render, screen } from '@testing-library/react';

import { App } from '@/components/App/App';

// - - - - - Tests - - - - - //

// Error: Error creating WebGL context.
describe.skip('App component', () => {
    it('Renders the heading', async () => {
        render(<App />);
        //expect(screen.getByText(/Vite \+ React/i)).toBeInTheDocument();

        screen.getByText(/Vite \+ React/i)
    })
})
