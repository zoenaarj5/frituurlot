angular.module("FE-downLeftAdController",[]).controller("FEDownLeftAdController",function($scope,$window,FEViewTranslationFactory,GEDateFactory,GELanguageFactory,FEUserLogFactory){
		var PAGE_NAME="downLeftAd";
		FEUserLogFactory.checkLog();
		$scope.tranz=FEViewTranslationFactory.getTranslations(PAGE_NAME);
		$scope.languageCode=GELanguageFactory.getLanguage().code;
});