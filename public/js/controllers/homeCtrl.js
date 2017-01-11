angular.module('app')
    .controller('homeCtrl', function($scope, $http, $rootScope, $anchorScroll, $location){

        $scope.sliderTopData = [
            {
                pic: 'hslider-ico.png',
                text: 'Высокий статус жильцов'
            },
            {
                pic: 'hslider-ico.png',
                text: 'Уникальное планировочное решения квартир'
            },
            {
                pic: 'hslider-ico.png',
                text: 'Эксплуатируемая терраса на крыше'
            },
            {
                pic: 'hslider-ico.png',
                text: 'Гостинничное обслуживание жильцов'
            },
            {
                pic: 'hslider-ico.png',
                text: 'Многоуровневая подземная парковка'
            },
            {
                pic: 'hslider-ico.png',
                text: 'Новейшие инженерные решения'
            },
            {
                pic: 'hslider-ico.png',
                text: 'Рядом супермаркеты'
            },
            {
                pic: 'hslider-ico.png',
                text: 'Рядом парк'
            },
            {
                pic: 'hslider-ico.png',
                text: 'Школа и детсад'
            },
        ];

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


        $scope.sliderMiddleData = [
            {
                pic: 'hotel-serv.png',
                header: 'Отельное обслуживание',
                text: 'В холле "Ривьеры" расположена служба reception, которая не только контролирует доступ в жилую часть, но и предоставляет отличный гостиничный сервис и выполняет поручения жителей комплекса. С помощью сотрудников службы можно будет, например, вызвать такси, отправить корреспонденцию, заказать уборку квартиры.'
            },
            {
                pic: 'key-features.png',
                header: 'Ключевые особенности',
                text: 'Приоритет в ходе разработки идеи комплекса, во время его проектирования и строительства - комфортность проживания. Она отражается во всём: в месте расположения комплекса, в площадях и планировках квартир, в высоте потолков, в качестве отделки помещений общего пользования, в сервисах, доступных для всех жильцов дома.'
            },
            {
                pic: 'infrostructure.png',
                header: 'Инфраструктура',
                text: 'Жилой комплекс расположен рядом с Чистяковской рощей. Его территория имеет непосредственный выход в парк, что вносит особую натуралистическую ноту в общий комфорт комплекса. "Ривьера" имеет удобную транспортную доступность по отношению к двум главным магистралям Краснодара - улицам Красная и Северная.'
            },
        ];
        //$http({
        //    method: 'GET',
        //    url: '/slider_middle_text'
        //}).then(function successCallback(response) {
        //
        //    angular.forEach(response.data, function(value, key) {
        //        $scope.sliderMiddleData.push({
        //            pic: response.data[key]['pic'],
        //            header:response.data[key]['header'],
        //            text: response.data[key]['text'],
        //        })
        //    });
        //}, function errorCallback(response) {
        //    console.error(response);
        //});
        $scope.documents ='';
        $scope.imgText = '';
        $scope.resourcesContent = [];
        $scope.closeForm = function(){
            $rootScope.formRequestVisible = false;
        }
        $scope.closeFormConfirmation = function(){
            $rootScope.formConfirmation = false;
        }

        $scope.myInterval = 3000;

        $scope.plans = [
            {
                imgName: 'plan1.jpg'
            },
            {
                imgName: 'plan2.jpg'
            },
            {
                imgName: 'plan3.jpg'
            }
        ];

        $scope.documentations = [
            {
                imgName: 'decl.jpg',
                fileName: 'declaration.pdf'
            },
            {
                imgName: 'decl.jpg',
                fileName: 'declaration.pdf'
            },
            {
                imgName: 'decl.jpg',
                fileName: 'declaration.pdf'
            }
        ];

        $scope.sliderTwo = [
            {
                imgName: 'hotel_serv.jpg',
                header: 'Отельное обслуживание',
                text: 'В холле "Ривьеры" расположена служба reception, которая не только контролирует доступ в жилую часть, но и предоставляет отличный гостиничный сервис и выполняет поручения жителей комплекса.'
            },
            {
                imgName: 'key-features.jpg',
                header: 'Ключевые особенности',
                text: 'Приоритет в ходе разработки идеи комплекса, во время его проектирования и строительства - комфортность проживания.'
            },
            {
                imgName: 'infrostr.jpg',
                header: 'Инфраструктура',
                text: 'Жилой комплекс расположен рядом с Чистяковской рощей. Его территория имеет непосредственный выход в парк, что вносит особую натуралистическую ноту в общий комфорт комплекса.'
            }
        ];
        $http({
            method: 'GET',
            url: '/get_text'
        }).then(function successCallback(response) {
            $scope.contentText = response.data;
        }, function errorCallback(response) {
            console.error(response);
        });

        $http({
            method: 'GET',
            url: '/get_resources'
        }).then(function successCallback(response) {
            $scope.resourcesContent = response.data;
        }, function errorCallback(response) {
            console.error(response);
        });

        $scope.editable = false;
        $scope.doEditable = function(){
            $scope.editable = true;
        };

        $scope.editIco = false;
        $scope.showEditIco = function(){
            $scope.editIco = true;
        };

        $scope.hideEditIco = function(){
            $scope.editIco = false;
        };

        $scope.senderName = '';
        $scope.senderPhone = '';
        $rootScope.optionVariant = '';
        $rootScope.optionItem = 'ipoteka';
        $scope.senderEmail = '';
        $rootScope.formRequestVisible = false;
        $rootScope.formConfirmation = false;

        $scope.showForm = function(val){
            $rootScope.optionVariant = val;
            $rootScope.formRequestVisible = true;
        };


        $scope.showOptionVariant = function(val){
            $rootScope.optionItem = val;
        };

        $scope.showImgText = function(img){
            $scope.imgText = img;
        };
        $scope.getContent = function(item){
            console.log(item); // OK
        };

        $scope.markers = [
            {coordinates:[45.060354, 39.001021], properties: {balloonContent: 'ЖК "Ривьера"'}, options: {iconLayout: 'default#image',iconImageOffset: [-20,-70], iconImageSize: [64, 64], balloonContentSize: [300, 150], iconImageHref: 'img/map-baloon.png'}},

        ];
        //настройки положения карты
        $scope.map = {
            center: [45.060354, 39.000511], zoom: 10
        };


});