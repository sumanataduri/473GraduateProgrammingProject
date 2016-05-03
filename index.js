var express=require("express"),
	nano=require("nano")('http://localhost:5984'),
	app=express(),
	http=require('http');

	 nano.db.create('movies',function(err,body,header){
		if(err){
			console.log(err);
		}
		else{

		nano.db.use('movies').insert({
      "_id": "Barbershop The next Cut",
      "rating": 1,
      "moviename": "Barbershop The next Cut",
      "year": 2016,
      "movielink": "https://i.ytimg.com/vi/l2vPDGStL4k/maxresdefault.jpg",
      "genre": [ "comedy" ]
    },function(err1,body1){
			if(err1){
				console.log(err1);
			}
			console.log(body1);
		});
		nano.db.use('movies').insert({
      "_id": "Batman Vs Superman",
      "rating": 2,
      "moviename": "Batman Vs Superman",
      "year": 2016,
      "movielink": "http://conradorpheum.com/wp-content/uploads/2016/03/BATMAN-SUPERMAN.jpg",
      "genre": [ "action" ]
    },function(err1,body1){
			if(err1){
				console.log(err1);
			}
			console.log(body1);
		});
		nano.db.use('movies').insert( {
      "_id": "Captain America :Civil War",
      "rating": 2,
      "moviename": "Captain America :Civil War",
      "year": 2016,
      "movielink": "http://nerdist.com/wp-content/uploads/2016/02/captain-america-civil-war-02082016.png",
      "genre": [ "action" ]
    },function(err1,body1){
			if(err1){
				console.log(err1);
			}
			console.log(body1);
		});
		nano.db.use('movies').insert( {
      "_id": "Deadpool",
      "rating": 8,
      "moviename": "Deadpool",
      "year": 2016,
      "movielink": "https://upload.wikimedia.org/wikipedia/en/4/46/Deadpool_poster.jpg",
      "genre": [ "action" ]
    },function(err1,body1){
			if(err1){
				console.log(err1);
			}
			console.log(body1);
		});
		nano.db.use('movies').insert({
      "_id": "Eye in the Sky",
      "rating": 2,
      "moviename": "Eye in the Sky",
      "year": 2016,
      "movielink": "http://ia.media-imdb.com/images/M/MV5BNTY4Nzg5MTU0OV5BMl5BanBnXkFtZTgwMjY2MjU2NzE@._V1_SX640_SY720_.jpg",
      "genre": [ "action", "adventure" ]
    },function(err1,body1){
			if(err1){
				console.log(err1);
			}
			console.log(body1);
		});
		nano.db.use('movies').insert({
      "_id": "Hardcore Henry",
      "rating": 12,
      "moviename": "Hardcore Henry",
      "year": 2016,
      "movielink": "http://blogs-images.forbes.com/scottmendelson/files/2016/03/hardcorehenry_quad50-lores-1200x900.jpg",
      "genre": [ "action", "adventure" ]
    },function(err1,body1){
			if(err1){
				console.log(err1);
			}
			console.log(body1);
		});
		nano.db.use('movies').insert({
      "_id": "Inside Out",
       "rating": 0,
      "moviename": "Inside Out",
      "year": 2015,
      "movielink": "http://blogs-images.forbes.com/markhughes/files/2015/06/INSIDE-OUT-18.jpg",
      "genre": [ "animated", "comedy" ]
    },function(err1,body1){
			if(err1){
				console.log(err1);
			}
			console.log(body1);
		});
		nano.db.use('movies').insert({
      "_id": "Keanu",
      "rating": 14,
      "moviename": "Keanu",
      "year": 2016,
      "movielink": "http://i1.wp.com/teaser-trailer.com/wp-content/uploads/Keanu-new-Poster.jpg",
      "genre": [ "action", "adventure", "comedy" ]
    },function(err1,body1){
			if(err1){
				console.log(err1);
			}
			console.log(body1);
		});
		nano.db.use('movies').insert({
      "_id": "Mad Max: Fury Road genre",
      "rating": 10,
      "moviename": "Mad Max: Fury Road genre",
      "year": 2015,
      "movielink": "http://www.newnotizie.it/wp-content/uploads/2016/02/mad-max-slide.jpeg",
      "genre": [ "action" ]
    },function(err1,body1){
			if(err1){
				console.log(err1);
			}
			console.log(body1);
		});
		nano.db.use('movies').insert({
      "_id": "Mothers Day",
      "rating": 4,
      "moviename": "Mothers Day",
      "year": 2016,
      "movielink": "http://assets.flicks.co.nz/images/movies/poster/1e/9b91bcc82cba24f320f333ae36aff805_original.jpg",
      "genre": [ "comedy" ]
    },function(err1,body1){
			if(err1){
				console.log(err1);
			}
			console.log(body1);
		});
		
		nano.db.use('movies').insert({
      "_id": "My Big Fat Greek Wedding 2",
      "rating": 3,
      "moviename": "My Big Fat Greek Wedding 2",
      "year": 2016,
      "movielink": "http://www.empirecinemas.co.uk/_uploads/film_images/6668_4947.jpg",
      "genre": [ "comedy" ]
    },function(err1,body1){
			if(err1){
				console.log(err1);
			}
			console.log(body1);
		});
		nano.db.use('movies').insert({
      "_id": "The Boss",
      "rating": 4,
      "moviename": "The Boss",
      "year": 2016,
      "movielink": "http://www.grandcinemaonline.com/the%20boss.jpg",
      "genre": [ "comedy" ]
    },function(err1,body1){
			if(err1){
				console.log(err1);
			}
			console.log(body1);
		});
		nano.db.use('movies').insert({
      "_id": "The Divergent Series: Allegiant",
      "rating": 22,
      "moviename": "The Divergent Series: Allegiant",
      "year": 2016,
      "movielink": "https://filmgamesetc.com/wp-content/uploads/Allegiant-Movie-Posters-2016.jpg",
      "genre": [ "action", "fiction" ]
    },function(err1,body1){
			if(err1){
				console.log(err1);
			}
			console.log(body1);
		});
		nano.db.use('movies').insert({
      "_id": "The Huntsman: Winters War",
      "rating": 30,
      "moviename": "The Huntsman: Winters War",
      "year": 2016,
      "movielink": "https://walter.trakt.us/images/movies/000/187/507/fanarts/original/7b7c1b6e65.jpg",
      "genre": [ "action", "adventure" ]
    },function(err1,body1){
			if(err1){
				console.log(err1);
			}
			console.log(body1);
		});
		nano.db.use('movies').insert({
      "_id": "The Jungle Book",
      "rating": 16,
      "moviename": "The Jungle Book",
      "year": 2016,
      "movielink": "http://ia.media-imdb.com/images/M/MV5BMTc3NTUzNTI4MV5BMl5BanBnXkFtZTgwNjU0NjU5NzE@._V1_SX640_SY720_.jpg",
      "genre": [ "action", "adventure" ]
    },function(err1,body1){
			if(err1){
				console.log(err1);
			}
			console.log(body1);
		});
		nano.db.use('movies').insert( {
      "_id": "Zootopia",
      "rating": 16,
      "moviename": "Zootopia",
      "year": 2016,
      "movielink": "http://ia.media-imdb.com/images/M/MV5BOTMyMjEyNzIzMV5BMl5BanBnXkFtZTgwNzIyNjU0NzE@._V1_UY1200_CR90,0,630,1200_AL_.jpg",
      "genre": [ "comedy", "animated" ]
    },function(err1,body1){
			if(err1){
				console.log(err1);
			}
			console.log(body1);
		});
}
});


nano.db.create('users',function(err,body,header){
		if(err){
			console.log(err);
		}
		else{

		nano.db.use('users').insert({
   "_id": "sam",
   "name": "sam",
   "password": "sam",
   "likes": [
       "The Jungle Book",
       "The Divergent Series: Allegiant",
       "Keanu",
       "Mothers Day"
   ],
   "dislikes": [
   ]
},function(err1,body1){
			if(err1){
				console.log(err1);
			}
			console.log(body1);
		});
	}
});


console.log("Server is running");
