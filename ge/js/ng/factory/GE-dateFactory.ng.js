angular.module('GE-dateFactory',[])
	.factory('GEDateFactory',function(GEMathFactory){
		var factory={},
			weekDays={
				fr:[
					"lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche"
				],
				nl:[
					"maandag","dinsdag","woensdag","donderdag","vrijdag","zaterdag","zondag"
				]
			};
		factory.getFormalDateAndTime=function(dateString){
			var date=new Date(dateString);
			return {
				date:""+GEMathFactory.roundNumber(date.getDate(),2,10)+"/"+GEMathFactory.roundNumber(date.getMonth(),2,10)+"/"+GEMathFactory.roundNumber(date.getFullYear(),4,10),
				time:""+GEMathFactory.roundNumber(date.getHours(),2,10)+":"+GEMathFactory.roundNumber(date.getMinutes(),2,10)+":"+GEMathFactory.roundNumber(date.getSeconds(),2,10)
			};
		};
		factory.getCorrectDateString=function(dateString){
			var ds=dateString.replace(" ","T")+"Z";
			console.log('ds='+ds);
			return ds;
		};
		factory.getWeekDays=function(languageCode){
			if(typeof(weekDays[languageCode])!='undefined'){
				return weekDays[languageCode];
			}
			return [];
		};
/*		factory.getFormalDate=function(dateString){
			var date=new Date(dateString);
			return ""+date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
		};
		factory.getFormalTime=function(dateString){
			var date=new Date(dateString);
			return ""+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
		};
*/		return factory;
	})
;