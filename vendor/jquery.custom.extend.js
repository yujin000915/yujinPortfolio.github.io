/*
jQuery.extend({   httpData: function( xhr, type, s ) {                           
	var ct = xhr.getResponseHeader("content-type"),                                 
		xml = type == "xml" || !type && ct && ct.indexOf("xml") >= 0,                                 
		script = type == "script" || !type && ct && ct.indexOf("script") >= 0,                                 
		json = type == "json" || !type && ct && ct.indexOf("json") >= 0,                                 
		data = xml ? xhr.responseXML : xhr.responseText;                                                                  
		if ( xml && data.documentElement.tagName == "parsererror" )                                        
				throw "parsererror";                                                                 
		// Allow a pre-filtering function to sanitize the response                                
		// s != null is checked to keep backwards compatibility                                
		if( s && s.dataFilter )                                         
				data = s.dataFilter( data, type );                                                             
		// If the type is "script", eval it in global context                          
		if ( script )                                        
				jQuery.globalEval( data );                                
		// Get the JavaScript object, if JSON is used.                   
		if ( json )                                        
				data = eval("(" + data + ")");                              
		return data;        
	} 
}); */

(function($){
	$.fn.alphanumeric = function(p) { 
		p = $.extend({
			ichars: "!@#$%^&*()+=[]\\\';,/{}|\":<>?~`.-_ ",
			nchars: "",
			allow: ""
		  }, p);	
		
		//한글 입력 방지
		$(this).css('ime-mode', 'disabled');
		
		return this.each(function(){
			if (p.nocaps) p.nchars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			if (p.allcaps) p.nchars += "abcdefghijklmnopqrstuvwxyz";
			
			s = p.allow.split('');
			for ( var i=0;i<s.length;i++) if (p.ichars.indexOf(s[i]) != -1) s[i] = "\\" + s[i];
			p.allow = s.join('|');
			
			var reg = new RegExp(p.allow,'gi');
			var ch = p.ichars + p.nchars;
			ch = ch.replace(reg,'');

			$(this).keypress(function (e){
				if (!e.charCode) k = String.fromCharCode(e.which);
					else k = String.fromCharCode(e.charCode);
				
				if (ch.indexOf(k) != -1) e.preventDefault();
				if (e.ctrlKey&&k=='v') e.preventDefault();
			});
				
			$(this).bind('contextmenu',function () {return false;});
		});
	};

	$.fn.numeric = function(p) {
	
		var az = "abcdefghijklmnopqrstuvwxyz";
		az += az.toUpperCase();

		p = $.extend({
			nchars: az
		  }, p);	
		  	
		return this.each (function(){				
				$(this).alphanumeric(p);
			});
	};
	
	$.fn.alpha = function(p) {

		var nm = "1234567890";

		p = $.extend({
			nchars: nm
		  }, p);	

		return this.each (function(){				
				$(this).alphanumeric(p);
			});
	};
	
	$.fn.keyfilter = function(ch){
		$(this).keypress(function (e){
			if (!e.charCode) k = String.fromCharCode(e.which);
				else k = String.fromCharCode(e.charCode);
			
			if (ch.indexOf(k) != -1) e.preventDefault();
			if (e.ctrlKey&&k=='v') e.preventDefault();
		});
	};

})(jQuery);


/**
 * 해당값 Byte 가져오기
 * 예) 호출 : $("test").getBytes();
 */
$.fn.getBytes = function(){
	var str = this.val();
 	var l = 0;
 	for (var i=0; i<str.length; i++) l += (str.charCodeAt(i) > 128) ? 2 : 1;
 	return l;
};

/**
 * Form 을 json 으로 serialize함 (Serialize Form to json)
 * 예) 호출 : $('#frm').serializeJSON();
 *     결과 : { "fieldName1": "data1", "fieldName2": "data2", "fieldName3": "data3"}
 */
$.fn.serializeJSON = function() { 
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {    	
    	if (o[this.name]) {
            if (!o[this.name].push) { 
            	o[this.name] = [o[this.name]];
            }
            if($("#"+this.name).attr("view") == "number"){
            	o[this.name].push(this.value.replaceAll(",","") || '');
            }else{
            	o[this.name].push(this.value || '');
            }
        } else { 
        	if($("#"+this.name).attr("view") == "number"){
            	o[this.name] = this.value.replaceAll(",","") || '';
            }else{
            	o[this.name] = this.value || '';
            }
        } 
    }); 
    return o; 
};

