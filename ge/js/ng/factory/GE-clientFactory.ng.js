angular.module('GE-clientFactory',[])
	.factory('GEClientFactory',function($http,GEDataTransformerFactory){
		var factory={};
		factory.getClients=function(callBackSuccess,callBackError){
			alert('starting getting clients...');
			$http({
				method:'post',
				data:GEDataTransformerFactory.transform({}),
				headers:{ContentType:'application/json'},
				url:'../ge/model/service/getClients.ws.php'
			})
			.success(function(data,status,headers,config){
//				alert('getClients=success! data='+JSON.stringify(data));
				if(callBackSuccess instanceof Function){
					callBackSuccess(data);
				}
			})
			.error(function(data,status,headers,config){
//				alert('getClients=error! data='+JSON.stringify(data));
				if(callBackError instanceof Function){
					callBackError(data);
				}
			});
		};
		return factory;
	})
;