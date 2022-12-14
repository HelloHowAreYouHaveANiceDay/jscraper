
// modeling software
const hasRevit = (text) => {
  return text.job_description.toLowerCase().includes("revit");
};

const hasCAD = (text) => {
  return text.job_description.toLowerCase().includes("autocad");
};

const hasRhino = (text) => {
  return text.job_description.toLowerCase().includes("rhino");
};

const hasGrass = (text) => {
    return text.job_description.toLowerCase().includes("grasshopper");
  };

const hasDynamo = (text) => {
  return text.job_description.toLowerCase().includes("dynamo");
};

const hasArchiCAD = (text) => {
    return text.job_description.toLowerCase().includes('archicad')
}

const hasSketchUp = (text) => {
    return text.job_description.toLowerCase().includes('sketchup')
}

const has3DMax = (text) => {
    return text.job_description.toLowerCase().includes('3d max') |
    text.job_description.toLowerCase().includes('3ds max') |
    text.job_description.toLowerCase().includes('3-d studio max')
}

const hasNewForma = (text) => {
    return text.job_description.toLowerCase().includes('newforma')
}

const hasEnscape = (text) => {
    return text.job_description.toLowerCase().includes('enscape')
}

const hasVectorworks = (text) => {
    return text.job_description.toLowerCase().includes('vectorworks')
}

const hasAdobe = (text) => {
  return (
    text.job_description.toLowerCase().includes("adobe creative suite") |
    text.job_description.toLowerCase().includes("adobe csuite")
  );
};

const hasHandSketch = (text) => {
    return text.job_description.toLowerCase().includes('hand sketch')
}

const hasPhyModel = (text) => {
    return text.job_description.toLowerCase().includes('physical model')
}

const hasBlueBeam = (text) => {
  return  text.job_description.toLowerCase().includes('bluebeam')
}

const hasGsuite = (text) => {
    return text.job_description.toLowerCase().includes("google suite") |
    text.job_description.toLowerCase().includes('gsuite')
}

const hasOffice = (text) => {
    return text.job_description.toLowerCase().includes('ms office') |
    text.job_description.toLowerCase().includes('microsoft office suite')
}

const requiresLicense = (text) => {
  return text.job_description.toLowerCase().includes("licensed architect") |
  text.job_description.toLowerCase().includes('aia license');
};

const mapEntry = (job) => {
  const o = { ...job };
  o.hasRevit = hasRevit(o);
  o.hasCAD = hasCAD(o);
  o.hasRhino = hasRhino(o);
  o.hasDynamo = hasDynamo(o);
  o.requiresLicense = requiresLicense(o);
  o.hasAdobe = hasAdobe(o);
  o.hasGsuite = hasGsuite(o);
  o.hasOffice = hasOffice(o);
  o.hasBlueBeam = hasBlueBeam(o);
  o.hasArchiCAD = hasArchiCAD(o);
  o.has3DMax = has3DMax(o);
  o.hasNewforma = hasNewforma(o);
  o.hasVectorworks = hasVectorworks(o);
  o.hasGrasshopper = hasGrass(o)
  return o;
};

const percentOf = (list) => {
  const total = list.length;
  return {
    pctRevit: list.filter((l) => l.hasRevit).length / total,
    pctCAD: list.filter((l) => l.hasCAD).length / total,
    pctRhino: list.filter((l) => l.hasRhino).length / total,
    pctDynamo: list.filter((l) => l.hasDynamo).length / total,
    pctLicense: list.filter((l) => l.requiresLicense).length / total,
    pctAdobe: list.filter((l) => l.hasAdobe).length/total,
    pctGSuite: list.filter((l) => l.hasGsuite).length/total,
    pctMsOffice: list.filter((l) => l.hasOffice).length/total,
    pctBlueBeam: list.filter((l) => l.hasBlueBeam).length/total,
    pctArchiCAD: list.filter((l) => l.hasArchiCAD).length/total,
    pct3DMax: list.filter((l) => l.has3DMax).length/total,
    pctNewforma: list.filter((l) => l.hasNewforma).length/total,
    pctVectorworks: list.filter((l) => l.hasVectorworks).length/total,
    pctGrasshopper: list.filter((l) => l.hasGrasshopper).length/total
  };
};
