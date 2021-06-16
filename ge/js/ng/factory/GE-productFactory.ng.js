angular.module('GE-productFactory',[])
	.factory('GEProductFactory',function($http,GEDataTransformerFactory,GELanguageFactory){
		var factory={};
		factory.getProductToGroupLinks=function(callBackSuccess,callBackError){
			var language=GELanguageFactory.getLanguage().code;
			var inputData=GEDataTransformerFactory.transform({language:language});
//			alert('input data = '+JSON.stringify(inputData));
			$http({
				method:'post',
				data:inputData,
				headers:{ContentType:'application/json'},
				url:'../ge/model/service/getProductToGroupLinks.ws.php'
			}).success(function(data,status,headers,config){
//				alert('getProductToGroupLinks = success. data = '+JSON.stringify(data));
				if(callBackSuccess instanceof Function){
					callBackSuccess(data);
				}
			}).error(function(data,status,headers,config){
//				alert('getProductToGroupLinks = error. data = '+JSON.stringify(data));
				if(callBackError instanceof Function){
					callBackError(data);
				}
			})/*.then(function(data){
				var myData=data.data;
				alert('then(product-group links)! data = '+JSON.stringify(myData));
			})*/;
		};
		factory.getProductGroups=function(callBackSuccess,callBackError){
			var language=GELanguageFactory.getLanguage().code;
			var inputData=GEDataTransformerFactory.transform({language:language});
//			alert('input data = '+JSON.stringify(inputData));
			$http({
				method:'post',
				data:inputData,
				headers:{ContentType:'application/json'},
				url:'../ge/model/service/getProductGroups.ws.php'
			}).success(function(data,status,headers,config){
//				alert('getProductGroups = success. data = '+JSON.stringify(data));
				if(callBackSuccess instanceof Function){
					callBackSuccess(data);
				}
			}).error(function(data,status,headers,config){
//				alert('getProductGroups = error. data = '+JSON.stringify(data));
				if(callBackError instanceof Function){
					callBackError(data);
				}
			})/*.then(function(data){
				var myData=data.data
				alert('then(product groups)! data = '+JSON.stringify(myData));
			})*/;
		};
		factory.getProducts=function(callBackSuccess,callBackError){
			var language=GELanguageFactory.getLanguage().code;
			$http({
				method:'post',
				data:GEDataTransformerFactory.transform({language:language}),
				headers:{ContentType:'application/json'},
				url:'../ge/model/service/getProducts.ws.php'
	  		})
			.success(function(data,status,headers,config){
				if(callBackSuccess instanceof Function){
					callBackSuccess(data);
				}
			})
			.error(function(data,status,headers,config){
				if(callBackError instanceof Function){
					callBackError(data);
				}
			});
		};
		factory.updateProduct=function(productId,productData,callBackSuccess,callBackError){
			var fieldz=['name','description','active'];
			var languageCode=GELanguageFactory.getLanguage().code;
			var toChange={productId:productId};
			for(var i=0;i<fieldz.length;i++){
				if(typeof(productData[fieldz[i]])!='undefined'){
					switch(fieldz[i]){
						case 'name':
						case 'description':
							toChange[languageCode+'-'+fieldz[i]]=productData[fieldz[i]];
							break;
						default:
							toChange[fieldz[i]]=productData[fieldz[i]];
					}
				}
			}
			alert('data to change = '+JSON.stringify(toChange));
			$http({
				method:'post',
				data:GEDataTransformerFactory.transform(toChange),
				headers:{ContentType:'application/json'},
				url:'../ge/model/service/updateProduct.ws.php'
	  		})
			.success(function(data,status,headers,config){
				alert('SUCCESS. data = '+JSON.stringify(data));
				if(callBackSuccess instanceof Function){
					callBackSuccess(data);
				}
			})
			.error(function(data,status,headers,config){
				alert('ERROR. data = '+JSON.stringify(data));
				if(callBackError instanceof Function){
					callBackError(data);
				}
			});
		}
		return factory;
	});