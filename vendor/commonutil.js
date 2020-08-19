/**
 * 다이얼로그 열기
 * @param id
 * @param opt
 */
function showDialog(id, urls, opt){
	if (!id){ 
		alert('다이얼로그 아이디를 입력해주세요'); 
		return;
	}
	if (!urls){ 
		alert('다이얼로그 url을 입력해주세요'); 
		return;
	}
	
	var title = opt.title == null ? '' : opt.title; 
	var data = opt.data == null ? {} : opt.data;
	var width = opt.width == null ? 500 : opt.width;
	var height = opt.height == null ? 400 : opt.height;
	
	var dobj = $("#"+id);
	if (dobj.length == 0) {
		dobj = $("<div>").attr("id", id).attr("style", "vertical-align: middle;").appendTo("body");
	}

	$.mvcAjax({
		url 	: urls,
		dataType: 'html',
		data	: data,
		target 	: id,
		success : function(data, ts){
					$("#"+id).dialog({
						width		: width,		
						height		: height,
						resizable	: false,
						modal		: true,
						resizable	: false,
						title		: title
					});
				}
	});
}

/**
 * 다이얼로그 닫기
 * @param id
 * @param opt
 */
function closeDialog(id, opt){
	$("#"+id).dialog("close");
}

/**
 * 문자열치환
 */
String.prototype.replaceAll = function( str1, str2 )
{
	var temp_str = this.trim();
	temp_str = temp_str.replace(eval("/" + str1 + "/gi"), str2);
	return temp_str;
}

/**
 * 공백제거
 */
String.prototype.trim = function(str) {
	str = this != window ? this : str;
	return str.replace(/^\s+/g,'').replace(/\s+$/g,'');
}

/**
 * 오늘날짜
 */
function getToday(){
	var today = new Date();
	return today.toString("-");
}

/**
 * 날짜문자열
 */
Date.prototype.toString = function(separator) {
	if (typeof(separator) == 'undefined' || separator == "") separator = ".";
	var tmp = new Array(3);
	tmp[0] = this.getFullYear();
	tmp[1] = this.getMonth() + 1;
	tmp[2] = this.getDate();
	if (tmp[1] < 10) tmp[1] = "0" + tmp[1];
	if (tmp[2] < 10) tmp[2] = "0" + tmp[2];
	return tmp.join(separator);
}

/**
 * 날짜연산(월)
 */
Date.prototype.addMonth = function(add) {
	if (typeof(add) == 'undefined' || add == "") add = "0";
	var tmp = new Array(3);
	tmp[0] = this.getFullYear();
	tmp[1] = this.getMonth() + parseInt(add);
	tmp[2] = this.getDate() + 1;
	
	return new Date(tmp[0], tmp[1], tmp[2]);
}

/**
 * 날짜연산(일)
 */
Date.prototype.addDay = function(add) {
	if (typeof(add) == 'undefined' || add == "") add = "0";
	var tmp = new Array(3);
	tmp[0] = this.getFullYear();
	tmp[1] = this.getMonth();
	tmp[2] = this.getDate() + parseInt(add);
	
	return new Date(tmp[0], tmp[1], tmp[2]);
}

/**
 * 쿠키설정
 */
function setCookie(name, value, expiredays) {
	var today = new Date();
	today.setDate(today.getDate() + expiredays);
	document.cookie = name + "=" + escape(value) + "; path=/; expires=" + today.toGMTString() + ";"
}

/**
 * 쿠키조회
 */
function getCookie(key) {
	var cook = document.cookie + ";";
	var idx = cook.indexOf(key, 0);
	var val = "";
	
	if (idx != -1) {
		cook = cook.substring(idx, cook.length);
		begin = cook.indexOf("=", 0) + 1;
		end = cook.indexOf(";", begin);
		val = unescape( cook.substring(begin, end) );
	}
	
	return val;
}

/**
 * 쿠키삭제
 */
function delCookie(name){
    var today = new Date();
    today.setDate(today.getDate() - 1);
    document.cookie = name + "= " + "; expires=" + today.toGMTString();
}

/**
 * 메세지들을 나타냅니다.
 * @param msgs 메세지 문자열의 배열
 * @param title 메세지 다이얼로그의 제목, 제목이 표시할내용의 class를 결정합니다. (showMessages + 제목)
 * @param closeFunc 메세지가 닫기면 호출될 펑션
 * @return
 */
