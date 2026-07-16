import { categories } from '../src/data/products.js';
console.log('Categories in products.js:');
categories.forEach(c => {
  console.log(`- Slug: ${c.slug}, Name: ${c.name}`);
});