//벨류값없는것 제거
$.fn.serializeNoVal = function() { 
    var o = "";
    var a = this.serializeArray();
    var join = "";
    $.each(a, function() {
        if(this.value){
        	o += join+this.name +"="+ encodeURIComponent(this.value);
        	join = "&";
        }
    });
    
    return o; 
}; 

/**
 * 돈형식으로 변환(콤마)
 * $("#num").toPrice();
 */
(function($) {
    $.fn.toPrice = function(cipher) {
    	
    	var strb, len, revslice;
        var v = $(this).attr('type') == 'text' ? "input" : "html"
        
        strb = (v == "input" ? $(this).val().toString() : $(this).text().toString());
        strb = strb.replace(/,/g, '');
        strb = $(this).getOnlyNumeric();
        strb = parseInt(strb, 10);
        if (isNaN(strb))
            return (v == "input" ? $(this).val('') : $(this).html(''));

        strb = strb.toString();
        len = strb.length;

        if (len < 4)
            return $(this).val(strb); (v == "input" ? $(this).val(strb) : $(this).html(strb));

        if (cipher == undefined || !isNumeric(cipher))
            cipher = 3;

        count = len / cipher;
        slice = new Array();

        for ( var i = 0; i < count; ++i) {
            if (i * cipher >= len)
                break;
            slice[i] = strb.slice((i + 1) * -cipher, len - (i * cipher));
        }

        revslice = slice.reverse();
        return (v == "input" ? $(this).val(revslice.join(',')) : $(this).html(revslice.join(',')));   
    }

    $.fn.getOnlyNumeric = function(data) {
        var chrTmp, strTmp;
        var len, str;
        var v = $(this).attr('type') == 'text' ? "input" : "html"
        
        if (data == undefined) {
            str = (v == "input" ? $(this).val() : $(this).text());
        } else {
            str = data;
        }

        len = str.length;
        strTmp = '';

        for ( var i = 0; i < len; ++i) {
            chrTmp = str.charCodeAt(i);
            if ((chrTmp > 47 || chrTmp <= 31) && chrTmp < 58) {
                strTmp = strTmp + String.fromCharCode(chrTmp);
            }
        }

        if (data == undefined)
            return strTmp;
        else
            return (v == "input" ? $(this).val(strTmp) : $(this).html(strTmp));
    }

    var isNumeric = function(data) {
        var len, chrTmp;

        len = data.length;
        for ( var i = 0; i < len; ++i) {
            chrTmp = str.charCodeAt(i);
            if ((chrTmp <= 47 && chrTmp > 31) || chrTmp >= 58) {
                return false;
            }
        }

        return true;
    }
})(jQuery);


