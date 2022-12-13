


const hasRevit = (text) => {
    return text.job_description.toLowerCase().includes('revit')
}

const hasCAD = (text) => {
    return text.job_description.toLowerCase().includes('autocad')
}

const hasRhino = (text) => {
    return text.job_description.toLowerCase().includes('rhino')
}

const hasDynamo = (text) => {
    return text.job_description.toLowerCase().includes('dynamo')
}

const mapEntry = (job) => {
    const o = {...job}
    o.hasRevit = hasRevit(o);
    o.hasCAD = hasCAD(o);
    o.hasRhino = hasRhino(o);
    o.hasDynamo = hasDynamo(o);
    return o
}

const percentOf = (list) => {
    const total = list.length
    return {
        pctRevit: list.filter(l => l.hasRevit).length/total,
        pctCAD: list.filter(l=>l.hasCAD).length/total,
        pctRhino: list.filter(l=> l.hasRhino).length/total,
        pctDynamo: list.filter(l=> l.hasDynamo).length/total
    }
}
