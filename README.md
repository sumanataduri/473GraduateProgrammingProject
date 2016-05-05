# 473GraduateProgrammingProject

Project is done using Angular Js,JQuery, Html, materialize-css,css as front end, Node JS and CouchDB as backend.
Following are the steps to run this project.

Step 1 : Copy index.js,imdbserver.js and publicimdb folder files to a local folder

Step 2 : Execute index.js file in bash or command prompt using command "node index.js". It will create "movies" and "users" database            and inserts documents in movies database and single document in users database.

Step 3 : Execute imdbserver.js in bash or command prompt using command "node imdbserver.js". Open Chrome browser and enter                        "http://localhost:3000/imdb.html" in browser. It will open website. 

Step 4 : When you hover on movie image it will show the Movie name, Rating of the movie and like/dislike buttons. Movies are                    categorized as movies playing in theatres, most rated movies, action and comedy movies. These are displayed in rows.

Step 5 : When you click on like or dislike button, login modal will be prompted asking to login in order to like.

Step 6 : Before Login User will have to register, to do that click on Register button on home page.

Step 7 : Once user has registered, details will be saved in couchdb.

Step 8 : Then user can login with username and password and like/dislike a movie. On clicking like or dislike button will be                    highlighted showing user has liked/disliked it. And the rating will be updated and all the rows will act accordingly.

Step 9 : When user dislikes already liked movie or vice versa it will be decremented or incremented by 2 otherwise rating will be               updated by 1.

Step 10 : Whatever movie user likes or dislikes it will be updated in that particular document in ‘users’ database. All the likes and            dislikes of particular user will be shown if they login again. User can change their rating any time they login and that               will be updated in the database.

Step 11 : Posting of new movies can only be done by Admin with Login username: admin, password: admin.

Step 12 : To post new movie click post button in header after logging in.

Step 13 : Once movie details are entered and submitted. It will automatically be updated in the page in all rows with default rating of 0.


