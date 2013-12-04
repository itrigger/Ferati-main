/*Листалка итемов*/
var globalitemid = 10;

/*Ротатор итемов*/
function changeitem(myitemid){
   if(myitemid != globalitemid){
     $.ajax('../items/item' + myitemid + '.html',{
        success: function(response){
          $(".mainslider").html(response);
          if (myitemid > globalitemid){
            $(".mainslider").removeClass("loading").find("article").css("right","-100%").animate({right: '0px' }, 600, 'easeOutQuad');
            globalitemid =  myitemid;
          } else {
            $(".mainslider").removeClass("loading").find("article").css("left","-100%").animate({left: '0px' }, 600, 'easeOutQuad');
            globalitemid =  myitemid;
          }
          $(".timeline ul li ul li").removeClass("active");
          $(".timeline ul li ul li[data-item=" + myitemid+"]").addClass("active").parent().parent().addClass("active");
          Hash.add('event', 'item' + myitemid);
        },
        error: function(request, errorType, errorMessage) {
          $('#errorModal').arcticmodal();
        },
        cache: false,
        timeout: 5000,
        beforeSend: function(){$(".mainslider").addClass("loading");},
        complete: function(){}
     });
   }
};
/*Конец Ротатор итемов*/




$(document).ready(function(){ /*документ готов начало*/


    var hash = Hash.get();	// получаем все значения
    var target = "item";
    var pos = 1;
	if (hash.anchor) {
		window.location.hash = hash.anchor; // сохраняем родной функционал якорей
	}
	else if (hash.event){
	    if((hash.event.indexOf(target))>=0){
            changeitem(hash.event.substring(4));
	    }
	}
    /*Загружаем первый итем*/
   /* $.ajax('../items/item' + globalitemid + '.html',{
      success: function(response){$(".mainslider").html(response);},
      error: function(request, errorType, errorMessage) {alert("Ошибка: " + errorType + " с сообщением: " + errorMessage);},
      cache: false,
      timeout: 5000,
      beforeSend: function(){$(".mainslider").addClass("loading");},
      complete: function(){
        $(".mainslider").removeClass("loading");
        }
    });*/
    /*Конец Загружаем первый итем*/

    /*Таймлайн клик*/
    $(".timeline ul li ul li").on("click", function(){
       changeitem($(this).attr("data-item"));
    });
    /*Конец Таймлайн клик*/

    /*Сертификаты*/
    $('#example1').click(function() {
    	var c = $('<div class="box-modal" />');
    	c.html($('.b-text').html());
    	c.prepend('<div class="box-modal_close arcticmodal-close"×/div>');
    	$.arcticmodal({
    		content: c
    	});
    });
    $('#example2').click(function() {
    	var c = $('<div class="box-modal" />');
    	c.html($('.b-text').html());
    	c.prepend('<div class="box-modal_close arcticmodal-close">×</div>');
    	$.arcticmodal({
    		content: c
    	});
    });
    $('#example3').click(function() {
    	var c = $('<div class="box-modal" />');
    	c.html($('.b-text').html());
    	c.prepend('<div class="box-modal_close arcticmodal-close">×</div>');
    	$.arcticmodal({
    		content: c
    	});
    });
    $('#example4').click(function() {
    	var c = $('<div class="box-modal" />');
    	c.html($('.b-text').html());
    	c.prepend('<div class="box-modal_close arcticmodal-close">×</div>');
    	$.arcticmodal({
    		content: c
    	});
    });
    /*Конец Сертификаты*/

    /*Модалка для ошибок*/
    $('#errorModal').click(function() {
    	var c = $('<div class="box-modal" />');
    	c.html($('.b-text').html());
    	c.prepend('<div class="box-modal_close arcticmodal-close">×</div>');
    	$.arcticmodal({
    		content: c
    	});
    });
     /*Конец Модалка для ошибок*/

    /*Плавная прокрутка до якоря (якорь вешать через ID)*/
       $('.topmenu a[href*=#]').on("click", function(e){
          var anchor = $(this);
          $('html, body').stop().animate({
             scrollTop: $(anchor.attr('href')).offset().top
          }, 500);
          e.preventDefault();
       });

    /* Конец Плавная прокрутка до якоря*/


    /*Валидатор формы*/
    function hideerror(){
      if(($(".error-block").html().indexOf("inline"))>=0){
        $(".error-block").css("display","block");
      } else {
        $(".error-block").css("display","none");
      }
    }


    /*фокус на инпуте при клике на подсказке*/
    $("#contact").on("click", ".need-name", function(){  $("#name").focus(); });
    $("#contact").on("click", ".need-email", function(){  $("#email").focus(); });
    $("#contact").on("click", ".need-tel", function(){  $("#tel").focus(); });
    $("#contact").on("click", ".need-text", function(){  $("#msg").focus(); });
    /*при загрузке скрываем подсказки если поля не пустые*/
    if($("#name").val() == ""){$(".error-block .need-name").css("display","inline");} else {$(".error-block .need-name").css("display","none");}
    if($("#email").val() == ""){$(".error-block .need-email").css("display","inline");} else {$(".error-block .need-email").css("display","none");}
    if($("#tel").val() == ""){$(".error-block .need-tel").css("display","inline");} else {$(".error-block .need-tel").css("display","none");}
    if($("#msg").val() == ""){$(".error-block .need-text").css("display","inline");} else {$(".error-block .need-text").css("display","none");}
    /*отменяем станадртную функцию отправки формы*/

    hideerror();
    $("#contact").on("submit", function() { return false; });

    /*Валидация поля с мылом при нажатии клавиш*/
    $("#email").on("keypress", function(){
       var emailval  = $("#email").val();
       var mailvalid = validateEmail(emailval);
       if(mailvalid == false) {
    		$("#email").addClass("error");
            $("#err_mail").css("display","block").html("Неправильное написание e-mail!");
            $(".error-block .need-email").css("display","inline");
       }
       else if(mailvalid == true){
    		$("#email").removeClass("error");
            $("#err_mail").remove();
            $(".error-block .need-email").css("display","none");
       }
       hideerror();
    });

    /*Валидация поле с телефоном при нажатии клавиш*/
    $("#tel").on("keypress", function(){
       var telval    = $("#tel").val();
       var tellen    = telval.length;
       var telvalid  = validateTel(telval);
       if(telvalid == false) {
    		$("#tel").addClass("error");
            $("#err_tel").css("display","block").html("Неправильный номер телефона!");
            $(".error-block .need-tel").css("display","inline");
       }
       else if(telvalid == true){
    		$("#tel").removeClass("error");
            $("#err_tel").remove();
            $(".error-block .need-tel").css("display","none");
       }
       hideerror();
    });

    /*Обработка клика по кнопке Отправить*/
    $("#send").on("click", function(){
        var nameval   = $("#name").val();
    	var emailval  = $("#email").val();
    	var msgval    = $("#msg").val();
        var telval    = $("#tel").val();
        var namelen   = nameval.length;
    	var msglen    = msgval.length;
        var tellen    = telval.length;
    	var mailvalid = validateEmail(emailval);
        var telvalid  = validateTel(telval);

        if(namelen < 2) {
    	    $("#name").addClass("error");
            $("#err_name").css("display","block").html("Вы не ввели имя!");
            $(".error-block .need-name").css("display","inline");
    	}
    	else if(namelen >= 2){
    		$("#name").removeClass("error");
            $("#err_name").remove();
            $(".error-block .need-name").css("display","none");
    	}

    	if(mailvalid == false) {
    		$("#email").addClass("error");
            $("#err_mail").css("display","block").html("Неправильное написание e-mail!");
            $(".error-block .need-email").css("display","inline");
    	}
    	else if(mailvalid == true){
    		$("#email").removeClass("error");
            $("#err_mail").remove();
            $(".error-block .need-email").css("display","none");
    	}

        if(telvalid == false) {
    		$("#tel").addClass("error");
            $("#err_tel").css("display","block").html("Неправильный номер телефона!");
            $(".error-block .need-tel").css("display","inline");
    	}
    	else if(telvalid == true){
    		$("#tel").removeClass("error");
            $("#err_tel").remove();
            $(".error-block .need-tel").css("display","none");
    	}

    	if(msglen < 4) {
    		$("#msg").addClass("error");
            $("#err_msg").css("display","block").html("Введите сообщение!");
            $(".error-block .need-text").css("display","inline");
    	}
    	else if(msglen >= 4){
    		$("#msg").removeClass("error");
            $("#err_msg").remove();
            $(".error-block .need-text").css("display","none");
    	}
    	if(telvalid == true && mailvalid == true && msglen >= 4 && namelen >=2) {
    		$("#send").text("отправка...");

    		$.ajax({
    			type: 'POST',
    			url: 'js/sm/sendmessage.php',
    			data: $("#contact").serialize(),
    			success: function(data) {
    				if(data == "true") {
                        $("#contact input, #contact textarea").val("");
                        $("#contact .error-block").css("display","none");
						$("#send").replaceWith("<div id='sended'>Ваше сообщение отправлено.</div>");
    				}
    			}
    		});
    	}
        hideerror();
    });

    /*Конец валидатор формы*/


});/*документ готов конец*/




