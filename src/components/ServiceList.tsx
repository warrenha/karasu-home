import Card from './ui-simple/Card'
//import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const Title = 'Services (Full stack)'
const Services = [
    'User interface design and development',
    'Custom components - fast, responsive & modern styling',
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
        <Card data-id="ServicesList" title={Title} >
            { Services.map(text => (
                <div className="text-left">{text.length ? text : '\u00A0' /* &nbsp; */}</div>
            ))}
        </Card>
    )
    /*
    return (
        <Card data-id="ServicesList" className="border bg-neutral-100 border-neutral-400 shadow-[3px_3px_0_0_rgb(249,249,249)]">
            <CardHeader>
                <CardTitle>{Title}</CardTitle>
            </CardHeader>
            <CardContent>
                { Services.map(text => (
                    <div className="text-left">{text.length ? text : '\u00A0' * &nbsp; *}</div>
                ))}
            </CardContent>
        </Card>
    )
    */
}

export default ServicesList
