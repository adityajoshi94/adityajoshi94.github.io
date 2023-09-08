(function(){
 
  var app = angular.module('myQuiz',[]);
	app.controller('QuizController',['$scope' , '$http' , '$sce' , function($scope,$http,$sce){
	   $scope.score = [];
		 $scope.activeQuestion = -1;
		 $scope.activeQuestionAnswered = 0;
		 $scope.percentage = 0;
		 $scope.list = [];
		 $http.get('quiz_data.json').then(function(quizData){
				$scope.myQuestions = quizData.data;
				$scope.totalQuestions = $scope.myQuestions.length;
				//console.log($scope.myQuestions)
		 });	 
		 
		$scope.selectAnswer = function(qIndex , aIndex){
			console.log(qIndex , aIndex)
				var questionState = $scope.myQuestions[qIndex].questionState;
				if(questionState!= 'answered'){
					$scope.myQuestions[qIndex].selectedAnswer = aIndex;
					console.log($scope.myQuestions[qIndex].interior_style)
					console.log($scope.myQuestions[aIndex].selectedAnswer)
					selected_choice = $scope.myQuestions[aIndex].selectedAnswer == 0 ? 'yes':'no'
					interior_design_selected = $scope.myQuestions[qIndex].interior_style
					console.log("user select" ,selected_choice)
					var correctAnswer =  $scope.myQuestions[qIndex].correct == 0 
					$scope.myQuestions[qIndex].correctAnswer = correctAnswer;
					console.log(correctAnswer + 'answer'+  aIndex)
					if(selected_choice===  "yes"){
						console.log('correctly answered');
						$scope.myQuestions[qIndex].correctness ='correct';
						$scope.score.push(interior_design_selected)
					}
					else{
							$scope.myQuestions[qIndex].correctness ='incorrect';
					}
					$scope.myQuestions[qIndex].questionState = 'answered'
					//console.log($scope.myQuestions[qIndex].questionState);
				}	
				//$scope.percentage = (($scope.score/$scope.totalQuestions)*100).toFixed(1);
			
				for ( const element  of $scope.score) {
					console.log(element);
	
				  }
				
		
		} 
		$scope.isSelected = function(qIndex , aIndex){
			//console.log("isselected")
			//console.log($scope.myQuestions[qIndex].selectedAnswer === aIndex)
			return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
		}
		
		$scope.isCorrect = function(qIndex , aIndex){
			//console.log("is correct")
			//console.log("isCorrect" + $scope.myQuestions[qIndex].correctAnswer === aIndex)
			return $scope.myQuestions[qIndex].correctAnswer === aIndex;
		}
		
		$scope.createShareLinks =function(percentage){
			var url  = "http://codifydesign.com/"
			var emailLink = '<a class ="btn email" href="mailto:?subject=look at this website&body=Hi,i scored a ' + percentage + ' percent on this quiz about Saturn.">'+'Email a friend '+'</a>'		
		  var twitterLink = '<a class ="btn twitter"  target = "_blank" href = "http://twitter.com/share?text=I Scored ' + percentage + ' percent on this  quiz about Saturn. Try to beat my score at &hashtags=saturnQuiz&url =' + url +'">Tweet your Score </a>'
			var facebookLink = '<a class = "btn facebook" target="_blank" href=  "https://www.facebook.com/sharer/sharer.php&u=' + url + 'I Scored' + percentage +  'percent on this  quiz about Saturn. Try to beat my score at &hashtags=saturnQuiz">Share your Score </a>'
			var newMarkup = emailLink + twitterLink + facebookLink;
			return $sce.trustAsHtml(newMarkup);			
		}
		
		
		$scope.selectContinue = function(){
		return $scope.activeQuestion += 1;
		}
		
  }]);

})();