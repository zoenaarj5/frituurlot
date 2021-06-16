angular.module('AD-languageController',[])
	.controller('ADLanguageController',function($scope,$rootScope,GELanguageFactory,ADViewTranslationFactory){
		$scope.languagez=GELanguageFactory.getLanguages();
		$scope.tranz=ADViewTranslationFactory.getTranslations('language');
		$scope.setLanguage=function(languageCode){
//			alert('setting language to '+languageCode+'...');
			if(confirm($scope.tranz.changeRequestConfirmation)){
				GELanguageFactory.setLanguage(languageCode);
			}
		};
	})
;