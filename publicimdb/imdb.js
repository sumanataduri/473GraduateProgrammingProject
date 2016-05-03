  /*globals $,angular */
  $(document).ready(function() {
      $(".button-collapse").sideNav();
      $('.slider').slider({
          full_width: true
      });
  });

  (function() {
      var app = angular.module('myapp', []);
      app.factory('mySharedService', function($rootScope) {
          var sharedService = {};

          sharedService.message = '';

          sharedService.prepForBroadcast = function(msg) {
              this.message = msg;
              this.broadcastItem();
          };

          sharedService.broadcastItem = function() {
              $rootScope.$broadcast('handleBroadcast');
          };

          return sharedService;
      });
      /*
      registerCtrl.$inject = ['$scope', '$http','mySharedService'];
      MoviesinTheatreCtrl.$inject = ['$scope', '$http','mySharedService'];
      */
      app.controller('AppCtrl', function($scope) {
          $scope.slides = [{
              image: "http://i.imgur.com/L2GI2c8.jpg",
              description: "Captain america : civil-war-team"
          }, {
              image: "https://i.ytimg.com/vi/2Rxoz13Bthc/maxresdefault.jpg",
              description: "WarCraft Coming soon"
          }, {
              image: "http://heroichollywood.com/wp-content/uploads/2016/04/maxresdefault-2.jpg",
              description: "X-Men Apocalypse.. Coming Soon"
          }, {
              image: "http://s3.foxfilm.com/foxmovies/production/films/107/images/feature/independence-day-film-header-v4-front-main-stage.jpg",
              description: "independence-day Resurgence"
          }];
      });
  
      app.controller('MoviesinTheatreCtrl', function($scope, $http, mySharedService) {

          $scope.$on('handleBroadcast', function() {  //Checks the broadcasted message. In this case:username. And makes it available throughout the controller
              console.log(mySharedService.message);
          });
          
          $http.get('/movieslist').success(function(response) {
              var moviesLocal = [];
              for (var rowIndex in response.rows) {
                  if (response.rows.hasOwnProperty(rowIndex)) {
                      moviesLocal.push(response.rows[rowIndex].doc);
                  }
              }
              $scope.latestmovies = moviesLocal;

          });
         
      //This function will execute when user login and display users already rated movies   
       $scope.assignclass= function(){
          if (mySharedService.message){
             $http.post("getuserinfo", {
                  "username": mySharedService.message
              }).success(function(data) {
                  if (data === "missing") {
                      console.log("user name is missing something wrong with getuserinfo route in client");
                  } else {
                      console.log(data.likes + " user data:" + data.name);
                      for(var j=0;j<$scope.latestmovies.length;j++){
                      for(var i=0;i<data.likes.length;i++){
                        if($scope.latestmovies[j].moviename===data.likes[i]){
                              $("i[id='" + $scope.latestmovies[j].moviename + "'].material-icons.thumbup").addClass("disabled_like").removeClass('like');
                        }
                      }
                      for(var i=0;i<data.dislikes.length;i++){
                        if($scope.latestmovies[j].moviename===data.dislikes[i]){
                               $("i[id='" + $scope.latestmovies[j].moviename + "'].material-icons.thumbdown").addClass("disabled_dislike").removeClass('dislike');
                        }
                      }

                    }
                    }
                  });
          }
        }
          $scope.updateLike = function(latestmovie) {

              if (mySharedService.message) { //Checking if User has logged in or not (username is being broadcasted from login funtion)

                  if ($("i[id='" + latestmovie.moviename + "'].material-icons.thumbdown").hasClass('dislike')) { //checks if user has not clicked the unlike button
                      if ($("i[id='" + latestmovie.moviename + "'].material-icons.thumbup").hasClass('like')) { //Only increments once if its not clicked before i.e it has class 'like'
                          $http.post("getMovieName", {
                              "name": latestmovie.moviename
                          }).success(function(data) { //Retrievs all data related to movie document inorder to update in DB
                              if (data === "missing") {
                                  console.log("movie is missing something wrong with getMovieName route in client");
                              } else {
                                  console.log(data + " rating:" + data.rating);
                                  console.log('scope.like: ' + $scope.like);
                                  //     if($scope.dislike===undefined){
                                  latestmovie.rating++;
                                  data.rating++;
                                  console.log(data.rating);

                                  $http.post('updatelike', {
                                      '_id': data._id,
                                      '_rev': data._rev,
                                      'moviename': data.moviename,
                                      'year': data.year,
                                      'movielink': data.movielink,
                                      'genre': data.genre,
                                      'rating': data.rating
                                  }).success(function(val) {
                                      if (data === "Document update conflict.") {
                                          console.log("client data after updating it throwed following error:" + val);
                                      } else {
                                          console.log("client data after updating:" + val);
                                          $("i[id='" + latestmovie.moviename + "'].thumbup").addClass("disabled_like").removeClass('like');

                                          updateUserlike(latestmovie.moviename);

                                      }
                                  });
                              }
                          });
                      }
                  } else if ($("i[id='" + latestmovie.moviename + "'].material-icons.thumbdown").hasClass('disabled_dislike')) {
                      $http.post("getMovieName", {
                          "name": latestmovie.moviename
                      }).success(function(data) {
                          if (data === "missing") {
                              console.log("movie is missing something wrong with getMovieName route in client");
                          } else {
                              console.log(data + " rating:" + data.rating);
                              console.log('scope.like: ' + $scope.like);

                              latestmovie.rating += 2;
                              data.rating += 2;
                              console.log(data.rating);

                              $http.post('updatelike', {
                                  '_id': data._id,
                                  '_rev': data._rev,
                                  'moviename': data.moviename,
                                  'year': data.year,
                                  'movielink': data.movielink,
                                  'genre': data.genre,
                                  'rating': data.rating
                              }).success(function(val) {
                                  if (data === "Document update conflict.") {
                                      console.log("client data after updating it throwed following error:" + val);
                                  } else {
                                      console.log("client data after updating:" + val);
                                      $("i[id='" + latestmovie.moviename + "'].material-icons.thumbup").addClass("disabled_like").removeClass('like');
                                      $("i[id='" + latestmovie.moviename + "'].material-icons.thumbdown").addClass("dislike").removeClass('disabled_dislike');
                                      updateUserlike(latestmovie.moviename);
                                  }
                              });
                          }
                      });
                  }
              } else {
                  $('#modal1').openModal();
                  $('#username').val('');
                  $('#password').val('');
                  $scope.loginError = '';
              }

          };
          var userdislikes = [],
              userlikes = [];

          function updateUserlike(moviename) {
              $http.post("getuserinfo", {
                  "username": mySharedService.message
              }).success(function(data) {
                  if (data === "missing") {
                      console.log("user name is missing something wrong with getuserinfo route in client");
                  } else {
                      console.log(data + " user data:" + data.name);
                      var userlikes = [];
                      userlikes = data.likes;
                      if ((data.likes.indexOf(moviename) == -1) && (data.dislikes.indexOf(moviename)) == -1) {
                          console.log("going into if moviename is not present in likes and dislikes");
                          userlikes.push(moviename);
                          console.log(data.likes + "userlikes:" + userlikes);

                          updateUser(data,userlikes,userdislikes);
                        
                      } else if (((data.dislikes.indexOf(moviename)) !== -1) && ((data.likes.indexOf(moviename)) == -1)) {
                          console.log("going into moviename present in dislikes");
                          userlikes = data.likes;
                          userlikes.push(moviename);
                          userdislikes = data.dislikes;
                          userdislikes.splice((userdislikes.indexOf(moviename)), 1);
                          updateUser(data,userlikes,userdislikes);
                      
                      }
                  }
              });
          }
function updateUser(data,userlikes,userdislikes){
  $http.post('updateLikeinUser', {
                              '_id': data.name,
                              '_rev': data._rev,
                              'name': data.name,
                              'password': data.password,
                              'likes': userlikes,
                              'dislikes': userdislikes
                          }).success(function(val) {
                              if (data === "Document update conflict.") {
                                  console.log("client data after updating it throwed following error:" + val);
                              } else {
                                  console.log("client data after updating:" + val);
                              }
                          });
          }
          function updateUserdislike(moviename) {

              $http.post("getuserinfo", {
                  "username": mySharedService.message
              }).success(function(data) {
                  if (data === "missing") {
                      console.log("user name is missing something wrong with getuserinfo route in client");
                  } else {
                      console.log(data + " user data:" + data.name);

                      userdislikes = data.dislikes;
                      if ((data.likes.indexOf(moviename) == -1) && (data.dislikes.indexOf(moviename)) == -1) { //checks if like or dislike button is not clicked if so, it will just increment by 1
                          console.log("going into if moviename is not present in likes and dislikes");
                          userdislikes.push(moviename);
                          updateUser(data,userlikes,userdislikes);
                      
                      } else if (((data.dislikes.indexOf(moviename)) == -1) && ((data.likes.indexOf(moviename)) !== -1)) {
                          console.log("going into moviename present in likes: dislikes");
                          userlikes = data.likes;
                          // userlikes.push(moviename);
                          userdislikes = data.dislikes;
                          userdislikes.push(moviename);
                          userlikes.splice((userlikes.indexOf(moviename)), 1);
                          updateUser(data,userlikes,userdislikes);
                       
                      }
                  }
              });
          }
          $scope.updateDislike = function(latestmovie) {
              if (mySharedService.message) { //Checking if User has logged in or not (username is being broadcasted from login funtion)
                  if (($("i[id='" + latestmovie.moviename + "'].material-icons.thumbup").hasClass('like')) && ($("i[id='" + latestmovie.moviename + "'].material-icons.thumbdown").hasClass('dislike'))) {
                      $http.post("getMovieName", {
                          "name": latestmovie.moviename
                      }).success(function(data) {
                          if (data === "missing") {
                              console.log("movie is missing something wrong with getMovieName route in client");
                          } else {
                              console.log(data + " rating:" + data.rating);
                              latestmovie.rating--;
                              data.rating--;
                              console.log(data.rating);
                              $http.post('updatelike', {
                                  '_id': data._id,
                                  '_rev': data._rev,
                                  'moviename': data.moviename,
                                  'year': data.year,
                                  'movielink': data.movielink,
                                  'genre': data.genre,
                                  'rating': data.rating
                              }).success(function(val) {
                                  if (data === "Document update conflict.") {
                                      console.log("client data after updating it throwed following error:" + val);
                                  } else {
                                      console.log("client data after updating:" + val);
                                      $("i[id='" + latestmovie.moviename + "'].material-icons.thumbdown").addClass("disabled_dislike").removeClass('dislike');
                                      updateUserdislike(latestmovie.moviename);
                                  }
                              });
                          }
                      });

                  } else if ($("i[id='" + latestmovie.moviename + "'].material-icons.thumbup").hasClass('disabled_like')) {
                      $http.post("getMovieName", {
                          "name": latestmovie.moviename
                      }).success(function(data) {
                          if (data === "missing") {
                              console.log("movie is missing something wrong with getMovieName route in client");
                          } else {
                              console.log(data + " rating:" + data.rating);
                              latestmovie.rating -= 2;
                              data.rating -= 2;
                              console.log(data.rating);
                              $http.post('updatelike', {
                                  '_id': data._id,
                                  '_rev': data._rev,
                                  'moviename': data.moviename,
                                  'year': data.year,
                                  'movielink': data.movielink,
                                  'genre': data.genre,
                                  'rating': data.rating
                              }).success(function(val) {
                                  if (data === "Document update conflict.") {
                                      console.log("client data after updating it throwed following error:" + val);
                                  } else {
                                      console.log("client data after updating:" + val);
                                      $("i[id='" + latestmovie.moviename + "'].material-icons.thumbdown").addClass("disabled_dislike").removeClass('dislike');
                                      $("i[id='" + latestmovie.moviename + "'].material-icons.thumbup").addClass("like").removeClass('disabled_like');
                                      updateUserdislike(latestmovie.moviename);
                                  }
                              });
                          }
                      });
                  }
              } else {
                  $('#modal1').openModal();
                  $('#username').val('');
                  $('#password').val('');
                  $scope.loginError = '';
              }
          };
      });
     
      app.controller('registerCtrl', function($scope, $http, mySharedService) {

          $scope.loginopen = function() {
              $('#modal1').openModal();
              $('#username').val('');
              $('#password').val('');
              $scope.loginError = '';
          };
          $scope.regopen = function() {
              $('#modal2').openModal();
              $('#regUsername').val('');
              $('#regPassword').val('');
          };
          $scope.postopen = function() {
              $('#modal3').openModal();
              $('#postname').val('');
              $('#postlink').val('');

          };
           function userlikedMovies(){ 
            console.log("going inside")
          $http.post("getuserinfo", {
              "username": mySharedService.message
          }).success(function(data) {
              if (data === "missing") {
                  console.log("user name is missing something wrong with getuserinfo route in client");
              } else {
                 // console.log(data + " user data:" + data.likes);
                  var moviedetails = [];
                  for (var i=0;i< data.likes.length;i++) {
                     $http.post('getMovieName', {
                          "name": data.likes[i]
                      }).success(function(data) {
                          if (data === "missing") {
                              console.log("movie is missing something wrong with getMovieName route in client");
                          } else {
                              $scope.likedmovies.push(data);
                             
                          }
                      });
                  }
                  $scope.likedmovies = moviedetails;
                  console.log(moviedetails);
              }
          });
          }

          $scope.registerSubmit = function(registerform) {

              if ($scope.username && $scope.regpassword !== undefined) {
                  $http.post("userRegister", {
                      "name": $scope.username,
                      "password": $scope.regpassword,
                      "likes": [],
                      "dislikes": []
                  }).success(function(data) {
                      if (data === "Document update conflict.") {
                          $scope.signupError = "Username already taken. Please choose different name";
                      } else {
                          $('#modal2').closeModal();
                          $scope.username = null;
                          $scope.regpassword = null;
                          $scope.confirmpassword = null;
                      }
                  });
              } else {
                  $scope.signupError = "Required field is empty";
              }
          };

          $scope.loginSubmit = function(loginform) {
              if ($scope.loginusername && $scope.loginpassword !== undefined) {
                  if ($scope.loginusername && $scope.loginpassword === 'admin') {
                      $scope.afterlogin = function() {
                          return true;
                      };
                      $scope.beforelogin = function() {
                          return true;
                      };
                      $scope.post = function() {
                          return true;
                      };
                      $('#modal1').closeModal();
                      $scope.years = [2016, 2015, 2014];
                      $scope.postyear = 2016;
                      $scope.genres = [{
                          "name": "action",
                          "v": true
                      }, {
                          "name": "adventure",
                          "v": false
                      }, {
                          "name": "animated",
                          "v": false
                      }, {
                          "name": "comedy",
                          "v": false
                      }, {
                          "name": "fiction",
                          "v": false
                      }];
                 
                  }

                  $http.post('login', {
                          "username": $scope.loginusername
                      }).success(function(response) {
                          if (response === "missing") {
                              $scope.loginError = "Username is invalid";
                          } else {
                              //   var name =response.name,
                              var password = response.password;
                              if (password !== $scope.loginpassword) {
                                  $scope.loginError = "password is not correct";
                              } else {

                                  $scope.afterlogin = function() {
                                      return true;
                                  };
                                  $scope.beforelogin = function() {
                                      return true;
                                  };

                                  $('#modal1').closeModal();
                                  console.log("login success");
                                  mySharedService.prepForBroadcast($scope.loginusername);
                                  userlikedMovies();
                                  $scope.assignclass();
                                  
                              }
                          }
                      })
                      .error(function(err) {
                          console.log(err);
                      });

              } else {
                  $scope.loginError = "Required fields are empty";
              }

          };

          $scope.postSubmit = function(postform) {
              if ($scope.postname && $scope.postlink !== undefined) {
                  console.log($scope.genres);
                  var genrevalues = [];
                  angular.forEach($scope.genres, function(genreitem) {
                      //  console.log(genreitem+" json format:"+JSON.stringify(genreitem));
                      if (genreitem.v === true) {
                          genrevalues.push(genreitem.name);
                      }
                  });
                  console.log(genrevalues);
                  $http.post("adminPost", {
                      "moviename": $scope.postname,
                      "movielink": $scope.postlink,
                      "year": $scope.postyear,
                      "genre": genrevalues
                  }).success(function(data) {
                      if (data === "Document update conflict.") {
                          $scope.signupError = "Moviename already exists. Please choose different name";
                      } else {
                         
                          $scope.$parent.latestmovies.push(data);
                          // $scope.signupError='Successfully registered';
                          $('#modal3').closeModal();
                          $scope.postError = function() {
                              return false;
                          };

                      }
                  });
              } else {
                  $scope.postError = function() {
                      return true;
                  };
                  $scope.postErrorval = "Required field is missing value";
              }

          };

          $scope.logout = function() {
              $scope.afterlogin = function() {
                  return false;
              };
              $scope.beforelogin = function() {
                  return false;
              };
              $scope.post = function() {
                  return false;
              };
              $("i.material-icons.thumbdown").addClass("dislike").removeClass('disabled_dislike');
              $("i.material-icons.thumbup").addClass("like").removeClass('disabled_like');
          };

      });
  })();