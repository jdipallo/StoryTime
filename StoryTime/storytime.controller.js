var app = angular.module('StoryTime')
	.controller("StorytimeCtrl", storytimeCtrl);

storytimeCtrl.$inject = (['Book']);

app.filter('startFrom', function() {
	return function(pages, currentPageNum) {
		if (pages != null) {
			return pages.slice(currentPageNum - 1); // minus one because array's start at 0
		}
	}
});

function storytimeCtrl(Book) {
	var ctrl = this;
	ctrl.books = Book.retrieveBooks();
	ctrl.openBook = false;
	ctrl.addPage  = false;
	ctrl.currentPageNum = 1;
	ctrl.vo = null;

	ctrl.createNewBook = function() {
		ctrl.books.push(Book.create());
		// return current book to the View to we can add a cover and pages then save it
		return ctrl.books[ctrl.books.length - 1];
	}

	ctrl.addBlankPage = function(pages) {
		for (var i = 0; i < pages; i++) {
			ctrl.currentBook.addPage(Book.createEmptyPage());
		}
	}

	ctrl.pageHasVO  = function(pageNum) {
		if (ctrl.currentBook != null ) {
			var voFilename = ctrl.currentBook.pages[pageNum - 1].voFilename;
			if (voFilename == null || voFilename === '') {
				console.log("returning false in pageHasVO()!");
				return false;
			} 
			else {
				return true;
			}
		}
	}

	ctrl.playVO = function(pageNum) {
		var voFilename = ctrl.currentBook.pages[pageNum -1].voFilename;

		// if we have a new VO just recorded for now lets use the buffer in memory
		if (ctrl.vo) {
			ctrl.vo.play();
		}
		else {
			var audio = new Audio(voFilename);
			audio.play();
		}
	}

	ctrl.recordVO = function() {
	  // use the '.enabled' boolean to make sure user enabled the mic (otherwise we'd record silence)
	  if (mic.enabled) {
	    // Tell recorder to record to a p5.SoundFile which we will use for playback
	  recorder.record(soundFile); 
	  }
	  ctrl.vo = soundFile;
	}

	ctrl.stopVO = function(pageNum) {
		var voFileName = "StorytimeVO-" + ctrl.currentBook.isbn + "_" + pageNum + ".wav";
		var currentPage = ctrl.currentBook.pages[pageNum - 1];

 		recorder.stop();

	    saveSound(soundFile, voFileName); // save file

	    // if saveSound success - we need to do some validation here...
	    // store the VO filename into the current book for the pageNum page
 		currentPage.setVoFilename(voFileName);
	}
}