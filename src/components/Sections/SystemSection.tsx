import { useSystemStore } from '@/services/system-temps/useSystemStore'
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

    const cpu = data?.cpu || null

    let texts: string[] = []
    if (isNumber(cpu?.main)) {
        texts.push(`Temperature: ${cpu.main}`)
    }
    if (isArray(cpu?.cores) && cpu.cores.length > 0) {
        let s = 'Cores '
        for (let i = 0; i < cpu.cores.length && i < 4; i++) {
            s += (i === 0) ? ' ' : ',  '
            s += `(${i}) ${cpu.cores[i]}`
        }
        texts.push(s)
    }

    return (
        <div
            data-id="SystemSection"
            className="w-full bg-white h-32">
            { texts.length === 0 ? (
                <div>No Data</div>
            ) : texts.map(line => (
                <div key={line} >{line}</div>
            ))}
        </div>
    )
}

export default SystemSection

