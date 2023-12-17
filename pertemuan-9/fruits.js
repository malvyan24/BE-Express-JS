/**
 * TODO:1
 * -buat array yang berisi data buah
 * refactor variable ke ES6 variable
 */

//todo2 : export variable fruits

// fruits.js

class FruitsList {
constructor() {
this.fruits = ["Jeruk", "Apel", "Durian"];
}

index() {
console.log("Method index - Menampilkan data buah");
this.fruits.forEach((fruit) => console.log(fruit));
console.log("==================================");
}

store(newFruit) {
console.log("Method store - Menambahkan buah " + newFruit);
this.fruits.push(newFruit);
this.index();
}

update(index, updatedFruit) {
console.log(
"Method update - Update data " + index + " menjadi " + updatedFruit
);
if (index >= 0 && index < this.fruits.length) {
this.fruits[index] = updatedFruit;
this.index();
} else {
console.log("Index tidak valid");
}
}

destroy(index) {
console.log("Method destroy - Menghapus data " + index);
if (index >= 0 && index < this.fruits.length) {
this.fruits.splice(index, 1);
this.index();
} else {
console.log("Index tidak valid");
}
}
}

module.exports = FruitsList;
