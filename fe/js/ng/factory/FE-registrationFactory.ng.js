angular.module('FE-registrationFactory',[])
	.factory('FERegistrationFactory',function($http,GEDataTransformerFactory,GELanguageFactory){
		var factory={};
		factory.getSecurityQuestions=function(callBackSuccess,callBackError){
			var lang=GELanguageFactory.getLanguage();
			$http({
				method:'post',
				data:GEDataTransformerFactory.transform({language:lang.code}),
				headers:{ContentType:'application/json'},
				url:'../ge/model/service/getSecurityQuestions.ws.php'
			})
			.success(function(data,status,headers,config){
//				alert('getSecurityQuestions=success! data='+JSON.stringify(data));
				if(callBackSuccess instanceof Function){
					callBackSuccess(data);
				}
			})
			.error(function(data,status,headers,config){
//				alert('getSecurityQuestions=error! data='+JSON.stringify(data));
				if(callBackError instanceof Function){
					callBackError(data);
				}
			});
		};
		factory.addClient=function(inputData,callBackSuccess,callBackError){
//			alert('input data = '+JSON.stringify(inputData));
			$http({
				method:'post',
				data:GEDataTransformerFactory.transform(inputData),
				headers:{ContentType:'application/json'},
				url:'../ge/model/service/addClient.ws.php'
			})
			.success(function(data,status,headers,config){
				alert('addClient=success! data='+JSON.stringify(data));
				if(callBackSuccess instanceof Function){
					callBackSuccess(data);
				}
			})
			.error(function(data,status,headers,config){
				alert('addClient=error! data='+JSON.stringify(data));
				if(callBackError instanceof Function){
					callBackError(data);
				}
			});
		};
		return factory;
	})
;