/**
 * Todo 9:
 * - import semua method dari fruitsController.js
 * - Reactory variable fruitsController ke ES6 variable\
 * 
 *  hint: gunakan object destructuring
 */


/**
 * NOTES:
 * -fungsi main tidak perlu diubah
 * - jalan kan dengan perintah node app.js
 */

// app.js

const FruitsController = require('./FruitsController');

console.log('→ task git: (pertemuan-9)');

const fruitsController = new FruitsController();

fruitsController.index();
fruitsController.store('Pisang');
fruitsController.update(0, 'Kelapa');
fruitsController.destroy(0);


