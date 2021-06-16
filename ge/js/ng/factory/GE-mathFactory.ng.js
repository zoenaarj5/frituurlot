angular.module('GE-mathFactory',[])
	.factory('GEMathFactory',function(){
		var factory={};
		factory.roundNumber=function(number,dl,basis){
			var bas=(typeof(basis)!='undefined' && parseInt(basis)==basis)?basis:10;
//			console.log('bas='+bas+', number='+number+',dl='+dl+',basis='+basis);
		//dl=digit limit after decimal point
			if(typeof(number) != 'undefined' && number!=NaN && ''+number==''+parseFloat(number)){
				var multi=number;
//				console.log('multi start='+multi+',basis='+bas);
				multi=parseFloat(multi)*Math.pow(bas,dl);
//				console.log('multi after first powering='+multi);
				multi=Math.floor(multi+0.5);
//				console.log('multi after adding 0.5 + flooring='+multi);
				multi=parseFloat(multi)*Math.pow(bas,-dl);
//				console.log('multi after last powering='+multi);
/*				multi=Math.floor(multi+0.5);
				console.log('multi after adding 0.5 and flooring again='+multi);*/
				multiz=(''+multi).split('.');
				var res='';
				if(multiz.length>0){
					res+=multiz[0];
				}
				if(multiz.length>1){
					res+='.'+((dl>0)?multiz[1].substr(0,dl):2);
				}
				return res;
			}else{
				return 0;
			}
		};
		factory.showDateY4=function(sDate){
			var dateData=sDate.substr(0,10).split('-');
//			alert('dateData='+JSON.stringify(dateData));
			var sep='/';
			return dateData[2]+sep+dateData[1]+sep+dateData[0];
		};
		factory.showDateY2=function(sDate){
			var dateData=sDate.substr(0,10).split('-');
//			alert('dateData='+JSON.stringify(dateData));
			var sep='/';
			return dateData[2]+sep+dateData[1]+sep+dateData[0].substr(2,2);
		};
		factory.showTime=function(sDate){
			var dateData=sDate.substr(11,8).split(':');
//			alert('dateData='+JSON.stringify(dateData));
			var sep=':';
			return dateData[0]+sep+dateData[1]+sep+dateData[2];
		};
		factory.compareDatesY4=function(sDate1,sDate2){
			var splitter='-';
			var d1=sDate1.substr(0,10).split(splitter);
				d2=sDate2.substr(0,10).split(splitter);
			if(d1.length<3 || d2.length<3){
				return -2;
			}
			for(var i=0;i<3;i++){
				if(parseInt(d1[i])>parseInt(d2[i])) {
					return 1;
				}else if(d1[i]<d2[i]){
					return -1;
				}
			}
			return 0;
		};
		return factory;
	}
);