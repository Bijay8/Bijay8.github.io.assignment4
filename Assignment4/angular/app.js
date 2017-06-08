
// first we have to declare the module. note that [] is where we will declare the dependecies later. Right now we are leaving it blank
var myApp = angular.module('blogApp', ['ngRoute']); 
// this is without $scope


myApp.controller('mainController',['$http',function($http) {

  var main=this;
  this.year;
  //year=main.year;
  //alert(year)
  this.loadAllBlogs=function()
  {
  
    alert("WELCOME TO EPL")  
   // main.results=false 

  }
  this.loadAllBlogs();
  }
]); // end controller

myApp.controller('viewController',['$http','$routeParams',function($http,$routeParams) {

  var main=this;
  this.year;
  this.name=[];
  this.rounds=[];
  this.matches=[];
  this.year=$routeParams.year
   this.Bywinner=function()
   {
    
    //alert(main.result)
    if (main.result==true)
     return (main.result=false)
    else
      return(main.result=true)
   }


   if(this.year == '2015')
  this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
else
   this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';
    this.details=function()
   {
      $http({
        method: 'GET',
        url: main.baseUrl
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          console.log(response.data);
          console.log("abc");
          main.name=response.data.name
          main.rounds=response.data.rounds;
          
          

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);

        });


  }//
  
  
  this.viewDetails=function()
  {
    //alert("come")
    year=this.year
    //alert("Year " +year) ; 

  if (year == '2015')
  {
     this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json'
     this.details();
 //    return(main.results=true)
     //return (main.results ? main.results=false : main.results=true)        
  }
  else{
     if (year == '2016')
     {
        this.baseUrl= 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json'
        this.details();
      //  return(main.results=true)
        //return (main.results ? main.results=false : main.results=true)
     }
     else
      {
        alert("please enter a valid year")
        //  return(main.results=false)
        //return (main.results ? main.results=false : main.results=true)
      }
    }
   
}
}]); // end controller



myApp.controller('singlematchController',['$http','$routeParams',function($http,$routeParams) {

  //create a context
  var main = this;

  this.date='';
  this.team1;
  this.team2;
  this.score1;
  this.score2;
  this.status,this.other,this.otherscore1,this.otherscore2,this.date1,this.status1;
  this.Id = $routeParams.matchId;
  this.season=$routeParams.year;

 // alert(this.Id);
  //alert(this.season +  "   year")
   if(this.season == '2015')
  this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
else
   this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';
  //this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';

  this.loadSingeBlog = function(){
      $http({
        method: 'GET',
        url: main.baseUrl
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //console.log(response);
          main.name=response.data.name
          main.rounds=response.data.rounds;
          var str1=main.Id.substring(0,3);
          var str2=main.Id.substring(3);
          //alert(str1)
          //alert(str2)
           for(i in main.rounds)
           {
              for(j in main.rounds[i].matches)
              {
                if (main.rounds[i].matches[j].team1.code==str1 &&  main.rounds[i].matches[j].team2.code==str2)
                 {     main.date=main.rounds[i].matches[j].date
                       main.team1=main.rounds[i].matches[j].team1.name
                       main.team2=main.rounds[i].matches[j].team2.name
                       main.score1=main.rounds[i].matches[j].score1
                       main.score2=main.rounds[i].matches[j].score2
                       if(main.score1==main.score2)
                         main.status=" Match Tied"
                       else
                          {
                            if(main.score1>main.score2)
                              main.status=main.team1+" won the match"
                            else
                              main.status=main.team2+" won the match"
                          }

    //                alert(main.date)
                  }

              }
           }

            for(i in main.rounds)
           {
              for(j in main.rounds[i].matches)
              {
                if (main.rounds[i].matches[j].team2.code==str1 &&  main.rounds[i].matches[j].team1.code==str2)
                  {
                       main.date1=main.rounds[i].matches[j].date
                       if(main.date1 > main.date)
                           main.other="They played next match on "+ main.date1
                        else
                           main.other="They played previous match on "+ main.date
                         main.otherscore1=main.rounds[i].matches[j].score1
                         main.otherscore2=main.rounds[i].matches[j].score2
                         if(main.otherscore1==main.otherscore2)
                         main.status1=" Match  was Tied"
                       else
                          {
                            if(main.otherscore1>main.otherscore2)
                              main.status1=main.team2+" was winner"
                            else
                              main.status1=main.team1+" was winner"
                          }

                  }
         }
       }
          

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });


  }// end 

  
   


}]); // end controller



//myApp.controller('blogCreateController',['$http',function($http) {

