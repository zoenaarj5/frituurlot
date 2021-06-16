angular.module('GE-languageFactory',[])
	.factory('GELanguageFactory',function($window){
		var languagez=[{code:'fr',name:'français'},{code:'nl',name:'nederlands'}];
		var language=null;
		var lslc=localStorage.languageCode;
		var cpt=0;
		while(cpt<languagez.length && languagez[cpt].code!=lslc){
			cpt++;
		}
		if(cpt<languagez.length){
			language=languagez[cpt];
		}else{
			language=languagez[1];
			localStorage.languageCode=language.code;
		}
		var factory={
			getLanguages:function(){
				return languagez;
			},
			initLanguage:function(){
				language=languagez[0];
				window.location='#/';
			},
			setLanguage:function(languageCode){
				for(var i=0;i<languagez.length;i++){
					if(languagez[i].code==languageCode){
						language=languagez[i];
						localStorage.languageCode=languagez[i].code;
/*						htmlz=document.getElementsByTagName('html');
						htmlz[0].setAttribute('lang',languageCode);*/
//						$('html').attr('lang',languageCode);
						$window.location.reload();
					}
				}
			},
			getLanguage:function(){
				return language;
			}
		};
		return factory;
	})
;