function showMessages(msgs, title, minHeight, width, closeFunc) {
	var	msgDialog;
	var	msgHtml;
	
	if (minHeight == undefined || minHeight == '') minHeight = "100";
	if (width == undefined || width == '') width = "300";
	if (msgs == null) return;
	
	msgDialog	= $("#divMessagesDialog");
	if(msgDialog.length == 0) {
		$("body").append("<div id='divMessagesDialog'></div>");
		msgDialog	= $("#divMessagesDialog");
		msgDialog.dialog({
			autoOpen	: false,
			//buttons		: {"확인": function() { $(this).dialog("close");}},
			minHeight	: minHeight,			
			width		: width,
			modal		: true,
			resizable	: false,
			autoResize: true,
			title		: title == null ? '알림'.toLang("label_00003") : title
			});
					
	}
	
	//$("#divMessagesDialog").dialog().parents(".ui-dialog").find(".ui-dialog-titlebar").remove();
	
	if (msgDialog.dialog('isOpen')) {
		if (closeFunc !== undefined) {
			msgDialog.bind('dialogclose', closeFunc);
		}
	} else {
		msgDialog.unbind('dialogclose');
		if (closeFunc !== undefined) {
			msgDialog.bind('dialogclose', closeFunc);
		}
	}
	msgDialog.html(msgs);
	msgDialog.dialog('open');
	
}


/**
 * 정수체크
 */
function isNumber(str){
	var tempstr ="0123456789";
	if(str == "") return false;
	
    for (i=0; i<str.length;i++){
		if (tempstr.indexOf(str.substring(i, i+1)) == -1){
			return false;
			break;
		}
	  }
	return true;
	//return /^\d+$/.test(str)
}

/**
 * json 비었는지 체크
 */
function isEmpty(json){
	var c = 0;
	for(var k in json){
		c++;
	}
	return c==0;
}

/**
 * json 내용보기(테스트용)
 * @param j
 * @param loop
 */
function viewJsonTest(j, loop){
	var idx = 0;
	var txt = "";
	if(loop == undefined) loop = 5;
	
	for(var k in j){
		txt += k +" = "+ j[k] +"\n\n";
		idx ++;
		if(idx == loop){
			alert(txt);
			txt = "";
			idx = 0;
		}
	}
	
	if(txt != "") alert(txt);
}

/**
 * 로딩바
 */
function loading(isLoad){
    
    if(isLoad == undefined){
    	isLoad = true;
    }
    			
    if($("#_loading").html() == null) {
    	
    	/*
    	var _top = ($("#wrapper").height()-16)/2;
    	var _left = ($("#wrapper").width()-19)/2;
		*/

    	var _top = ($(window).height()-16)/2;
    	var _left = ($(window).width()-19)/2;
		var loimg = "../../common/image/icons/loading.gif";
		
    	$("body").append("<div id='_loadingBox'><div id='_loading'><img src='"+loimg+"'/></div></div>");

    	$('#_loading').css({'z-index':100000002,'position':'relative', 'top':_top, 'left':_left, 'width':200});
    	$('#_loadingBox').css({'z-index':100000002,'position':'absolute', 'top':0, 'left':0});
    }
    
    if($("#_mask").html() == null) {
    	$("body").append("<div id='_mask'></div>");
		
		$('#_mask').css({
    		'z-index':100000000
    		, 'position':'absolute'
    		, 'opacity':'0.2'
    		, 'filter':'alpha(opacity=30)'
    		, 'background-color':'#8C8C8C'
    		, 'top':'0px'
    		, 'left':'0px'
    	});
    }

	var _maskWidth = $(window).width();
	var _maskHeight = $(document).height();  
	
    if(isLoad){
    	$('#_mask').css({'width':_maskWidth+'px','height':_maskHeight+'px'});
    	//$('#_mask').fadeTo("slow", 0.4);
    	$("#_loadingBox").show();
    }else{
    	$('#_mask').remove();
    	$("#_loadingBox").hide();
    }
}

/**
 * 페이징바 그리기
 */