/*Функции валидации*/
function validateEmail(email) {
  var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

function validateTel(tel) {
  var reg = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
  return reg.test(tel);
}
/*Конец Функции валидации*/


/*Объект для работы с хэшем*/
Hash = { get: function() {var vars = {}, hash, splitter, hashes;if (!this.oldbrowser()) {	var pos = window.location.href.indexOf('?');hashes = (pos != -1) ? decodeURIComponent(window.location.href.substr(pos + 1)) : '';	splitter = '&';}else {	hashes = decodeURIComponent(window.location.hash.substr(1));splitter = '/';	}if (hashes.length == 0) {return vars;}	else {hashes = hashes.split(splitter);}	for (var i in hashes) {	if (hashes.hasOwnProperty(i)) {hash = hashes[i].split('=');if (typeof hash[1] == 'undefined') {	vars['anchor'] = hash[0];}else {vars[hash[0]] = hash[1];}}}	return vars;},set: function(vars) {	var hash = '';	for (var i in vars) {if (vars.hasOwnProperty(i)) {hash += '&' + i + '=' + vars[i];}}	if (!this.oldbrowser()) {if (hash.length != 0) {hash = '?' + hash.substr(1);}	window.history.pushState(hash, '', document.location.pathname + hash);}else {window.location.hash = hash.substr(1);}},add: function(key, val) {var hash = this.get();	hash[key] = val;this.set(hash);},remove: function(key) {var hash = this.get();delete hash[key];	this.set(hash);},clear: function() {	this.set({});},oldbrowser: function() {	return !(window.history && history.pushState);	}};
/*Конец Объект для работы с хэшем*/