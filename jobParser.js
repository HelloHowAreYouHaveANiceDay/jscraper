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
  return text.job_description.toLowerCase().includes("archicad");
};

const hasSketchUp = (text) => {
  return text.job_description.toLowerCase().includes("sketchup");
};

const has3DMax = (text) => {
  return (
    text.job_description.toLowerCase().includes("3d max") |
    text.job_description.toLowerCase().includes("3ds max") |
    text.job_description.toLowerCase().includes("3-d studio max")
  );
};

const hasNewForma = (text) => {
  return text.job_description.toLowerCase().includes("newforma");
};

const hasEnscape = (text) => {
  return text.job_description.toLowerCase().includes("enscape");
};

const hasVectorworks = (text) => {
  return text.job_description.toLowerCase().includes("vectorworks");
};

const hasAdobe = (text) => {
  return (
    text.job_description.toLowerCase().includes("adobe creative suite") |
    text.job_description.toLowerCase().includes("adobe csuite")
  );
};

const hasHandSketch = (text) => {
  return text.job_description.toLowerCase().includes("hand sketch");
};

const hasPhyModel = (text) => {
  return text.job_description.toLowerCase().includes("physical model");
};

const hasBlueBeam = (text) => {
  return text.job_description.toLowerCase().includes("bluebeam");
};

const hasGsuite = (text) => {
  return (
    text.job_description.toLowerCase().includes("google suite") |
    text.job_description.toLowerCase().includes("gsuite")
  );
};

const hasOffice = (text) => {
  return (
    text.job_description.toLowerCase().includes("ms office") |
    text.job_description.toLowerCase().includes("microsoft office suite")
  );
};

const requiresLicense = (text) => {
  return (
    text.job_description.toLowerCase().includes("licensed architect") |
    text.job_description.toLowerCase().includes("aia license")
  );
};

const salaryRange = (text) => {
  const salary_range = text.salary_range;
  if (salary_range && salary_range.includes("hour")) {
    return null;
  }
  if (salary_range) {
    const parts = salary_range.split(" - ");
    if (parts[0] && parts[1]) {
      const low = parseInt(
        parts[0].replace("$", "").replace(" a year", "").replace(",", "")
      );
      const high = parseInt(
        parts[1].replace("$", "").replace(" a year", "").replace(",", "")
      );
      return [low, high];
    }
    return null;
  }
  return null;
};

const mapEntry = (job) => {
  const o = { ...job };
  const p = {};

  p.company_name = sanitizeString(o.company_name);
  p.company_location = sanitizeString(o.company_location);
  // p.salary_range = o.salary_range;
  p.job_title = sanitizeString(o.job_title);
  if (o.job_description) {
    p.hasRevit = hasRevit(o);
    p.hasCAD = hasCAD(o);
    p.hasRhino = hasRhino(o);
    p.hasDynamo = hasDynamo(o);
    p.requiresLicense = requiresLicense(o);
    p.hasAdobe = hasAdobe(o);
    p.hasGsuite = hasGsuite(o);
    p.hasOffice = hasOffice(o);
    p.hasBlueBeam = hasBlueBeam(o);
    p.hasArchiCAD = hasArchiCAD(o);
    p.has3DMax = has3DMax(o);
    p.hasNewforma = hasNewForma(o);
    p.hasVectorworks = hasVectorworks(o);
    p.hasGrasshopper = hasGrass(o);
  } else {
    p.hasRevit = null;
    p.hasCAD = null;
    p.hasRhino = null;
    p.hasDynamo = null;
    p.requiresLicense = null;
    p.hasAdobe = null;
    p.hasGsuite = null;
    p.hasOffice = null;
    p.hasBlueBeam = null;
    p.hasArchiCAD = null;
    p.has3DMax = null;
    p.hasNewforma = null;
    p.hasVectorworks = null;
    p.hasGrasshopper = null;
  }
  const range = salaryRange(o);
  if (range) {
    p.salaryLow = range[0];
    p.salayHigh = range[1];
  } else {
    p.salaryLow = null;
    p.salayHigh = null;
  }
  return p;
};

const percentOf = (list) => {
  const total = list.length;
  return {
    pctRevit: list.filter((l) => l.hasRevit).length / total,
    pctCAD: list.filter((l) => l.hasCAD).length / total,
    pctRhino: list.filter((l) => l.hasRhino).length / total,
    pctDynamo: list.filter((l) => l.hasDynamo).length / total,
    pctLicense: list.filter((l) => l.requiresLicense).length / total,
    pctAdobe: list.filter((l) => l.hasAdobe).length / total,
    pctGSuite: list.filter((l) => l.hasGsuite).length / total,
    pctMsOffice: list.filter((l) => l.hasOffice).length / total,
    pctBlueBeam: list.filter((l) => l.hasBlueBeam).length / total,
    pctArchiCAD: list.filter((l) => l.hasArchiCAD).length / total,
    pct3DMax: list.filter((l) => l.has3DMax).length / total,
    pctNewforma: list.filter((l) => l.hasNewforma).length / total,
    pctVectorworks: list.filter((l) => l.hasVectorworks).length / total,
    pctGrasshopper: list.filter((l) => l.hasGrasshopper).length / total,
    pctWithSalary: list.filter((l) => l.salaryRange).length / total,
  };
};

module.exports = {
  mapEntry,
};

function sanitizeString(str) {
  str = str.replaceAll(",", "").replaceAll("\n", "");
  str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
  return str;
  // return str.trim();
}
