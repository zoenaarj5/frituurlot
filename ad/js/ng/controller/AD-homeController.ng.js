angular.module('AD-homeController',[])
	.controller('ADHomeController',function($scope,ADViewTranslationFactory){
		$scope.tranz=ADViewTranslationFactory.getTranslations('home');
	})
;