function paintPager(page, cpp, totalCnt, funcName){
    if(page == "" || !Number(page)){
    	page = 1; 
    }
    
    if(cpp == "" || !Number(cpp)){
    	cpp = 20; 
    }
    
    page = parseInt(page);
	var pageBlockCnt = 10;
    var startBlockNum = (Math.floor((page-1)/pageBlockCnt) * pageBlockCnt) + 1;
    var endBlockNum = (Math.ceil(page/pageBlockCnt) * pageBlockCnt);
    var lastBlockNum = Math.ceil(totalCnt/cpp);
    
    //var prev = page - 1; if(prev < 1) prev = 1;
    var prev = Math.floor(((page-1) - pageBlockCnt) / pageBlockCnt) * pageBlockCnt + 1;
    if(prev < 0) prev = 1;
    
    //var next = page + 1; if(next > lastBlockNum) next = lastBlockNum;
    var next = Math.floor(((page-1) + pageBlockCnt) / pageBlockCnt) * pageBlockCnt + 1;
    if(next > lastBlockNum) next = lastBlockNum;
	
    if(funcName == null) funcName = 'doSearch';
    
    var pagerHtml = '';

	pagerHtml += '<button type="button" onClick="_goPage('+prev+ ', \'' +funcName+ '\');"><i class="fas fa-chevron-left fa-xs"></i></button>';
    var j = 0;

    for(var i=startBlockNum;i<=endBlockNum;i++){
        if(i > lastBlockNum) continue;
        if( i == page )
			pagerHtml += '<button type="button" id="blink">'+ i +'</button>';
        else
			pagerHtml += '<button type="button" onClick="_goPage('+i+ ', \'' +funcName+ '\');">'+ i +'</button>';

        
        j ++;
    }
    
    if (j==0) pagerHtml += '<button type="button" id="blink">1</button>';

	pagerHtml += '<button type="button" onClick="_goPage('+next+ ', \'' +funcName+ '\');"><i class="fas fa-chevron-right fa-xs"></i></button>';

    return pagerHtml;
}

function _goPage(p, funcName){ eval(funcName+'('+p+')'); }

/**
 * 폼 요소를 모두 클리어 합니다. noclean="true" 클리어 안함
 * @param form 
 * @return
 */
function clearForm(form) {
	var	tform;
	var clearReadonly = true;
	if (form == null) {
		return;
	}
	
	if (typeof(form) == "string") {
		tform	= $("form[name=" + form +"]");
	} else {
		tform	= $(form);
	}
	
	$(":input", tform).each(function() {
		if($(this).attr("noclean") != "true"){
			switch (this.type) {
				case "button":
				case "submit":
				case "reset":
				case "image":
					break;
				case "hidden":
					if (clearReadonly) {
						this.value	= "";
					}
					break;
				case "text":
				case "textarea":
				case "password":
					if (this.defaultValue) {
						this.value = this.defaultValue;
					} else if (!this.readOnly || clearReadonly) {
						this.value	= "";
					}
					break;
				case "select-one":
					if (this.defaultValue)
						this.value = this.defaultValue;
					else
						this.selectedIndex	= 0;
					if (this.onchange)
						$(this).trigger("change");
					break;
				case "checkbox":
				case "radio":
					//this.checked	= false;
					break;
				default :
					//alert(this.type);
			}
		}
	});
}

/**
 * 문자열 14자리 변경
 * @param str
 * @param types 1 : 2001.10.20 11:22
 * @return
 */
function stringToDate(str, types){

	if(null == str || str.length < 14) return str;
	
	var returnVal = "";
	
	var yyyy = str.substring(0, 4);
	var mm = str.substring(4, 6);
	var dd = str.substring(6, 8);
	
	var hh = str.substring(8, 10);
	var mi = str.substring(10, 12);
	var ss = str.substring(12, 14);
	
	switch (types) {
		case 1: 
			returnVal = yyyy+"."+mm+"."+dd+" "+hh+":"+mi;
			break;
		case 2: 
			returnVal = yyyy+"."+mm+"."+dd;
			break;
		case 3: 
			returnVal = yyyy+"."+mm+"."+dd+" ["+hh+":"+mi+":"+ss+"]";
			break;
		default:
			
			break;
	}
	    	
	return returnVal;
}

var dateSeperator = "-";
function setSearchDate(type, from, to) {
	var startDate = "", endDate = "";
	
	if (type == "all") { //전체
		$("input[name=" + from + "]:first").val("");
		$("input[name=" + to + "]:first").val("");
		return;
	}
	
	switch(type) {
		case "1" : //최근 일주일
			startDate = shiftDate(new Date(_milliseconds), 0, 0, -7, dateSeperator);
			break;
		case "2" : //최근 한달
			startDate = shiftDate(new Date(_milliseconds), 0, -1, 0, dateSeperator);
			break;
		case "3" : //최근 6개월
			startDate = shiftDate(new Date(_milliseconds), 0, -6, 0, dateSeperator);
			break;
	}
	
	endDate = shiftDate(new Date(_milliseconds), 0, 0, 0, dateSeperator);
	
	$("input[name=" + from + "]:first").val(startDate);
	$("input[name=" + to + "]:first").val(endDate);
}

