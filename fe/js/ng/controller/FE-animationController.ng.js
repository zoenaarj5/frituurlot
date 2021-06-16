angular.module('FE-animationController',[])
.controller('FEAnimationController',function($window,$scope){
	$scope.initAnim=function(){
/*		$window.setInterval(
			function(){
		//		alert('prepending...');
				$('#home-data-box>div').last().prependTo($('#home-data-box'));
			},10000
		);*/
		$window.setInterval(
			function(){
				$('#top-menu-toggle-box>div').first().appendTo($('#top-menu-toggle-box'));
			},5000
		);
/*		$window.setInterval(
			function(){
				var id='contact-data-box-bis';
				$('#'+id+' > div:first-child').appendTo($('#'+id));
			},5000
		);*/
	};
});