const services = [
  'User interface design and development',
  'Custom components - fast, responsive & clean modern styling!',
  'Data visualization using charts and maps showing data layers (GIS)',
  '',
  'Technology stack: React, TypeScript, Node.js, Express server',
  'Databases: PostgreSQL, Oracle, SQL Server'
]

/*
 * - - - - - - - - - -
 *
 * List of services provided.
 *
 * - - - - - - - - - -
 */
const ServicesList = () => {
    return (
        <div data-id="ServicesList" className="mt-10" >
            <div className="border border-neutral-300 rounded-2xl px-8 pb-4 pt-2 shadow-[3px_3px_0_0_rgb(249,249,249)]">
                <div className="border-b border-neutral-300 pb-2 text-lg font-semibold" >
                    Services (Full stack)
                </div>
                <div className="text-lg pt-4">
                    { services.map(text => (
                        <div className="text-left" >{ text.length ? text : '\u00A0'/* &nbsp; */ }</div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ServicesList
