angular.module('FE-userLogFactory',[])
	.factory('FEUserLogFactory',function($http,GEDataTransformerFactory,GELanguageFactory){
		var factory={};
		var lastSession=null;
		factory.unlogClient=function(){
//			alert('unlogging client...');
			localStorage.removeItem('lastSession');
			factory.checkLog();
		};
		factory.logClient=function(userData,callBackSuccess,callBackError){
//			alert('logging client. UserData='+JSON.stringify(userData));
			$http({
				method:'post',
				data:GEDataTransformerFactory.transform(userData),
				headers:{ContentType:'application/json'},
				url:'../ge/model/service/logClient.ws.php'
			})
			.success(function(data,status,headers,config){
//				alert('logClient=success! data='+JSON.stringify(data));
				var userFound=data['data'];
//				alert('type of user found = '+typeof(userFound));
				if(typeof(userFound)=='number'){
					factory.unlogClient();
//					alert('login failed.');
					$('#login-witness').addClass('wrong-user');
				}else{
//					alert('user found not integer.');
					localStorage.lastSession=JSON.stringify(userFound);
//					alert('localStorage.lastSession = '+localStorage.lastSession);
					$('#login-witness').removeClass('wrong-user');
				}
				factory.checkLog();
				if(callBackSuccess instanceof Function){
//					alert('calling back for success...');
					callBackSuccess(data);
				}
			})
			.error(function(data,status,headers,config){
//				alert('logClient=error! data='+JSON.stringify(data));
				if(callBackError instanceof Function){
//					alert('calling back for error...');
					callBackError(data);
				}
			});
		};
		factory.getLastSession=function(){
			var ls=localStorage.lastSession;
			if(typeof(ls)=='undefined'){
				return ls;
			}
			return JSON.parse(localStorage.lastSession);
		};
		factory.checkLog=function(){
//			alert('checking if logged user...');
			var ls=localStorage.lastSession;
//			alert('ls = '+ls+',typeof(ls) = '+typeof(ls));
			if(typeof(ls)=='undefined'){
				$('#logged-user-data').removeClass('logged-user-box').addClass('unlogged-user-box');
				$('#logged-user-data #logged-user-first-name').text('');
				$('#logged-user-data #logged-user-name').text('');
				$('#logged-user-data #logged-user-email').text('');
				$('#logged-user-data #logged-user-firm-name').text('');
				$('#logged-user-data #logged-user-firm-phone').text('');
				$('#logged-user-data #logged-user-firm-fax').text('');
			}else{
				var eles=JSON.parse(ls);
				$('#logged-user-data').removeClass('unlogged-user-box').addClass('logged-user-box');
				$('#logged-user-data #logged-user-first-name').text(eles.client_contact_first_name);
				$('#logged-user-data #logged-user-name').text(eles.client_contact_name);
				$('#logged-user-data #logged-user-email').text(eles.client_contact_email);
				$('#logged-user-data #logged-user-firm-name').text(eles.client_firm_name);
				$('#logged-user-data #logged-user-firm-phone').text(eles.client_firm_phone);
				$('#logged-user-data #logged-user-firm-fax').text(eles.client_firm_fax);
			}
		};
		return factory;
	})
;