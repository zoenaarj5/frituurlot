angular.module('FE-passwordChangeController',[])
	.controller('FEPasswordChangeController',function($scope,FEViewTranslationFactory,FEUserLogFactory){
		FEUserLogFactory.checkLog();
		$scope.tranz=FEViewTranslationFactory.getTranslations('passwordChange');
		alert('pwc tranz = '+JSON.stringify($scope.tranz));
	})
;