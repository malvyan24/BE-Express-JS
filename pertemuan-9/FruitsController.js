/**
 * todo 3:
 * -import fruit dari fruits.js
 * -reaktore variable fruits ke ES6 variable
 * todo 4: buat method index

//todo 5: buat method store

//todo 6: buat method update

//todo 7: buat method destroy
 */


// FruitsController.js

const FruitsList = require('./fruits');

class FruitsController {
constructor() {
this.fruitsList = new FruitsList();
}

index() {
this.fruitsList.index();
}

store(newFruit) {
this.fruitsList.store(newFruit);
}

update(index, updatedFruit) {
this.fruitsList.update(index, updatedFruit);
}

destroy(index) {
this.fruitsList.destroy(index);
}
}

module.exports = FruitsController;
