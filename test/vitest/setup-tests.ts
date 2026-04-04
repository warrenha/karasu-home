import { cleanup, configure } from '@testing-library/react'
import { afterEach } from 'vitest';

// - - - - - Configure Tests - - - - - //

configure({
    testIdAttribute: 'data-id'
})

/*
 * Cleanup the dom after each test. Otherwise, content added in earlier tests
 * will be still present in 'screen'.
 *   This prevents 'multiple instances found' errors when using 'getByTestId'.
 */
afterEach(() => {
    cleanup()
})
