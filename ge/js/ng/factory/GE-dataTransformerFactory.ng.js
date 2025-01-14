// Your app's root module...
angular.module('GE-dataTransformerFactory', [])
	.factory('GEDataTransformerFactory',function(){
		return{

			transform : function(obj) {
//				alert('obj = '+JSON.stringify(obj));
				var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
				  
				for(name in obj) {
			  	value = obj[name];
			    
			  	if(value instanceof Array) {
			    for(i=0; i<value.length; ++i) {
			      subValue = value[i];
			      fullSubName = name + '[' + i + ']';
			      innerObj = {};
			      innerObj[fullSubName] = subValue;
			      query += this.transform(innerObj) + '&';
			    }
			  }
			  else if(value instanceof Object) {
			    for(subName in value) {
			      subValue = value[subName];
			      fullSubName = name + '[' + subName + ']';
			      innerObj = {};
			      innerObj[fullSubName] = subValue;
			      query += this.transform(innerObj) + '&';
			    }
			  }
			  else if(value !== undefined && value !== null)
			    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
			}
//			  alert('obj = '+JSON.stringify(obj)+', query = '+JSON.stringify(query));
			return query.length ? query.substr(0, query.length - 1) : query;
			}
		};
	})
;