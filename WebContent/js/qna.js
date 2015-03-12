var module = angular.module("app", [ 'timer','ui.router' ]);
var pagesArray = new Array();
var answerArray = new Array();

module.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');
	$urlRouterProvider.otherwise("/instruction");

	$stateProvider.state('instruction', {
		url : '/instruction',
		templateUrl : 'instruction.html',
		controller : 'questionPaperController'
	}).state('test', {
		url : '/test',
		templateUrl : 'test.html'
	}).state('result', {
		url : '/result',
		templateUrl : 'result.html'
	});
});

module
		.controller(
				"questionPaperController",
				function($scope, $http) {

					$scope.add5Seconds = function() {
						$scope.$broadcast('timer-add-cd-seconds', 5);
					};

					$scope.questions = [ {
						"questionText" : "What is the sum of 4 and 7",
						"answers" : [ {
							"text" : "11",
							"id" : 0
						}, {
							"text" : "8",
							"id" : 1
						}, {
							"text" : "6",
							"id" : 2
						}, {
							"text" : "32",
							"id" : 3
						} ],
						"testId" : -7215332339100026000,
						"id" : 1
					}, {
						"questionText" : "What is the sum of 3 and 2",
						"answers" : [ {
							"text" : "5",
							"id" : 0
						}, {
							"text" : "8",
							"id" : 1
						}, {
							"text" : "6",
							"id" : 2
						}, {
							"text" : "32",
							"id" : 3
						} ],
						"testId" : -7215332339100026000,
						"id" : 2
					}, {
						"questionText" : "What is the 7th power of 2",
						"answers" : [ {
							"text" : "87",
							"id" : 0
						}, {
							"text" : "8",
							"id" : 1
						}, {
							"text" : "16",
							"id" : 2
						}, {
							"text" : "128",
							"id" : 3
						} ],
						"testId" : -7215332339100026000,
						"id" : 3
					} ];

					$scope.currentQuestion = 0;

					$scope.question = $scope.questions[$scope.currentQuestion];
					$scope.questionId = "";
					$scope.nextQuestion = function(id, ansid) {
						if ($('input[type=radio]:checked').length <= 0) {

							$('#answerSelect').modal();
						} else {

							$scope.questionId = id;
							var questionId = id;
							var found = pagesArray.some(function(el) {
								return el.questionId === id;
							});
							if (found) {
								for ( var i = 0; i < pagesArray.length; i++) {
									if (pagesArray[i].questionId == questionId) {
										pagesArray.splice(i, pagesArray.length);
										pagesArray.push({
											questionId : id,
											id : ansid
										});
										break;
									}
								}
							} else {
								pagesArray.push({
									questionId : id,
									id : ansid
								});
							}

							if (($scope.questions.length
									- $scope.currentQuestion - 1) == 0) {
								
								$scope.submitAnswer();
								
							} else {
								$scope.currentQuestion++;
								$scope.question = $scope.questions[$scope.currentQuestion];
							}
						}
					};
					
					$scope.submitAnswer = function(){
						$('#answerSubmited').modal();
						var testResultData = JSON.stringify(pagesArray);
						var testUrl = "/feedback/username/{username}/candidate/{candidateId}"
						$http(
								{
									method : 'POST',
									url : testUrl,
									data : testResultData,
									headers : {
										'Content-Type' : 'application/x-www-form-urlencoded'
									}
								})
								.success(
										function() {

											$('#answerSubmited').modal();
										});
					};

					$scope.prevQuestion = function() {
						$scope.currentQuestion--;
						$scope.question = $scope.questions[$scope.currentQuestion];
						setTimeout(function() {
							$scope.showSelected();
						}, 100);

					};
					$scope.showSelected = function() {
						for ( var i = 0; i < pagesArray.length; i++) {
							if (pagesArray[i].questionId == $(
									"input[type='radio']").attr('name')) {
								$(
										"input:radio[name="
												+ pagesArray[i].questionId
												+ "]").filter(
										"[id=" + pagesArray[i].id + "]").attr(
										'checked', true);
							}
						}
					};
					$scope.finished = function() {
						$scope.status = 'COMPLETE!!';
						$scope.submitAnswer();
						
						
					};

				});