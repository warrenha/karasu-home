import { useSystemStore } from '@/services/system/useSystemStore'
import { isArray, isNumber } from '@/utils'

/*
 * - - - - - - - - - - - - - - -
 *
 *
 * - - - - - - - - - - - - - - -
 */
const SystemSection = () => {

    // The latest system information...
    const data = useSystemStore((s) => s.latest)  // SystemInfo | null

    let texts: string[] = []
    if (isNumber(data?.main)) {
        texts.push(`Temperature: ${data.main}`)
    }
    if (isArray(data?.cores) && data.cores.length > 0) {
        let s = 'Cores '
        for (let i = 0; i < data.cores.length && i < 4; i++) {
            s += (i === 0) ? ' ' : ',  '
            s += `(${i}) ${data.cores[i]}`
        }
        texts.push(s)
    }

    return (
        <div
            data-id="SystemSection"
            className="w-full bg-white border-y-1 border-neutral-400 h-32">
            { texts.length === 0 ? (
                <div>No Data</div>
            ) : texts.map(line => (
                <div key={line} >{line}</div>
            ))}
        </div>
    )
}

export default SystemSection

