import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react';

import { ServiceCard } from '@/components/Cards/ServiceCard';

// Delete me - Comment to trigger github action v2

// - - - - - Tests - - - - - //

describe('ServiceCard component', () => {
    it('renders the service list', () => {
        render(<ServiceCard />)
        //expect(screen.getByText(/User interface design/)).toBeInTheDocument()  // js-dom
        screen.getByText(/User interface design/);
    })

    it('Component can be found by data-id', () => {
        render(<ServiceCard />)
        screen.getByTestId('ServiceCard')
    })
});
