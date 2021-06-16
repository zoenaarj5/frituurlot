angular.module('AD-promotionsController',[])
	.controller('ADPromotionsController',function($window,$scope,ADFormVerifierFactory,GELanguageFactory,GEProductFactory,ADViewTranslationFactory,GEPromotionFactory){
		$scope.init=function(callBack){
			$scope.languagez=GELanguageFactory.getLanguages();
//			alert('languages = '+JSON.stringify($scope.languagez));
			$scope.tranz=ADViewTranslationFactory.getTranslations('promotions');
			$scope.promotionz=[];
			$scope.promoTypez=GEPromotionFactory.getPromotionTypes();
			$scope.newPromotion={type:$scope.promoTypez[0].code};
			GEPromotionFactory.getPromotions(
				function(data){
					if(typeof(data)!='undefined'){
						$scope.promotionz=data;
	//					alert('promotionz = '+JSON.stringify($scope.promotionz));
						for(var i=0;i<$scope.promotionz.length;i++){
							finalizePromotion($scope.promotionz[i]);
						}
						if(callBack instanceof Function){
//							alert('scope.promotionz = '+JSON.stringify($scope.promotionz)+'. About to call callBack..');
							callBack();
						}
					}
				},function(data){
					alert($scope.tranz.promotionsAccessError);
					$scope.toPromotions();
				}
			);
		};
		$scope.myAlert=function(){
			alert('my alert works.');
		};
		$scope.verifyForm=function(formName){
			var err=ADFormVerifierFactory.verifyForm(formName);
			if(typeof(err[0])=='undefined'){
				document.getElementById('promoAddSender').removeAttribute('disabled');
			}else{
				document.getElementById('promoAddSender').setAttribute('disabled','disabled');
			}
		};
		$scope.verifyElement=function(formName,elementId){
			return ADFormVerifierFactory.verifyElement(formName,elementId);
		};
		$scope.initAdd=function(){
			GEProductFactory.getProducts(
				function(data){
					var myData=data.data;
					if(typeof(myData)!='undefined'){
						$scope.productz=myData;
						//alert('productz = '+JSON.stringify($scope.productz));
						$scope.promoTableId=$scope.productz[0].product_promotable_id;
						//alert('promoTableId = '+$scope.promoTableId)
					}else{
						alert('Data access error.');
						$scope.toPromotions();
					}
				},
				function(data){
					alert('Data access error.');
					$scope.toPromotions();
				}
			);
		}
		$scope.fetchEditPromo=function(){
			$scope.init(
				function(){
					if(typeof(sessionStorage.editPromoId)=='undefined'){
						alert($scope.tranz.noEditPromo);
						$scope.toPromotions();
					}else{
//						alert('promotionz ='+JSON.stringify($scope.promotionz));
						$scope.editPromo=$scope.getPromotion(sessionStorage.editPromoId);
						if(typeof($scope.editPromo)=='undefined' || $scope.editPromo==null){
							alert($scope.tranz.noEditPromo);
							$scope.toPromotions();
						}
					}
//					alert('editPromo = '+JSON.stringify($scope.editPromo));
				}
			);
		};
		$scope.stopPromotion=function(){
			GEPromotionFactory.updatePromotion(
				{
					promoId:sessionStorage.editPromoId,
					stopDate:''
				},
				function(data){
					alert('OK. Result = '+JSON.stringify(data))
				},
				function(data){
					alert('NOK. Result = '+JSON.stringify(data));
				}
			);
		};
		$scope.toPromoAdd=function(){
			//alert('going to promo add...');
			$window.location.href='#/promotionAdd'			
		};
		$scope.toPromotions=function(){
			$window.location.href='#/promotions';
		};
		$scope.toPromoEdit=function(promoId){
//			alert('going to promoEdit, promoId = '+promoId);
			sessionStorage.editPromoId=promoId;
			$window.location.href='#/promotionEdit';
		};
		$scope.getPromotion=function(promoId){
			for(var i=0;i<$scope.promotionz.length;i++){
				if($scope.promotionz[i].promotion_id==promoId){
					return $scope.promotionz[i];
				}
			}
			return null;
		};
		$scope.getProduct=function(promotableId){
			for(var i=0;i<$scope.productz.length;i++){
				if($scope.productz[i].product_promotable_id==promotableId){
					return productz[i];
				}
			}
			return null;
		};
		$scope.sendPromotion=function(promotableId){
			var sep='-';
			var startDateArray=$scope.newPromotion.startDate.split(sep),
				endDateArray=$scope.newPromotion.endDate.split(sep);
			var startDate=new Date(''+startDateArray[0]+sep+startDateArray[1]+sep+startDateArray[2]),
				endDate=new Date(''+endDateArray[0]+sep+endDateArray[1]+sep+endDateArray[2]);
			alert('startDate = '+startDate+', endDate = '+endDate);
			GEPromotionFactory.addPromotion(
				$scope.promoTableId,
				$scope.newPromotion.type,
				$scope.newPromotion.value,
				startDate,endDate,
				function(data){
					alert('SUCCESS. DATA = '+JSON.stringify(data));
				},
				function(data){
					alert('ERROR. DATA = '+JSON.stringify(data));
				}
			)			
		};
		function finalizePromotion(promotion){
			promotion.productActiveImg=(promotion.product_active=='1')?'yes':'no';
			if(promotion.promotion_stop_date){
				promotion.sStopDate=promotion.promotion_stop_date;
			}else{
				promotion.sStopDate='-';
			}
			switch(promotion.promotion_type){
				case 'PC':
					promotion.sValue=''+promotion.promotion_value+'%';
					break;
				case 'MI':
					promotion.sValue='-'+promotion.promotion_value+'';
					break;
			}
		};
	})
;