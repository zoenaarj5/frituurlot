angular.module('AD-formVerifierFactory',[])
	.factory('ADFormVerifierFactory',function(){
		var regex={
			'promoAdd':[
				{	id:'promoValue',		pattern:'^\\d{1,2}(\\.\\d+)?$'	},
				{	id:'promoEndDate',		pattern:'^\\d{4}-\\d{2}-\\d{2}$'},
				{	id:'promoStartDate',	pattern:'^\\d{4}-\\d{2}-\\d{2}$'}
			]
		};
		var factory={};
		factory.verifyForm=function(formName){
			console.log('verifying form "'+formName+'"...');
			var fieldz=null;
			if(typeof(regex[formName]!='undefined')){
				fieldz=regex[formName];
				var inc='incorrectField',prefix='input-';
				var errorz=[];
				for(var i=0;i<fieldz.length;i++){
					var elt=document.getElementById(prefix+fieldz[i].id);
					var	pat=new RegExp(fieldz[i].pattern);
						console.log('pat = '+pat+', value = '+elt.value);
					elt.classList.remove(inc);
					if(pat.test(elt.value)==false){
						errorz.push(fieldz[i].id);
						elt.classList.add(inc);
					}
				}
				console.log('errorz = '+JSON.stringify(errorz));
				return errorz;
			}else{
				return false;
			}
		};
		factory.verifyElement=function(formName,elementId){
			console.log('verifying element "'+elementId+'"...');
			var prefix='input-';
			var elt=document.getElementById(prefix+elementId);
			var fieldz=regex[formName];
			if(typeof(fieldz)!='undefined'){
				var inc='incorrectField';
				for(var i=0;i<fieldz.length;i++){
					if(fieldz[i].id==elementId){
						var pat=new RegExp(fieldz[i].pattern);
						elt.classList.remove(inc);
						if(pat.test(elt.value)==false){
							elt.classList.add(inc);
						}
						return;
					}
				}
			}
		};
		return factory;
	});