myApp.controller('totalMatchStats',['$http','$routeParams',function($http,$routeParams) {


//alert("match");
this.season=$routeParams.year;
//alert(this.season);
//alert($routeParams.year);
this.count=0;
this.Lost_Count=0;
this.Won_count=0;
this.Tie_count=0;
this.Score_count=0;  
this.Score_against_count=0;
this.Score_round=[];
this.rounds=[];
this.arr=[];
this.team=[];
this.team1=[];
this.inputname;
var main = this;
  
 if(this.season == '2015')

  this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json';
else
   this.baseUrl = 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json';
  
   



     this.teamDetails=function(name)
   {

      
      main.inputname=name
  //name=this.name;
  var Count=0,Won_count=0,Lost_Count=0,Tie_count=0,Score_count=0,Score_against_count=0,Score_round=0;
  //alert(name);

      $http({
        method: 'GET',
        url: main.baseUrl
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          console.log(response.data);
          console.log("cde");

          main.name=response.data.name
          main.rounds=response.data.rounds;
          for(i in main.rounds)
           {
            for(j in main.rounds[i].matches)
             {  
             if ((main.rounds[i].matches[j].team1.name == name))

              { 
                Count=Count+1
                  if((main.rounds[i].matches[j].score1 ==main.rounds[i].matches[j].score2))
                   { Tie_count=Tie_count+1
                    Score_count=Score_count+main.rounds[i].matches[j].score1
                    Score_against_count=Score_count+main.rounds[i].matches[j].score2
                   }
                   else
                     {
                       if((main.rounds[i].matches[j].score1 > main.rounds[i].matches[j].score2))
                        {     Won_count=Won_count+1
                              Score_count=Score_count+main.rounds[i].matches[j].score1
                              Score_against_count=Score_count+main.rounds[i].matches[j].score2
                         }     
                        else
                        {
                              Score_count=Score_count+main.rounds[i].matches[j].score1
                              Score_against_count=Score_count+main.rounds[i].matches[j].score2                
                       }      
                      }  
                  }
              else
              {
                 if ((main.rounds[i].matches[j].team2.name == name))
                 {    Count=Count+1
                     if((main.rounds[i].matches[j].score1 == main.rounds[i].matches[j].score2))
                        {   Tie_count=Tie_count+1
                            Score_count=Score_count+main.rounds[i].matches[j].score1
                            Score_against_count=Score_count+main.rounds[i].matches[j].score2
                         }  
                     else
                     {
                       if((main.rounds[i].matches[j].score1 < main.rounds[i].matches[j].score2))
                          {   Won_count=Won_count+1
                              Score_count=Score_count+main.rounds[i].matches[j].score2
                              Score_against_count=Score_count+main.rounds[i].matches[j].score1
                          }
                      
                        else
                       {
                    Score_count=Score_count+main.rounds[i].matches[j].score2
                    Score_against_count=Score_count+main.rounds[i].matches[j].score1
                       }
                   }
          
          }
}
 
 
}    
}   

        main.Tie_count=Tie_count
        main.Won_count=Won_count
        main.Lost_Count=Lost_Count
        main.count=Count
        main.Score_count=Score_count
        main.Score_against_count=Score_against_count
        Lost_Count=Count-(Won_count+Tie_count)
        main.Lost_Count=Lost_Count
        console.log("Lost"+Lost_Count)
        console.log("won"+Won_count)
        console.log("Tie"+Tie_count)
        console.log("Played"+Count)

        window.scrollBy(0,500); 

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);

        });

  }// end load all blogs



     this.loadAllBlogs=function()
     {

      $http({
        method: 'GET',
        url: main.baseUrl
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //console.log(response.data);
          //console.log("cde");

          //main.name=response.data.name
          main.rounds=response.data.rounds;
          for(k in main.rounds)
          {
            for(m in main.rounds[k].matches)
            {
            (main.team1).push(main.rounds[k].matches[m].team1.name)
          }

        }
       function uni_array() {
       var a=[],
       //var uniqueArray=[];
      a=main.team1
      var uniqueArray = a.filter(function(elem, pos) {
       return a.indexOf(elem) == pos;
})

      console.log(uniqueArray)
      main.team=uniqueArray
}

uni_array()
//main.team=uniqueArray
       
  /*   var a=main.team1   
     var b= _.uniq(a);
     alert(b);  
/*   
    var a=[],R=[];
      
      a=main.team
     Array.prototype.removeDuplicates = function () {
    return this.filter(function (item, index, self) {
        return self.indexOf(item) == index;
    });
};
R=a.removeDuplicates()
main.team1=R
    console.log(R);
    */
    console.log(main.team)
        });
     }

   


}]); // end controller
