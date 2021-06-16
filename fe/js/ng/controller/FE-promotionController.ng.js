angular.module('FE-promotionController',[])
	.controller('FEPromotionController',function($window,$scope,GEMathFactory,GEPromotionFactory,FEViewTranslationFactory,FEUserLogFactory){
		FEUserLogFactory.checkLog();
	    $scope.tranz=FEViewTranslationFactory.getTranslations('promotions');
		$scope.promotionz=[];
		GEPromotionFactory.getPromotions(
			function(data){
//				alert('data='+JSON.stringify(data));
				if(data==0 || typeof(data[0])=='undefined'){
					switch(navigator.appName){
						case 'Microsoft Internet Explorer':
							break;
						case 'Netscape':
						default:
							alert($scope.tranz.noPromotions);
					}
					$window.location.href='#/home';
				}else{
					$scope.promotionz=data;
					for(var i=0;i<$scope.promotionz.length;i++){
						$scope.promotionz[i].promotion_start_date=GEMathFactory.showDateY2($scope.promotionz[i].promotion_start_date);
						$scope.promotionz[i].promotion_end_date=GEMathFactory.showDateY2($scope.promotionz[i].promotion_end_date);
					}
				}
//				alert('promotionz='+JSON.stringify($scope.promotionz));
			},
			function(data){
				window.location.href='#/home';
			}
		);
		$scope.tranz=FEViewTranslationFactory.getTranslations('promotions');
		$scope.expressPromo=function(promotion){
			return GEPromotionFactory.expressPromo(promotion);
		};
	})
;