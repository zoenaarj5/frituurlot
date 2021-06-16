angular.module('GE-promotionAdvertFactory',[])
	.factory('GEPromotionAdvertFactory',function($http,GEDataTransformerFactory,GELanguageFactory){
		var languagez=GELanguageFactory.getLanguages();
		var factory={
			promoAdz:[
			{
				id:1,
				messages:{
					fr:[
						"Lundi et mardi",
						"Hamburger",
						"100% pur boeuf",
						"€ 1,50"
					],
					nl:[
						"Maandag en dinsdag",
						"Hamburger",
						"100% pure rundvlees",
						"€1,50"
					]
				},
				pics:["IMG_0149","IMG_0151","IMG_0152","IMG_0153","IMG_0164","IMG_0166","IMG_0706"]
			}/*,
			{
				id:2,
				messages:{
					fr:[
						"Mercredi",
						"Hot dog Papa",
						"€ 1,55"
					],
					nl:[
						"Maandag en dinsdag",
						"Hot dog Papa",
						"€1,55"
					]
				},
				pics:["IMG_0152","IMG_0153","IMG_0164","IMG_0706"]
			}*/]
		};
		factory.getPromoAdverts=function(callBackSuccess,callBackError){
			var adz=[],lang=GELanguageFactory.getLanguage();
			for(var i=0;i<factory.promoAdz.length;i++){
				adz.push(
					{
						id:factory.promoAdz[i].id,
						pics:factory.promoAdz[i].pics,
						messages:factory.promoAdz[i].messages[lang.code]});
			}
			if(callBackSuccess instanceof Function){
				callBackSuccess(adz)
			}else{
				callBackError(adz);
			}
		};
		return factory;
	})
;