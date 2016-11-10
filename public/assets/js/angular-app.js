angular.module('molitva', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                template: '<index></index>'
            })
            .when('/register', {
                template: '<navigation></navigation><register-form></register-form>'
            })
            .when('/knowmore', {
                template: 'Узнать больше'
            });
    }])
    .component('index', {
        template: '<header-component></header-component><navigation></navigation><main></main>'
    })
    .component('main', {
        template: '<div class="main-content">'+
                '<h2 class="main-content-title">' +
                '<p>Верующие Беларуси будут</p>' +
                '<p>молиться за Пробуждение</p>' +
                '<p>и Единство</p>' +
            '</h2></div>'
        
    })
    .component('headerComponent', {
        template: '<header class="main-header">' +
                '<h1 class="main-title"><p><span>#</span>Молитва за </p>' +
                    '<p>Пробуждение</p>' +
                '</h1>' +
                '<h3 class="pray-year">2017</h3>' +
                '<a href="#" class="header-arrow-down"></a>' +
            '</header>'

    })
    .component('navigation', {
        template: '<nav>' +
                '<a href="#/register" class="participate nav-btn">участвовать</a>' +
                '<div class="event-date">' + 
                    '<span class="location">минск</span>' +
                    '<span class="dates">20-21 января</span>' +
                '</div>' +
                '<a href="#/knowmore" class="know-more nav-btn">узнать больше</a>' +
            '</nav>'
    })
    .component('registerForm', {
        template: '<section><form>' +
                  '<div class="form-group">' +
                    '<label for="inputFIO" >ФИО:</label>' +
                    '<input type="text" class="form-control" id="inputFIO" placeholder="ФИО">' +
                  '</div>' +
                  '<div class="form-group">' +
                    '<label for="church">Церковь:</label>' +
                      '<input type="text" class="form-control" id="church" placeholder="Церковь">' +
                  '</div>' +
                  '<div class="form-group">' +
                    '<label for="inputEmail">Email:</label>' +
                    '<input type="email" class="form-control" id="inputEmail" placeholder="Email">' +
                  '</div>' +
                  '<div class="form-group">' +
                    '<button type="submit" class="btn btn-lg" data-toggle="modal" data-target=".bs-example-modal-sm">Регистрация</button>' +
                  '</div>' +
                '</form></section>'
    });