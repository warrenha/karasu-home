import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react';

import ServiceList from '@/components/ServiceList';

// Delete me - Comment to trigger github action v2

// - - - - - Tests - - - - - //

describe('ServiceList component', () => {
    it('renders the service list', () => {
        render(<ServiceList />)
        //expect(screen.getByText(/User interface design/)).toBeInTheDocument()  // js-dom
        screen.getByText(/User interface design/);
    })

    it('component can be found by data-id attribute', () => {
        render(<ServiceList />)
        screen.getByTestId('ServiceList Card')
    })
});
