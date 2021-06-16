angular.module('GE-photoGalleryFactory',[])
	.factory('GEPhotoGalleryFactory',function($http,GEDataTransformerFactory,GELanguageFactory){
		var languagez=GELanguageFactory.getLanguages();
		var factory={
			photoBlocks:[
			{
				id:1,
				title:{
					fr:"Boîte magique",
					nl:"Toverdoos"
				},
				pics:["IMG_0746","IMG_0747","IMG_0748","IMG_0749","IMG_0750","IMG_0751","IMG_0752","IMG_0753","IMG_0754","IMG_0755","IMG_0756"]
			},
			{
				id:2,
				title:{
					fr:"Viande",
					nl:"Vlees"
				},
				pics:["IMG_0758","IMG_0759","IMG_0760","IMG_0764","IMG_0765","IMG_0766","IMG_0767","IMG_0768","IMG_0770"]
			},
			{
				id:3,
				title:{
					fr:"Assiettes frites",
					nl:"Frietenschotels"
				},
				pics:["image1","image2"]
			}]
		};
		factory.getGalleryPics=function(callBackSuccess,callBackError){
			var pbz=[],lang=GELanguageFactory.getLanguage();
			for(var i=0;i<factory.photoBlocks.length;i++){
				pbz.push(
					{
						id:factory.photoBlocks[i].id,
						pics:factory.photoBlocks[i].pics,
						title:factory.photoBlocks[i].title[lang.code]});
			}
			if(callBackSuccess instanceof Function){
				callBackSuccess(pbz)
			}else{
				callBackError(pbz);
			}
		};
		return factory;
	})
;