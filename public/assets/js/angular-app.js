angular.module('molitva', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {
                template: '<index></index>'
            })
            .when('/people', {
                controller: function($http) {
                    var vm = this;
                    vm.people = [];
                    $http.get('api/visitors/register')
                        .success(function(response) {
                            vm.people = response.visitors;
                        });
                },
                controllerAs: 'PP',
                template: '<table class="table table-striped"><thead><tr><th>#</th><th>Имя</th><th>Церковь</th><th>Email</th></tr></thead>' +
                  '<tbody><tr ng-repeat="person in PP.people track by $index">' +
                  '<th>{{$index+1}}</th>' +
                  '<td>{{person.name}}</td>' +
                  '<td>{{person.church}}</td>' +
                  '<td>{{person.email}}</td>' +
                  '</tr></tbody>' +
                  '</table>'
            })
            .when('/register', {
                controller: function() {
                    $('body').scrollTop(0);
                },
                template: '<navigation></navigation><register-form></register-form>'
            })
            .when('/knowmore', {
                controller: function() {
                    $('body').scrollTop(0);
                },
                template: '<navigation></navigation><know-more></know-more>'
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
        controller: function() {
            $('.header-arrow-down').click(function(event) {
                $('body').animate({
                    scrollTop: $("nav").offset().top
                }, 350);
            });
        },
        template: '<header class="main-header">' +
                '<h1 class="main-title"><p><span>#</span>Молитва за </p>' +
                    '<p>Пробуждение</p>' +
                '</h1>' +
                '<h3 class="pray-year">2017</h3>' +
                '<span class="header-arrow-down"></span>' +
            '</header>'

    })
    .component('navigation', {
        controller: function($location) {
            this.goHome = function() {
                $location.path ('/');
            };
        },
        template: '<nav>' +
                '<a href="#/register" class="participate nav-btn">участвовать</a>' +
                '<div class="event-date" ng-click="$ctrl.goHome()">' + 
                    '<span class="location">минск</span>' +
                    '<span class="dates">20-21 января</span>' +
                '</div>' +
                '<a href="#/knowmore" class="know-more nav-btn">узнать больше</a>' +
            '</nav>'
    })
    .component('registerForm', {
        controller: function($http, $scope) {
            var vm = this;
            vm.visitor = {};
            vm.registerVisitor = function() {
                $http.post('api/visitors/register', vm.visitor)
                    .success(function(response) {
                        if (response.success || response.data && response.data.success) {
                            if (!$('.alert').length) {
                                $('.result-alert').append('<div class="alert alert-success alert-dismissible" role="alert">' +
                                    '<button type="button" class="close" data-dismiss="alert" aria-label="Закрыть"><span aria-hidden="true">&times;</span></button>' +
                                    '<strong>Спасибо!</strong> Ждем вас на конференции!' +
                                '</div>');
                            }
                            $scope.registerForm.$dirty = false;
                            vm.visitor = {};
                        } else {
                            console.log(response);
                        }
                    });
            };
        },
        template: '<section class="clearfix">' +
                '<div class="result-alert"></div>' +
                //'<div class="col-md-4 pull-left explanation ">Дорогие братья и сестры в Мессии Иешуа, данная форма предназначена для того, чтобы мы могли ориентироваться в количестве человек. Если у вас нет электронной почты, это поле можно оставить пустым. Остальные два поля должны быть заполнены. Благорадим за ваше время!' +
                //'</div>' +
                '<form name="registerForm" class="col-md-6 col-md-offset-3">' +
                  '<span class="error-message" ng-if="registerForm.$invalid && registerForm.$dirty ">Введите ваше имя и название вашей церкви</span>' +
                  '<div class="form-group">' +
                    '<label for="inputFIO">ФИО:</label>' +
                    '<input ng-required="true" ng-model="$ctrl.visitor.name" type="text" class="form-control" id="inputFIO" placeholder="ФИО">' +
                  '</div>' +
                  '<div class="form-group">' +
                    '<label for="church">Церковь:</label>' +
                      '<input ng-required="true" ng-model="$ctrl.visitor.church" type="text" class="form-control" id="church" placeholder="Церковь">' +
                  '</div>' +
                  '<div class="form-group">' +
                    '<label for="inputEmail">Email:</label>' +
                    '<input ng-model="$ctrl.visitor.email" type="email" class="form-control" id="inputEmail" placeholder="Email">' +
                  '</div>' +
                  '<div class="form-group">' +
                    '<button ng-disabled="registerForm.$invalid" type="submit" class="btn btn-default" ng-click="$ctrl.registerVisitor()">Регистрация</button>' +
                  '</div>' +
                '</form></section>'
    })
    .component('knowMore', {
        controller: function() {
            $('.panel-title a').click(function(event) {
                event.preventDefault();
            });
        },
        template: 
        '<section class="knowmore-content">'+
            '<div class="panel-group" id="accordion">'+
              '<div class="panel panel-default">'+
                '<div class="panel-heading">'+
                  '<h4 class="panel-title">'+
                          '<a data-toggle="collapse" data-parent="#accordion" href="#aboutConf">'+
                            'о конференции'+
                          '</a>'+
                        '</h4>'+
                '</div>'+
                '<div id="aboutConf" class="panel-collapse collapse">'+
                  '<div class="panel-body">'+
                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'+
                  '</div>'+
                '</div>'+
              '</div>'+

              '<div class="panel panel-default">'+
                '<div class="panel-heading">'+
                  '<h4 class="panel-title">'+
                          '<a data-toggle="collapse" data-parent="#accordion" href="#programm">'+
                            'программа'+
                          '</a>'+
                        '</h4>'+
                '</div>'+
                '<div id="programm" class="panel-collapse collapse">'+
                  '<div class="panel-body">'+
                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'+
                  '</div>'+
                '</div>'+
              '</div>'+

              '<div class="panel panel-default">'+
                '<div class="panel-heading">'+
                  '<h4 class="panel-title">'+
                          '<a data-toggle="collapse" data-parent="#accordion" href="#speakers">'+
                            'спикеры'+
                          '</a>'+
                        '</h4>'+
                '</div>'+
                '<div id="speakers" class="panel-collapse collapse">'+
                  '<div class="panel-body">'+
                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'+
                  '</div>'+
                '</div>'+
              '</div>'+

              '<div class="panel panel-default">'+
                '<div class="panel-heading">'+
                  '<h4 class="panel-title">'+
                          '<a data-toggle="collapse" data-parent="#accordion" href="#address">'+
                            'место проведения'+
                          '</a>'+
                        '</h4>'+
                '</div>'+
                '<div id="address" class="panel-collapse collapse">'+
                  '<div class="panel-body">'+
                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'+
                  '</div>'+
                '</div>'+
              '</div>'+

              '<div class="panel panel-default">'+
                '<div class="panel-heading">'+
                  '<h4 class="panel-title">'+
                          '<a data-toggle="collapse" data-parent="#accordion" href="#organizers">'+
                            'организаторы'+
                          '</a>'+
                        '</h4>'+
                '</div>'+
                '<div id="organizers" class="panel-collapse collapse">'+
                  '<div class="panel-body">'+
                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
        '</section>'
    });