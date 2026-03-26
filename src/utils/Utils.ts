/* - - - - - String - - - - - //

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

/* - - - - - Object - - - - - //

/*
 * If an object and not null.
 */
export const isObject = <T extends object>(o: any): o is T => (
    typeof o === 'object' && o !== null
)
