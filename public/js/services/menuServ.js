angular.module('app').service('menuMaker', function() {
    var menu = {
        advantages: 'Преимущества',
        layouts: 'Планировки',
        payments:'Способы оплаты',
        documents: 'Документация',
        contacts: 'Контакты'
    };

    this.getMenu = function() {
        return menu;
    };
});