// create a module called Library that will in turn create angular factories 
// to create a Book, Card, etc...()
angular.module('Library', [])
	.factory('Book', bookFactory);
	// .factory('Card', cardFactory);

/// Our Objects:

// A book has a unique ISBN (international standard book number), a name (maybe not necessary),
// a cover (object with title/author) and a collection of pages
function Book() {
	this.isbn = Math.floor((Math.random() * 10000) + 1);
	this.name = '';
	this.cover = new Cover("Title", "Author", "book_cover_leather.png");;
	this.pages = [new Page()];
}

Book.prototype.setName = function(name) {
	this.name = name;
}
Book.prototype.setCover = function(cover) {
	this.cover = cover;
}
Book.prototype.addPage = function(page) {
	this.pages.push(page);
}
Book.prototype.addPages = function(pages) {
	this.pages = pages;
}

// A page hold the optional text, optional image, optional VO filename
// which holds the voiceover for a page
function Page(text, imagePath, voFilename) {
	this.text 		= text || '';
	this.image 		= imagePath || '';
	this.voFilename	= voFilename || '';
}
Page.prototype.setText = function(text) {
	this.text 		= text;
}
Page.prototype.setImage = function(image) {
	this.image 		= image;
}
Page.prototype.setVoFilename = function(voFilename) {
	this.voFilename = voFilename;
}

function Cover(title, author, imageCover) {
	this.title = title;
	this.author = author;
	this.imageCover = imageCover;
}

// Our Book Factory
function bookFactory() {
	var bookFactory = {};

	bookFactory.create = function(isbn, name, cover, pages) {
		return new Book(isbn, name, cover, pages);
	}

	bookFactory.createPage = function(text, image, voFilename) {
		return new Page(text, image, voFilename);
	}

	bookFactory.createCover = function(title, author, imageCover) {
		return new Cover(title, author, imageCover);
	}

	bookFactory.createEmptyPage = function() {
		return new Page();
	}

	// eventually make DB calls to retrieve a book from a user's library
	// return an array of books - taking in an userID or libraryID
	bookFactory.retrieveBooks = function() {
		// 1st dummy up data
		var cover = new Cover("Green Eggs & Ham", "Dr. Seuss", "green-eggs-and-ham.jpg");
		var page1 = new Page("I am Sam.\nI am Sam. Sam I am.\n That Sam-I-am.\n That Sam-I-am!\n I do not like that Sam-I-am.\nDo you like green eggs and ham?", '', "StorytimeVO-1060_1.wav");
		var page2 = new Page("I do not like them, Sam-I-am.\nI do not like green eggs and ham.\nWould you like them Here or there?\nI would not like them anywhere.", '', "StorytimeVO-1060_2.wav");
		var page3 = new Page("I would not like them anywhere.\nI do not like green eggs and ham.\nI do not like them, Sam-I-Am.\nWould you like them in a house?");
		var page4 = new Page("Would you like them with a mouse?\nI do not like them in a house.\nI do not like them with a mouse.");
		var pages = [page1, page2, page3, page4];
		var book1 = new Book();
		book1.setName('Green Eggs & Ham')
		book1.setCover(cover);
		book1.addPages(pages)

		// 2nd dummy....
	 	cover = new Cover("Goodnight Moon", "Margaret Wise Brown", "goodnight-moon.jpg");
		page1 = new Page("In the great green room\nthere was a telephone\nAnd a red balloon\nAnd a picture of...\nThe cow jumping over the moon\nand there were three little bears, sitting on chairs");
	 	page2 = new Page("and two little kittens and a pair of mittens\nand a little toy house and a young mouse\nand a comb and a brush and bowl full of mush\nand a quiet old lady who was whispering hush.");
	 	pages = [page1, page2];
		book2 = new Book();
		book2.setName('Goodnight Moon')
		book2.setCover(cover);
		book2.addPages(pages)

	 	cover = new Cover("Melvin's Book", "Melvin Berger", "book_cover_leather.png");
		page1 = new Page("Book 3--There are many variations of passages of Lorem Ipsum ou are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet", 'userId/images', '');
	 	page2 = new Page("Book 3 - page 2222222 orem Ipsum available, bted humour, or vable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet", 'userId/images', '');
	 	page3 = new Page("Book 3Tpage 33333333  ble, d humvable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet", 'userId/images', '');
	 	page4 = new Page("Book 3 page 44444444 h don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet", 'userId/images', '');
	 	page5 = new Page("Book 3 last page - There are many variations of passages of Lorem Ipsum availaur, or randomised words le. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet", 'userId/images', '');
	 	pages = [page1, page2, page3, page4, page5];
		book3 = new Book();
		book3.setName('Book 3')
		book3.setCover(cover);
		book3.addPages(pages)
	
		var books = [book1, book2, book3];

		return books;
	}

	return bookFactory;
}