function shiftDate(date, y, m, d, separator) {
	
    date.setFullYear(date.getFullYear() + y);
    date.setMonth(date.getMonth() + m);
    date.setDate(date.getDate() + d);

    var year  = date.getFullYear();
    var month = date.getMonth() + 1;
    var day   = date.getDate();

    if (month < 10) { month = "0" + month; }
    if (day < 10) { day   = "0" + day;   }

    return year + separator + month + separator + day;    
}


function escapeXml(str){
	if(str == "") return "";
	
	str = str.replace(/\&/gi, '&amp;');
	str = str.replace(/\</gi, '&lt;');
	str = str.replace(/\>/gi, '&gt;');
	str = str.replace(/\'/gi, '&apos;');
	str = str.replace(/\"/gi, '&quot;');

	return str;
}

function deEscapeXml(str){
	if(str == "") return "";
	
	str = str.replace(/\&amp;/gi, '&');
	str = str.replace(/\&lt;/gi, '<');
	str = str.replace(/\&gt;/gi, '>');
	str = str.replace(/\&apos;/gi, '\'');
	str = str.replace(/\&quot;/gi, '"');
	
	return str;
}

function deEscapeXmlJstl(str){
	if(str == "") return "";
	str = str.replace(/\&#034;/gi, '"');
	str = str.replace(/\&#039;/gi, "'");
	str = str.replace(/\&lt;/gi, '<');
	str = str.replace(/\&gt;/gi, '>');
	
	return str;
}

function emailCheck(txt){
	var filter = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
	return filter.test(txt);
}

function resultList(data){
	if(data.resultCode == 1){
		goList();
	}else{
		alert(data.resultMsg);
	}
}

function procText(str){
	if(str == "U"){
		return "수정";
	}else if(str == "D"){
		return "삭제";
	}else{
		return "등록";
	}
}

function searchNoValue(str, at){
	if(str == "") return "";
	return at + str;
}

function enterCheck(fn){
	if(event.keyCode == 13){
		eval(fn);
	}
}

function doLogout(){
	$.mvcAjax({
        url: "/login/logout.json",
        success: function(data) {
        	if(data){
        		location.href = "/";
        	}else{
        		alert(data.resultMsg);
        	}
        } 
    });
}

//포커스 이동[폼이름,현재포커스,이동할포커스]
function nextFocus(sFormName,sNow,sNext)
{
	var sForm = 'document.'+ sFormName +'.'
	var oNow = eval(sForm + sNow);

	if (typeof oNow == 'object')
	{
		if ( oNow.value.length == oNow.maxLength)
		{
			var oNext = eval(sForm + sNext);

			if ((typeof oNext) == 'object')
				oNext.focus();
		}
	}
}


function getAddDayFromToday(addDays, delimiter)
{
    var oToday = new Date();
 
    oToday.setDate(oToday.getDate() - addDays);
    //oToday.toLocaleString();
 
    var sYear = oToday.getFullYear();
    var sMonth = oToday.getMonth() + 1;
    var sDay = oToday.getDate();
 
    sMonth = "" + sMonth;
    sMonth = (sMonth.length == 1) ? "0"+sMonth : sMonth;

    sDay = "" + sDay;
    sDay = (sDay.length == 1) ? "0"+sDay : sDay
   
    return sYear + delimiter + sMonth + delimiter + sDay;
} 

//3자리 콤마 추가
function addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//모든 콤마 제거
function removeCommas(x) {
    if(!x || x.length == 0) return "";
    else return x.split(",").join("");
}

$(document).ready( function() {

	$("input:text[numberOnly]").on("focus", function() {
		var x = $(this).val();
		x = removeCommas(x);
		$(this).val(x);
	}).on("focusout", function() {
		var x = $(this).val();
		if(x && x.length > 0) {
			if(!$.isNumeric(x)) {
				x = x.replace(/[^0-9]/g,"");
			}
			$(this).val(x);
		}
	}).on("keyup", function() {
		$(this).val($(this).val().replace(/[^0-9]/g,""));
	});


});
