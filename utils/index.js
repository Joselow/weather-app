const accentReplacements = {
  'á': 'a',
  'é': 'e',
  'í': 'i', 
  'ó': 'o',
  'ú': 'u', 
};



export const replaceAccents = (str) => {
  return str.replace(/[áéíóú]/g, match => accentReplacements[match]);
};
