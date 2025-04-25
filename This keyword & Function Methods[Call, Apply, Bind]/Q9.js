function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

const original = {
    name: "Alice",
    hobbies: ["reading", "traveling"]
};

const clone = deepClone(original);
clone.hobbies.push("coding");

console.log("Original:", original);
// Output: { name: 'Alice', hobbies: [ 'reading', 'traveling' ] }

console.log("Clone:", clone);
// Output: { name: 'Alice', hobbies: [ 'reading', 'traveling', 'coding' ] }
