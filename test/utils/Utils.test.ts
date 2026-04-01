import { expect, test } from 'vitest'
import { isString } from '@/utils/Utils'

// - - - - - Tests - - - - - //

test('isString returns true', () => {
    expect(isString('hello')).toBe(true)
})

test('isString returns true - empty string', () => {
    expect(isString('')).toBe(true)
})

test('isString returns false', () => {
    expect(isString(null)).toBe(false)
})