var __loading = true;
$.extend({
	defaultAjaxOption : {
		type		: 'POST',
		data 		: '',
		dataType	: 'json',
		onsubmit	: true,
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		loading : true	
	},
	mvcAjax	: function (o) {
		
		var errorMsg = o.errorMsg;
		if(errorMsg == undefined) errorMsg = true;
		
		var	tform;
		var target;		//결과를 받을 대상

		// 옵션 병합
		var ajaxOption = $.extend({}, jQuery.ajaxSettings, jQuery.defaultAjaxOption);
		if (o) {
			o	= $.extend({}, ajaxOption, o);
		}
		
		// form 이 지정되었을때, url과 data 설정 및 onsubmit 수행
		if (o.form) {

			if (typeof(o.form) == "string") {
				tform	= $("form[name=" + o.form + "]:first");
			} else {
				tform	= $(o.form);
			}
			if (!tform || tform.length == 0) {
				alert("MVC Ajax 실행 대상 폼 " + o.form + "을 찾을 수 없습니다.");
				return null;
			}
			o.url	= tform.attr("action");
			o.data	= tform.serialize();

			var onsubmit	= tform.attr("onsubmit");
			if (o.onsubmit == true && onsubmit != null && jQuery.isFunction(onsubmit) && !onsubmit()) {
				return null;
			}
			o.type		= tform.attr("method");
		}
		
		// 결과 받을 대상이 지정되어 있을때
		if (o.target) {
			target	= (typeof(o.target) == "string")? $("#" + o.target) : $(o.target);
		}
		
		// callback function wrapping
		var beforeSend	= o.beforeSend;
		var success		= o.success;
		var error		= o.error;
		
		o.beforeSend	= function(xhr) {
			xhr.setRequestHeader("AJAX", true);
			
			if (beforeSend && !beforeSend(xhr))
				return false;
			
			return true;
		};
		
		o.success		= function(data, ts) {
			if (target && data)
				target.html(data);

			if (success)
				success(data, ts);
		};
		
		o.error			= function (xhr, ts, et) {
			if(errorMsg){
				//alert("Ajax Request " + ts + " : " + xhr.status + " " + xhr.statusText);
				alert("통신 오류가 발생하였습니다" + " : [error code = " + xhr.status + " " + xhr.statusText+"]");
			}
			if (error) error(xhr, ts, et);
		};

		__loading = o.loading;
		
		if(__loading){
		    
			$(document).ajaxStart(function(os){
				if(__loading) loading(__loading);
			});
			$(document).ajaxStop(function(o){
				if(__loading) loading(false);
			});
		}
		
		return $.ajax(o);
	},
	uploadAjax : function(frm, o) {
		
		// 옵션 병합
		var ajaxOption = $.extend({}, jQuery.ajaxSettings, jQuery.defaultAjaxOption);
		if (o) {
			o	= $.extend({}, ajaxOption, o);
		}
		
		var target;
		var targetName = frm.attr("target");
		
		if (typeof(targetName) == "string") {
			target	= $("iframe[name=" + targetName + "]:first");
		} else {
			target	= $("#" + targetName);
		}
		if (target.length == 0) {
			alert('target 없음!!!');
			return;
		}
		
		function uploadCallback() {
			var data, doc;
			var xhr = {};
			
			var target = document.getElementById(targetName);
			doc = target.contentWindow ? target.contentWindow.document : target.contentDocument ? target.contentDocument : target.document;
			var isXml = o.dataType == 'xml' || $.isXMLDoc(doc);
			if (!isXml && (doc.body == null || doc.body.innerHTML == '')) {
				return;
			}
			
			xhr.responseText = doc.body ? doc.body.innerHTML : null;
			xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
			xhr.getResponseHeader = function(header) {
				var headers = {
					'content-type' : o.dataType
				};
				return headers[header];
			};
			
		    var data = (o.dataType == "xml" || !o.dataType) ? xhr.responseXML : xhr.responseText;
			if (o.dataType == 'json' || o.dataType == 'script') {
				var ta = $('textarea', doc)[0];
				if (ta)
					xhr.responseText = ta.value;
				else {
					var pre = $('pre', doc)[0];
					if (pre)
						xhr.responseText = pre.innerHTML;
				}			  
			} else if (o.dataType == 'xml' && !xhr.responseXML && xhr.responseText != null) {
				xhr.responseText = doc.body ? doc.body.innerHTML : null;
				xhr.responseXML = toXml(xhr.responseText);
			}
			data = $.httpData(xhr, o.dataType);
			
		    if (o.success) {
		    	$(target).unbind("load");
		        o.success(data, "success");
		    }
		    
			if (o.error)
				o.error(data, "error");

		    if (o.global)
		        jQuery.event.trigger( "ajaxSuccess", [xhr, o] );
		}
		
		target.load(uploadCallback);
		frm.submit();
		
	},
	//jquery 1.7 이후부터...
	httpData: function( xhr, type, s ) {
		var ct = xhr.getResponseHeader("content-type"),
		xml = type == "xml" || !type && ct && ct.indexOf("xml") >= 0,
		script = type == "script" || !type && ct && ct.indexOf("script") >= 0,
		json = type == "json" || !type && ct && ct.indexOf("json") >= 0,
		data = xml ? xhr.responseXML : xhr.responseText;
		 
		if ( xml && data.documentElement.tagName == "parsererror" )
			throw "parsererror";
		 
		// Allow a pre-filtering function to sanitize the response
		// s != null is checked to keep backwards compatibility
		if( s && s.dataFilter )
			data = s.dataFilter( data, type );
		 
		// If the type is "script", eval it in global context
		if ( script ) 
			jQuery.globalEval( data );
		
		// Get the JavaScript object, if JSON is used.
		if ( json )
		        data = eval("(" + data + ")");
		
		return data;
	}
});

/*
$.ajaxSetup({
	
	beforeSend: function(xhr) {
        xhr.setRequestHeader("AJAX", true);
    }
	
	, error: function(xhr, status, err) {
        //Unauthorized 
        if (xhr.status == 401) {
            alert('go 401 page\n' + err);
        }
        //Forbidden
        else if (xhr.status == 403) {
            alert('go 403 page\n' + err);
        }
        //Not Acceptable (세션종료) 
        else if (xhr.status == 406) {
            alert('go login page\n' + err);
        }
        else if (xhr.status == 500) {
            alert('go 500 page\n' + err);
        }
        else {
            alert('go exception page\n' + err);
        }
    }
});*/