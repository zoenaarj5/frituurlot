angular.module('GE-promotionFactory',[])
	.factory('GEPromotionFactory',function($http,GEDataTransformerFactory,GELanguageFactory){
		var factory={};
		var promotionTypez={
			'fr':[
				{		
					code:'PC',
					name:'Pourcent'			
				},{
					code:'MI',
					name:'Montant fixe'	
				}
			],
			'nl':[
				{		
					code:'PC',
					name:'Percent'		
				},{
					code:'MI',
					name:'Gefixd waard'	
				}
			]
		};
		factory.getPromotionTypes=function(){
			var languageCode=GELanguageFactory.getLanguage().code;
			return promotionTypez[languageCode];
		};
		factory.addPromotion=function(promoId,promoType,promoValue,startDate,endDate,callBackSuccess,callBackError){
			var inputData={
				promotableId:promoId,
				type:promoType,
				value:promoValue,
				startDate:startDate.getFullYear()+'-'+(startDate.getMonth()+1)+'-'+startDate.getDate(),
				endDate:endDate.getFullYear()+'-'+(endDate.getMonth()+1)+'-'+endDate.getDate()
			};
			alert('input data = '+JSON.stringify(inputData));
			$http({
				method:'post',
				data:GEDataTransformerFactory.transform(inputData),
				headers:{ContentType:'application/json'},
				url:'../ge/model/service/addPromotion.ws.php'
			}).success(function(data,status,headers,config){
				if(callBackSuccess instanceof Function){
					callBackSuccess(data);
				}
			}).error(function(){
				if(callBackSuccess instanceof Function){
					callBackError(data);
				}
			})
		};
		factory.getPromotions=function(callBackSuccess,callBackError){
//			alert('about to get promotions...');
			var languageCode=GELanguageFactory.getLanguage().code;
		    $http({
				method:'post',
				data:GEDataTransformerFactory.transform({language:languageCode}),
				headers:{ContentType:'application/json'},
				url:'../ge/model/service/getPromotions.ws.php'
			})
			.success(function(data,status,headers,config){
//				console.log('success! promotions data='+JSON.stringify(data));
				var myData=data.data;
				if(callBackSuccess instanceof Function){
					callBackSuccess(myData);
				}
			})
			.error(function(data,status,headers,config){
				console.log('error! failed promotions data='+JSON.stringify(data));
				var myData=data.data;
				if(callBackError instanceof Function){
					callBackError(myData);
				}
			});
		};
		factory.updatePromotion=function(promoId,promoData,callBackSuccess,callBackError){
			var fieldz=['type','value','startDate','endDate'];
			var inputData={	promoId:promoId };	
			for(var i=0;i<fieldz.length;i++){
				if(typeof(promoData[fieldz[i]])!='undefined'){
					switch(fieldz[i]){
						case 'startDate':
							var startDate=promoData[fieldz[i]];
							inputData[fieldz[i]]=startDate.getFullYear()+'-'+(startDate.getMonth()+1)+'-'+startDate.getDate();
							break;
						case 'endDate':
							var endDate=promoData[fieldz[i]];
							inputData[fieldz[i]]=endDate.getFullYear()+'-'+(endDate.getMonth()+1)+'-'+endDate.getDate()
							break;
						case 'value':
						case 'type':
							inputData[fieldz[i]]=promoData[fieldz[i]];
							break;
					}
				}
			}
			var inputData={
				promoId:promoId,
				type:promoType,
				value:promoValue,
				startDate:startDate.getFullYear()+'-'+(startDate.getMonth()+1)+'-'+startDate.getDate(),
				endDate:endDate.getFullYear()+'-'+(endDate.getMonth()+1)+'-'+endDate.getDate()
			};
			alert('input data = '+JSON.stringify(inputData));
			$http({
				method:'post',
				data:GEDataTransformerFactory.transform(inputData),
				headers:{ContentType:'application/json'},
				url:'../ge/model/service/updatePromotion.ws.php'
			}).success(function(data,status,headers,config){
				if(callBackSuccess instanceof Function){
					callBackSuccess(data);
				}
			}).error(function(){
				if(callBackSuccess instanceof Function){
					callBackError(data);
				}
			})
		};
		factory.expressPromo=function(promotion){
			if(typeof(promotion.promotion_value)=='undefined' || promotion.promotion_value==null){
				return '';
			}
			switch(promotion.promotion_type){
				case 'PC':
					return '-'+promotion.promotion_value+'%';
				case 'MI':
					return '- € '+promotion.promotion_value;
				default:
					return '';
			}
		};
		return factory;
	})
;