'use strict';

const Book = require('../models/bookModel.js')

module.exports = async () => {
  try {
    const db = await Book.find({});
    if(db.length === 0) {

      const bookOne = new Book({
        title: 'Dune',
        description: 'The Spice must flow.',
        email: 'pennockjoe@gmail.com',
      });
      const bookTwo = new Book({
        title: 'Eye of the World',
        description: 'First book of the Wheel of Time series by Robert Jordan.',
        email: 'pennockjoe@gmail.com',
      });
      const bookThree = new Book({
        title: 'Elantris',
        description: 'The story of Elantris, an ancient city of magic and science and the calamity that brought the once great city to its knees.',
        email: 'pennockjoe@gmail.com',
      })

      await bookOne.save();
      await bookTwo.save();
      await bookThree.save();

      console.log('DB has been seeded');
    } else {
      // console.log('DB is already seeded');
    }
  } catch(err) {
    console.error(err);
  };
};