// - - - - - Types - - - - - //

export type CpuTemperature = {
    main: number,
    max: number,
    cores: number[]
}

export type Load = {
    load: number,
    loadUser: number,
    loadSystem: number
 
}

export type CpuLoad = Load & {
    cpus: Load[]
}

export type SystemInfo = {
    cpu: CpuTemperature
    load: CpuLoad
}
