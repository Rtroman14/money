const categories = ["Investing", "Passive Income"];

const postCategories1 = ["Investing"];
const postCategories2 = ["Budgeting"];
const postCategories3 = ["Budgeting", "Investing"];

const found1 = categories.some((r) => postCategories1.indexOf(r) >= 0);
const found2 = categories.some((r) => postCategories2.indexOf(r) >= 0);
const found3 = categories.some((r) => postCategories3.indexOf(r) >= 0);

console.log(found1);
console.log(found2);
console.log(found3);
