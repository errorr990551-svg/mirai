import fs from 'fs';

let content = fs.readFileSync('c:/Users/amity/OneDrive/Desktop/mirai/frontend/src/data/products.js', 'utf-8');

// Category Aliases mapping
const categoryAliasMap = {
  'igbts': 'mosfet-transistor',
  'microcontrollers': 'microcontroller',
  'diodes-rectifiers': 'transistor',
  'transistors': 'transistor',
  'optocouplers': 'transistor',
  'passive-components': 'electronic-components'
};

// Check if category alias helper is already injected
if (!content.includes('categoryAliasMap')) {
  const replacement = `
export const categoryAliasMap = ${JSON.stringify(categoryAliasMap, null, 2)};

export const getCategoryById = (id) => {
  const targetId = categoryAliasMap[id] || id;
  return categories.find(c => c.id === targetId || c.slug === targetId || c.id === id || c.slug === id);
};
`;

  content = content.replace(/export const getCategoryById = \(id\) => categories\.find\(c => c\.id === id \|\| c\.slug === id\);/, replacement);
  fs.writeFileSync('c:/Users/amity/OneDrive/Desktop/mirai/frontend/src/data/products.js', content, 'utf-8');
  console.log('Successfully patched getCategoryById in products.js');
} else {
  console.log('Category alias map already present in products.js');
}
