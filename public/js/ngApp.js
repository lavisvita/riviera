var app = angular.module('app', ['ngRoute', 'ymaps', 'ngMask', 'ngTouch', 'slick'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'home.html',
                controller: 'homeCtrl'
            })
            .otherwise({
                redirectTo: '/'
            })
    }])
    .service("sendMailSrv", ['$http', function($http){
    }])
    .service("postDataOfSenderSrv",['$http', '$rootScope', 'checkName', 'checkPhone', 'checkEmail' , function($http, $rootScope, checkName, checkPhone, checkEmail){
        this.resultValidationName = [];
        this.resultValidationPhone = [];
        this.resultValidationEmail = [];

        this.showFormConfirmation = function(){
            //$rootScope.optionVariant = val;
            $rootScope.formConfirmation = true;
        };

        this.callbackSenderName = function(result, inputSenderName){
            this.resultValidationName = [{result: result, input: inputSenderName}];
        };

        this.callbackSenderPhone = function(result, inputSenderPhone){
            this.resultValidationPhone = [{result: result, input: inputSenderPhone}];
        };

        this.callbackSenderEmail = function(result, inputSenderEmail){
            this.resultValidationEmail = [{result: result, input: inputSenderEmail}];
        };

        this.checkPostName = function($event, name){
            if(name == '' || name == undefined){
                name = 'empty field';
            }
                var inputSenderName = $event.target;
            var getAttribute = inputSenderName.hasAttribute('senderName');

            //var newElement;
            //newElement = document.createElement('span');
            //newElement.setAttribute('id', 'error-message');
            //newElement.innerHTML = "Заполните имя";
            if(name == 'empty field'){
                res = 'empty field'
            }else var res = checkName.checkNameF(name);

            if(res == true && getAttribute == true){
                //var element = document.getElementById('error-message');
                //if(element != null) element.parentNode.removeChild(element);
                inputSenderName.className = 'senderValid';
                this.callbackSenderName(true, inputSenderName);
            }
            else if(res == 'empty field'){
                //var element = document.getElementById('error-message');
                //if(element != null) element.parentNode.removeChild(element);

                inputSenderName.className = 'senderinValid';
                //inputSenderName.parentNode.insertBefore(newElement, inputSenderName.nextSibling);
                this.callbackSenderName(false);
            }else{
                inputSenderName.className = 'senderinValid';
                this.callbackSenderName(false);
            }
        };
        this.checkPostPhone = function($event, phone){
            var inputSenderPhone = $event.target;
            var getAttribute = inputSenderPhone.hasAttribute('senderPhone');
            var res = checkPhone.checkPhoneF(phone);
            if(res == true && getAttribute == true){
                inputSenderPhone.className = 'senderValid';
                this.callbackSenderPhone(true, inputSenderPhone);
            } else{
                inputSenderPhone.className = 'senderinValid';
                this.callbackSenderPhone(false);
            }
        };

        this.checkPostEmail = function($event, email){
            var inputSenderEmail = $event.target;
            var getAttribute = inputSenderEmail.hasAttribute('senderEmail');
            var res = checkEmail.checkEmailF(email);
            if(res == true && getAttribute == true){
                inputSenderEmail.className = 'senderValid';
                this.callbackSenderEmail(true, inputSenderEmail);
            } else{
                inputSenderEmail.className = 'senderinValid';
                this.callbackSenderEmail(false);
            }
        };

        this.sendContactData = function(optionVariant, senderName, senderPhone, senderEmail){
            if(senderEmail == undefined || senderEmail == '') senderEmail = '';
                var data = {
                    variant: optionVariant,
                    senderName: senderName,
                    senderPhone: senderPhone,
                    senderEmail: senderEmail
                };
                if( ( this.resultValidationName[0].result == true && this.resultValidationName[0].result != '') && (this.resultValidationPhone[0].result == true && this.resultValidationPhone[0].result != '') ){
                    $rootScope.formRequestVisible = false;
                    $http({
                        method: 'post',
                        url: '/sendmail',
                        data: data
                    }).then(function successCallback(response) {
                        console.log(response.data);
                    }, function errorCallback(response) {
                        console.log(response.data);
                    });
                    this.resultValidationName[0].input.className = '';
                    this.resultValidationPhone[0].input.className = '';
                    if(this.resultValidationEmail == [])
                        this.resultValidationEmail[0].input.className = '';
                    //else
                    //    this.resultValidationEmail[0].input.className = '';
                    return true;

                }else return false;
        };
    }])
    .service("checkName", function(){
        this.nameValidation = function(name) {
            if(name == '' || name == undefined){
                return 'empty field';
            }else{
                var regName = new RegExp(/^[а-яА-Яa-zA-Z]/);
                var resultTestName = regName.test(name);
                if (resultTestName === true) {
                    return true;
                } else {
                    return false;
                }
            }
        };
        this.checkNameF = function(senderName){
            var res = this.nameValidation(senderName);
            if(res){
                return true;
            }else if(res == 'empty field'){
                return 'empty field';
            }
            else{
                return false;
            }
        }
    })
    .service("checkPhone", function(){
        this.phoneValidation = function(phone) {
            var regPhone = new RegExp(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/);
            var resultTestPhone = regPhone.test(phone);
            if (resultTestPhone === true) {
                return true;
            } else {
                return false;
            }
        };
        this.checkPhoneF = function(senderPhone){
            var res = this.phoneValidation(senderPhone);
            if(res){
                return true;
            }else{
                return false;
            }
        }
    })
    .service("checkEmail", function(){
        this.emailValidation = function(email) {
            var regEmail = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            var resultTestEmail = regEmail.test(email);
            if (resultTestEmail === true) {
                return true;
            } else {
                return false;
            }
        };
        this.checkEmailF = function(senderEmail){
            var res = this.emailValidation(senderEmail);
            if(res){
                return true;
            }else{
                return false;
            }
        }
    })
    .service('anchorSmoothScroll', function(){
        this.scrollTo = function(eID) {

            var startY = currentYPosition();
            var stopY = elmYPosition(eID);
            var distance = stopY > startY ? stopY - startY : startY - stopY;
            if (distance < 100) {
                scrollTo(0, stopY); return;
            }
            var speed = Math.round(distance / 100);
            if (speed >= 20) speed = 50;
            var step = Math.round(distance / 25);
            var leapY = stopY > startY ? startY + step : startY - step;
            var timer = 0;
            if (stopY > startY) {
                for ( var i=startY; i<stopY; i+=step ) {
                    setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                    leapY += step; if (leapY > stopY) leapY = stopY; timer++;
                } return;
            }
            for ( var i=startY; i>stopY; i-=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
            }

            function currentYPosition() {
                // Firefox, Chrome, Opera, Safari
                if (self.pageYOffset) return self.pageYOffset;
                // Internet Explorer 6 - standards mode
                if (document.documentElement && document.documentElement.scrollTop)
                    return document.documentElement.scrollTop;
                // Internet Explorer 6, 7 and 8
                if (document.body.scrollTop) return document.body.scrollTop;
                return 0;
            }

            function elmYPosition(eID) {
                var elm = document.getElementById(eID);
                var y = elm.offsetTop;
                var node = elm;
                while (node.offsetParent && node.offsetParent != document.body) {
                    node = node.offsetParent;
                    y += node.offsetTop;
                } return y;
            }

        };

    })
    .directive("paymentOptions", ['$http', '$compile', function($http,$compile){
        return {
            restrict: 'E', // использование директивы в качестве тега
            templateUrl: "js/directives/paymentOptions.html", // путь к шаблону директивы
            scope:{
                showform: '=',
                showoptionvariant: '='
            },

            controller: function($scope, $rootScope){

            },

            link: function($scope, element, attrs, controller) {
                $scope.setActiveOption = function($event) {
                    var newElement;
                    newElement = document.createElement('span');
                    newElement.innerHTML = "<span id='payment-item-active'></span>";
                    var findClass = element.find('a').removeClass('payment-item-active');
                    findClass.find('span').remove();
                    var elem = $event.target;
                    if(elem.className === 'payment-item'){
                        elem.className = 'payment-item payment-item-active';
                        elem.appendChild(newElement);
                    }
                    else console.log('false');
                };
            }
        };
    }])
    .directive("dialogForm",['$http', 'postDataOfSenderSrv', function($http, postDataOfSenderSrv){
        return {
            restrict: 'E', // использование директивы в качестве тега
            templateUrl: "js/directives/dialogForm.html", // путь к шаблону директивы
            scope:{},

            controller: function($scope){
                $scope.checkSenderName = function($event, name){
                    postDataOfSenderSrv.checkPostName($event, name);
                };
                $scope.checkSenderPhone = function($event, phone){
                    postDataOfSenderSrv.checkPostPhone($event, phone);
                };
                $scope.postDataOfSender = function(optionVariant, senderName, senderPhone){
                    if( (senderName !='' && senderName != undefined) && ( senderPhone !='' && senderPhone != undefined ) ) {
                        var resultContactPost = postDataOfSenderSrv.sendContactData(optionVariant, senderName, senderPhone);
                        if (resultContactPost) {
                            postDataOfSenderSrv.showFormConfirmation();
                            $scope.senderName = '';
                            $scope.senderPhone = '';
                            $scope.optionVariant = '';
                        }
                    }
                };
            },

            link: function($scope, element, attrs, controller) {
            }
        };
    }])
    .directive("headerDesktop",['$http', 'postDataOfSenderSrv', function($http, postDataOfSenderSrv){
        return {
            restrict: 'E', // использование директивы в качестве тега
            templateUrl: "js/directives/headerDesktop.html", // путь к шаблону директивы
            scope:{
                slides: '=',
            },

            controller: function($scope, $rootScope){
                //$scope.sliderTopData = [];
                //$http({
                //    method: 'GET',
                //    url: '/slider_top_text'
                //}).then(function successCallback(response) {
                //
                //    angular.forEach(response.data, function(value, key) {
                //        $scope.sliderTopData.push({
                //            pic: response.data[key]['pic'],
                //            text: response.data[key]['text'],
                //        })
                //    });
                //}, function errorCallback(response) {
                //    console.error(response);
                //});

                $scope.checkSenderName = function($event, name){
                    postDataOfSenderSrv.checkPostName($event, name);
                };
                $scope.checkSenderPhone = function($event, phone){
                    postDataOfSenderSrv.checkPostPhone($event, phone);
                };
                $scope.postDataOfSender = function(optionVariant, senderName, senderPhone){
                    if( (senderName !='' && senderName != undefined) && ( senderPhone !='' && senderPhone != undefined ) ) {
                        var resultContactPost = postDataOfSenderSrv.sendContactData(optionVariant, senderName, senderPhone);
                        if (resultContactPost) {
                            postDataOfSenderSrv.showFormConfirmation();
                            $scope.senderName = '';
                            $scope.senderPhone = '';
                            $scope.optionVariant = '';
                        }
                    }
                };
            },

            link: function($scope, element, attrs, controller) {
            }
        };
    }])
    .directive("headerMobile",['$http', '$rootScope', function($http, $rootScope){
        return {
            restrict: 'E', // использование директивы в качестве тега
            templateUrl: "js/directives/headerMobile.html", // путь к шаблону директивы
            scope:{
                sliderone: '='
            },

            controller: function($scope, $rootScope){
                $scope.showForm = function(){
                    $rootScope.optionVariant = 'Отправить заявку';
                    $rootScope.formRequestVisible = true;
                };
            },

            link: function($scope, element, attrs, controller) {

            }
        };
    }])
    .directive("middleSlider",['$http', '$rootScope', function($http, $rootScope){
        return {
            restrict: 'E', // использование директивы в качестве тега
            templateUrl: "js/directives/middleSlider.html", // путь к шаблону директивы
            scope:{
                sliderdata: "="
            },

            controller: function($scope, $rootScope){
                //$scope.sliderMiddleData = [];
                //    $http({
                //        method: 'GET',
                //        url: '/slider_middle_text'
                //    }).then(function successCallback(response) {
                //
                //        angular.forEach(response.data, function(value, key) {
                //            $scope.sliderMiddleData.push({
                //                pic: response.data[key]['pic'],
                //                header:response.data[key]['header'],
                //                text: response.data[key]['text'],
                //            })
                //        });
                //    }, function errorCallback(response) {
                //        console.error(response);
                //    });
            },

            link: function($scope, element, attrs, controller) {

            }
        };
    }])
    .directive("resources",['$http', function($http){
        return {
            restrict: 'E', // использование директивы в качестве тега
            templateUrl: "js/directives/resources.html", // путь к шаблону директивы
            scope:{
                editable: '=', // значение для атрибута contenteditable. Получая true, мы имеем возможность редактировать контент
                desc:'=', // контент, который мы отображаем при первом состоянии, при загрузке страницы
                quantity: '=',
                resid: '='
            },

            controller: function($scope, $rootScope){
            },

            link: function($scope, element, attrs, controller) {
                $scope.getThisContent = function(){ // отлавливаем элемент и его содержание для дальнейших манипуляций
                    var text = element.find('p').text(); // получем контент элемента
                    var id = element.find('p').attr('item-id'); // получем id элемента
                    console.log(id);
                    $http({
                        method: 'POST',
                        url:'/update_text',
                        data: {
                            id: id,
                            text: text
                        }
                    }).then(function (result) {
                        console.log(result);
                    }, function (result) {
                        console.error("Error: No data returned");
                    });
                }
            }
        };
    }])
    .directive("menu",['$http', '$location', '$anchorScroll', 'anchorSmoothScroll', function($http, $location, $anchorScroll, anchorSmoothScroll, $timeout){
        return {
            restrict: 'E', // использование директивы в качестве тега
            templateUrl: "js/directives/menu.html", // путь к шаблону директивы
            scope:{

            },

            controller: function($scope){
               $scope.linksDesktop = {
                    advantages: 'Преимущества',
                    layouts: 'Планировки',
                    payments:'Способы оплаты',
                    documents: 'Документация',
                    contacts: 'Контакты'
                };
                $scope.linksMobile = {
                    advantages: 'Преимущества',
                    layouts: 'Планировки',
                    documents1: 'Документация',
                    contacts1: 'Контакты'
                };
                $scope.showMenu1 = false;
                $scope.showMenu = function(showMenu1){
                    if(showMenu1 == false) $scope.showMenu1 = true;
                    else $scope.showMenu1 = false;
                };
                $scope.gotoAnchor = function(anchor) {
                    $location.hash(anchor);
                    //$anchorScroll();
                    anchorSmoothScroll.scrollTo(anchor);
                };
            },

            link: function($scope, element, attrs, controller) {
                $scope.getMenuItem = function($event, anchor) {
                    var findClass = element.find('a').removeClass('menu-item-active');
                    var elem = $event.target;
                    if(elem.className === 'menu-item ng-binding'){
                        elem.className = 'menu-item ng-binding menu-item-active';
                        anchorSmoothScroll.scrollTo(anchor);
                    }
                    else console.log('false');

                };
            }
        };
    }])
    .directive("twoFieldsMiddleDesktop",['$http', 'postDataOfSenderSrv', function($http, postDataOfSenderSrv){
        return {
            restrict: 'E', // использование директивы в качестве тега
            templateUrl: "js/directives/twoFieldsMiddleDesktop.html", // путь к шаблону директивы
            scope:{

            },

            controller: function($scope){
                $scope.checkSenderName = function($event, name){
                    postDataOfSenderSrv.checkPostName($event, name);
                };
                $scope.checkSenderPhone = function($event, phone){
                    postDataOfSenderSrv.checkPostPhone($event, phone);
                };
                $scope.postDataOfSender = function(optionVariant, senderName, senderPhone){
                    if( (senderName !='' && senderName != undefined) && ( senderPhone !='' && senderPhone != undefined ) ) {
                        var resultContactPost = postDataOfSenderSrv.sendContactData(optionVariant, senderName, senderPhone);
                        console.log('result: ' + resultContactPost);
                        if (resultContactPost) {
                            postDataOfSenderSrv.showFormConfirmation();
                            $scope.senderName = '';
                            $scope.senderPhone = '';
                            $scope.optionVariant = '';
                        }
                    }
                };
            },

            link: function($scope, element, attrs, controller) {

            }
        };
    }])
    .directive("threeFieldsMiddleDesktop",['$http', 'postDataOfSenderSrv', function($http, postDataOfSenderSrv){
        return {
            restrict: 'E', // использование директивы в качестве тега
            templateUrl: "js/directives/threeFieldsMiddleDesktop.html", // путь к шаблону директивы
            scope:{
                optionitem: '='
            },
            controller: function($scope){
                console.log('option variant');
                console.log($scope.optionitem);
                $scope.checkSenderName = function($event, name){
                    postDataOfSenderSrv.checkPostName($event, name);
                };
                $scope.checkSenderPhone = function($event, phone){
                    postDataOfSenderSrv.checkPostPhone($event, phone);
                };
                $scope.checkSenderEmail = function($event, phone){
                    postDataOfSenderSrv.checkPostEmail($event, phone);
                };
                $scope.postDataOfSender = function(optionVariant, senderName, senderPhone, senderEmail){
                    if( (senderName !='' && senderName != undefined) && ( senderPhone !='' && senderPhone != undefined ) && ( senderEmail !=''&& senderEmail != undefined) ){
                        var resultContactPost = postDataOfSenderSrv.sendContactData(optionVariant, senderName, senderPhone, senderEmail);
                        console.log('result: ' + resultContactPost);
                        if(resultContactPost) {
                            postDataOfSenderSrv.showFormConfirmation();
                            $scope.senderName = '';
                            $scope.senderPhone = '';
                            $scope.senderEmail = '';
                            $scope.optionVariant = '';
                        }
                    }

                };
            },

            link: function($scope, element, attrs, controller) {

            }
        };
    }])
    .directive("footerFormDesktop",['$http', 'postDataOfSenderSrv', function($http, postDataOfSenderSrv){
        return {
            restrict: 'E', // использование директивы в качестве тега
            templateUrl: "js/directives/footerFormDesktop.html", // путь к шаблону директивы
            scope:{},
            controller: function($scope){
                $scope.checkSenderName = function($event, name){
                    postDataOfSenderSrv.checkPostName($event, name);
                };
                $scope.checkSenderPhone = function($event, phone){
                    postDataOfSenderSrv.checkPostPhone($event, phone);
                };
                $scope.checkSenderEmail = function($event, phone){
                    postDataOfSenderSrv.checkPostEmail($event, phone);
                };
                $scope.postDataOfSender = function(optionVariant, senderName, senderPhone, senderEmail){
                    if( (senderName !='' && senderName != undefined) && ( senderPhone !='' && senderPhone != undefined ) ) {
                        var resultContactPost = postDataOfSenderSrv.sendContactData(optionVariant, senderName, senderPhone, senderEmail);
                        if (resultContactPost) {
                            postDataOfSenderSrv.showFormConfirmation();
                            $scope.senderName = '';
                            $scope.senderPhone = '';
                            $scope.senderEmail = '';
                            $scope.optionVariant = '';
                        }
                    }
                };
            },
            link: function($scope, element, attrs, controller) {

            }
        };
    }])
    .directive("footerFormMobile",['$http', 'postDataOfSenderSrv', function($http, postDataOfSenderSrv){
        return {
            restrict: 'E', // использование директивы в качестве тега
            templateUrl: "js/directives/footerFormMobile.html", // путь к шаблону директивы
            scope:{},
            controller: function($scope){
                $scope.checkSenderName = function($event, name){
                    postDataOfSenderSrv.checkPostName($event, name);
                };
                $scope.checkSenderPhone = function($event, phone){
                    postDataOfSenderSrv.checkPostPhone($event, phone);
                };
                $scope.checkSenderEmail = function($event, phone){
                    postDataOfSenderSrv.checkPostEmail($event, phone);
                };
                $scope.postDataOfSender = function(optionVariant, senderName, senderPhone, senderEmail){
                    if( (senderName !='' && senderName != undefined) && ( senderPhone !='' && senderPhone != undefined ) ) {
                        var resultContactPost = postDataOfSenderSrv.sendContactData(optionVariant, senderName, senderPhone, senderEmail);
                        if (resultContactPost) {
                            postDataOfSenderSrv.showFormConfirmation();
                            $scope.senderName = '';
                            $scope.senderPhone = '';
                            $scope.senderEmail = '';
                            $scope.optionVariant = '';
                        }
                    }
                };
            },
            link: function($scope, element, attrs, controller) {

            }
        };
    }])
    /*
     директива, которая получает и отображаетконтент. С помощью функции getThisContent
     мы фиксируем изменения в теге, который имеет атрибут contenteditable. Мы можем редактировать контент.
    */
    .directive("elemcontent",['$http', function($http){
        return {
            restrict: 'E', // использование директивы в качестве тега
            templateUrl: "js/directives/first.html", // путь к шаблону директивы
            scope:{
                editable: '=', // значение для атрибута contenteditable. Получая true, мы имеем возможность редактировать контент
                text:'=', // контент, который мы отображаем при первом состоянии, при загрузке страницы
                textid: '=',
                header:'=',
                index:'=',
                formrequestvisible: '=',
                picture: '='
            },

            controller: function($scope, $rootScope){
                $rootScope.optionVariant = '';
                $scope.showForm = function(){
                    $rootScope.optionVariant = 'Отправить заявку';
                    $rootScope.formRequestVisible = true;
                };
                $scope.postDataOfSender = function(optionVariant, senderName, senderPhone){
                    console.log(optionVariant, senderName, senderPhone);
                    $rootScope.formRequestVisible = false;
                    var data = {
                        variant: optionVariant,
                        senderName: senderName,
                        senderPhone: senderPhone
                    };
                    $http({
                        method: 'post',
                        url: '/sendmail',
                        data: data
                    }).then(function successCallback(response) {
                        console.log(response.data);
                        $scope.contentText = response.data;
                    }, function errorCallback(response) {
                        console.error(response);
                    });

                    $scope.senderName = '';
                    $scope.senderPhone = '';
                    $scope.optionVariant = '';
                };
            },

            link: function($scope, element, attrs, controller) {
                $scope.getThisContent = function(){ // отлавливаем элемент и его содержание для дальнейших манипуляций
                    var text = element.find('p').text(); // получем контент элемента
                    var id = element.find('p').attr('item-id'); // получем id элемента
                    console.log(id);
                    $http({
                        method: 'POST',
                        url:'/update_text',
                        data: {
                            id: id,
                            text: text
                        }
                    }).then(function (result) {
                        console.log(result);
                    }, function (result) {
                        console.error("Error: No data returned");
                    });
                }
            }
        };
    }])
    .directive("trigger",['$http', function($http){
        return {
            restrict: 'E', // использование директивы в качестве тега
            templateUrl: "js/directives/trigger.html", // путь к шаблону директивы
            scope:{
                editable: '=', // значение для атрибута contenteditable. Получая true, мы имеем возможность редактировать контент
                text:'=', // контент, который мы отображаем при первом состоянии, при загрузке страницы
                textid: '=',
                index:'=',
                header: '=',
                picture: '='
            },

            controller: function($scope){
                $scope.result = $scope.index % 2;
            },

            link: function($scope, element, attrs, controller) {

            }
        };
    }])
    .directive("second",['$http', function($http){
        return {
            restrict: 'E', // использование директивы в качестве тега
            templateUrl: "js/directives/second.html", // путь к шаблону директивы
            scope:{
                editable: '=', // значение для атрибута contenteditable. Получая true, мы имеем возможность редактировать контент
                text:'=', // контент, который мы отображаем при первом состоянии, при загрузке страницы
                textid: '=',
                index:'=',
                header: '=',
                picture: '='
            },

            controller: function($scope, $rootScope){
                $scope.optionVariant = '';
                $scope.showForm = function(){
                    $rootScope.optionVariant = 'Отправить заявку';
                    $rootScope.formRequestVisible = true;
                };
                $scope.postDataOfSender = function(optionVariant, senderName, senderPhone){ // Возможно лишний код
                    console.log(optionVariant, senderName, senderPhone);
                    $rootScope.formRequestVisible = false;
                    var data = {
                        variant: optionVariant,
                        senderName: senderName,
                        senderPhone: senderPhone
                    };
                    $http({
                        method: 'post',
                        url: '/sendmail',
                        data: data
                    }).then(function successCallback(response) {
                        console.log(response.data);
                        $scope.contentText = response.data;
                    }, function errorCallback(response) {
                        console.error(response);
                    });

                    $scope.senderName = '';
                    $scope.senderPhone = '';
                    $scope.optionVariant = '';
                };
            },

            link: function($scope, element, attrs, controller) {
                $scope.getThisContent = function(){ // отлавливаем элемент и его содержание для дальнейших манипуляций
                    var text = element.find('p').text(); // получем контент элемента
                    var id = element.find('p').attr('item-id'); // получем id элемента
                    console.log(id);
                    $http({
                        method: 'POST',
                        url:'/update_text',
                        data: {
                            id: id,
                            text: text
                        }
                    }).then(function (result) {
                        console.log(result);
                    }, function (result) {
                        console.error("Error: No data returned");
                    });
                }
            }
        };
    }]);