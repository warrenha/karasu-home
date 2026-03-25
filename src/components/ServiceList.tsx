import Card from './ui-simple/Card'
//import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const Title = 'Services (Full stack)'
const Services = [
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
        <div data-id="ServicesList" className="mt-10">
            <Card title={Title}>
                {Services.map(text => (
                    <div className="text-left">{text.length ? text : '\u00A0' /* &nbsp; */}</div>
                ))}
            </Card>
        </div>
    )
}

export default ServicesList
