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
	this.cover = {};
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

function Cover(title, author) {
	this.title = title;
	this.author = author;
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

	bookFactory.createCover = function(title, author) {
		return new Cover(title, author);
	}

	bookFactory.createEmptyPage = function() {
		return new Page();
	}

	// eventually make DB calls to retrieve a book from a user's library
	// return an array of books - taking in an userID or libraryID
	bookFactory.retrieveBooks = function() {
		// 1st dummy up data
		var cover = new Cover("Jeff's Book", "Jeff DiPallo");
		var page1 = new Page("It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters",
			 'userId/images');
		var page2 = new Page("last page - There are many variations believable. If you are going to use dden in the middle of text. All the Lorem Ipsum generators on the Internet", 'userId/images', '');
		var pages = [page1, page2];
		var book1 = new Book();
		book1.setName('Book 1')
		book1.setCover(cover);
		book1.addPages(pages)

		// 2nd dummy....
	 	cover = new Cover("Jan's Book Book", "Jan Berenstain");
		page1 = new Page("Book2----There are many variations of passages of Lorem Ipsum available,  by injecightly believable. se a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet", 'userId/images', '');
	 	page2 = new Page("Book2----page 22222222 tions of passages of Lorem Ipsum available, our, or ightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet", 'userId/images', '');
	 	page3 = new Page("Book2----last page-here are many variations of passages of Lorem Ipsum available, buumour, or randly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet", 'userId/images', '');
	 	pages = [page1, page2, page3];
		book2 = new Book();
		book2.setName('Book 2')
		book2.setCover(cover);
		book2.addPages(pages)

	 	cover = new Cover("Melvin's Book", "Melvin Berger");
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