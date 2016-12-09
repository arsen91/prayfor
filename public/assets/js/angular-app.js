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
                template: '<div class="col-md-6 col-md-offset-3"><table class="table table-striped"><thead><tr><th>#</th><th>Имя</th><th>Церковь</th><th>Email</th></tr></thead>' +
                  '<tbody><tr ng-repeat="person in PP.people track by $index">' +
                  '<th>{{$index+1}}</th>' +
                  '<td>{{person.name}}</td>' +
                  '<td>{{person.church}}</td>' +
                  '<td>{{person.email}}</td>' +
                  '</tr></tbody>' +
                  '</table></div>'
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
                    '<span class="dates">27-28 января</span>' +
                '</div>' +
                '<a href="#/knowmore" class="know-more nav-btn">узнать больше</a>' +
            '</nav>'
    })
    .component('registerForm', {
        controller: function($http, $scope) {
            var vm = this;
            vm.visitor = {};
            $http.get('api/visitors/count')
              .success(function(response) {
                vm.visitorCount = response.count;
              });

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
                    '<label for="inputEmail">Email:</label><span class="not-req"> (Не обязательное поле)</span>' +
                    '<input ng-model="$ctrl.visitor.email" type="email" class="form-control" id="inputEmail" placeholder="Email">' +
                  '</div>' +
                  '<div class="form-group">' +
                    '<button ng-disabled="registerForm.$invalid" type="submit" class="btn btn-default" ng-click="$ctrl.registerVisitor()">Регистрация</button>' +
                  '</div>' +
                '</form>' +
                '<div class="col-md-5 col-md-offset-5"><span class="reg">Уже зарегистрировано {{$ctrl.visitorCount}}</span></div></section>'
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
                    '<p class="knowmore-section-text">Шалом, Хаверим! Мир Вам, Друзья! В преддверии молитвы мы хотели бы поделиться с вами видением, которое получили от Господа объединенной командой служителей из мессианской еврейской общины «Новый Завет», церкви ХВЕ «Христианская Надежда» и церкви ЕХБ «Спасение во Христе». Это видение было посеяно Господом в наши сердца, долго созревало и проросло в желание сотворить нечто угодное Творцу, чтобы нам всем вместе, в ЕДИНСТВЕ <b>(Ин.17:21-23)</b>, разделить Его сердце и Его боль по потерянным <b>(Ин.3:16; Лк.19:10)</b> и Его порядок благовестия <b>(Рим.1:16)</b>, дабы мощное излияние и действие Духа Святого <b>(Деян.1:8, 15:16-17)</b>, несущее ПРОБУЖДЕНИЕ и жизнь из мертвых <b>(Рим. 11:11-15)</b> во всей полноте <b>(Ин.10:10)</b> пришло в наши церкви, общины и в нашу страну.</p>'+
                    '<p class="knowmore-section-text">Пробуждение... Что значит это громкое слово? Кто-то спал и проснулся, кто-то умирал и ожил, кто-то был слеп и прозрел в том или ином аспекте. Мы, как верующие в Иешуа (Иисуса), должны пробудиться для того, чтобы собрать жатву. Взгляд Господа исполнен глубоким состраданием к людям. Люди без Бога. Человечество, бесполезно бродящее по дорогам, которые ведут в никуда.  Господь зовет нас увидеть Его глазами все беды и отчаяние сокрушенного народа. Господь говорит Своим ученикам: «Жатвы много, а делателей мало». Он видит человечество как поле созревшей пшеницы, волнующееся под летним ветром. Но мало делателей. Машиях (Христос) говорит об огромной работе, которую Он должен совершить, и о том, что Он нуждается в соработниках. Согласитесь, ведь это почетное звание быть соработником самого Творца. Давайте же будем молиться, чтобы страх благовествования был разрушен, чтобы пелена безразличия была снята и чтобы мы росли достойными делателями для жатвы Господней.</p>'+
                    '<p class="knowmore-section-text">Есть чудесная новость: мы не одиноки,  нас много, и вместе мы гораздо сильнее! К сожалению, многие преуменьшают силу Единства, но ведь действительно "нитка, втрое скрученная, не скоро порвется"! Кто из нас не скорбит душой, когда видит равнодушие, а то и разделение среди тех людей, которых должна объединять вера, среди которых должны царствовать мир и любовь, излитая в сердца христиан Духом Святым? Мы хотим покаяться за века разделения и вражды, соперничества и равнодушия между общинами и церквями. Дух любви должен восторжествовать над духом ненависти, дух смирения - над духом мятежа и гордыни, дух единства - над духом разделения, Дух Божий над духом человека! И восторжествует!!! Вместе мы покорим эту гору! Мы искренно благословляем ВАС и верим, что Отец Небесный говорит и вашему сердцу!</p>'+
                    '<p><b>С любовью, организаторы молитвы "За Пробуждение и Единство". Шалом!</b></p>'+
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
                    '<ul class="speackers-content">'+
                        '<li>'+
                            '<div class="speacker-img-wrapp">'+
                                '<img src="../images/patlis.jpg">'+
                            '</div>'+
                            '<p class="speacker-name">Александр Патлис</p>'+
                        '</li>'+

                        '<li>'+
                            '<div class="speacker-img-wrapp">'+
                                '<img src="../images/old_gorelik.jpg">'+
                            '</div>'+
                            '<p class="speacker-name">Церковь Христианская Надежда г. Минск пастор Игорь Горелик</p>'+
                        '</li>'+

                        '<li>'+
                            '<div class="speacker-img-wrapp">'+
                                '<img src="../images/stasilevich.jpg">'+
                            '</div>'+
                            '<p class="speacker-name">Николай Стасилевич Епископ Объединения ХВЕ в г. Минске и Минской области</p>'+
                        '</li>'+
                    '</ul>'+
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
                    '<p><b>Организаторами конференции выступает объединенная команда служителей из:</b></p>'+
                    '<ul>'+
                        '<li>мессианской еврейской общины "Новый Завет"</li>'+
                        '<li>церкви ХВЕ "Христианская Надежда", молодёжный пастор Евгений Горёлик</li>'+
                        '<li>церкви ЕХБ "Спасение во Христе", лидер прославления Андрей Устинов</li>'+
                    '</ul>'+
                    '<hr>'+
                    '<p><b>Контактный телефон:</b> +375 (29) 680-37-14 Александр</p>'+
                  '</div>'+
                '</div>'+
              '</div>'+
            '</div>'+
        '</section>'
    });
