// - - - - - String - - - - - //

/*
 * A little more readable...
 */
export const isString = (s: any): s is string => (
    typeof s === 'string'
)

/*
 * If a string it is returned, otherwise null.
 */
export const getString = (s: any): string | null => (
    isString(s) ? s : null
)

export const firstString = (...list: any[]): string | null => {
    for (const value of list) {
        if (isString(value)) { return value; }
    }
    return null;
}

// - - - - - Number - - - - - //

export const isNumber = (n: any): n is number => (
    typeof n === 'number'
)

// - - - - - Array - - - - - //

export const isArray = (a: any): a is Array<any> => (
    Array.isArray(a)
)

/* - - - - - Object - - - - - //

/*
 * If an object and not null.
 */
export const isObject = <T extends object>(o: any): o is T => (
    typeof o === 'object' && o !== null
)
