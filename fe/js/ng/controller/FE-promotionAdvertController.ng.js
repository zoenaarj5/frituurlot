angular.module("FE-promotionAdvertController",[])
	.controller("FEPromotionAdvertController",function($interval,$scope,$timeout,$window,FEViewTranslationFactory,GEPromotionAdvertFactory){
		$scope.tranz=FEViewTranslationFactory.getTranslations("promotionAdverts");
		$scope.advertz=[];
		function animateAdverts(){
			$(".advert-pic-cont").css("border-color","pink").click(
				function(){
					alert("Hey!");
				}
			);/*
			for(var i=0;i<$scope.advertz.length;i++){
			}*/
		}
		GEPromotionAdvertFactory.getPromoAdverts(
			function(data){
				$scope.advertz=data;
//				alert("about to hide and show...");
				hideText(".advert-message-box",2000,5000);
			},function(data){
				alert("Internal error.");
			}
		);
		$scope.hiddenBoxClass="hidden-box";
		function hideText(selector,delayOne,delayCB){
//			$(selector).hide("slow");
			$(selector).addClass($scope.hiddenBoxClass);
			$timeout(function(){
				showText(selector,delayCB,delayOne);
			},delayOne);
		};
		function showText(selector,delayOne,delayCB){
//			$(selector).show("slow");
			$(selector).removeClass($scope.hiddenBoxClass);
			$timeout(function(){
				hideText(selector,delayCB,delayOne);
			},delayOne);
		};
	})
;