  var module = angular.module("app", ['timer']);
  module.controller("questionPaperController",  function ($scope) {

   $scope.add5Seconds = function () {
                        $scope.$broadcast('timer-add-cd-seconds', 5);
                    };
  
      $scope.questions = [{
          "text": "What is this",
              "questionId": 1,
			  "type":"SINGLE_CHOICE",
              "answer": [{
              "id": 15,
              "value": "paper"
          }, {
              "id": 16,
              "value": "pen"
          }, {
              "id": 17,
              "value": "book"
          }, {
              "id": 18,
              "value": "phone"
          }]
      }, 
	  
		
	  {
          "text": "What is that",
              "questionId": 3,
  			  "type":"MULTI_CHOICE",
              "answer": [{
              "id": 15,
              "value": "paper",
			  "selected":false
          }, {
              "id": 16,
              "value": "pen",
			  "selected":false
          }, {
              "id": 17,
              "value": "book",
			  "selected":false
          }, {
              "id": 18,
              "value": "phone",
			  "selected":false
		   }]
       }, {
          "text": "What is What?",
              "questionId": 4,
  			  "type":"MULTI_CHOICE",
              "answer": [{
              "id": 15,
              "value": "abcd",
			  "selected":false
          }, {
              "id": 16,
              "value": "bsdat",
			  "selected":false
          }, {
              "id": 17,
              "value": "ajeta",
			  "selected":false
          }, {
              "id": 18,
              "value": "aurls",
			  "selected":false
          }]
      }];

      $scope.currentQuestion = 0;
      $scope.question = $scope.questions[$scope.currentQuestion];
      $scope.nextQuestion = function () {
          $scope.currentQuestion++;
          $scope.question = $scope.questions[$scope.currentQuestion];
      };
      $scope.prevQuestion = function () {
          $scope.currentQuestion--;
          $scope.question = $scope.questions[$scope.currentQuestion];
      };
	  
	 $scope.finished=function(){
        $scope.status='COMPLETE!!';
        $scope.callbackCount++;
        $scope.$apply();
		alert("fisnished");
     };
	

  });