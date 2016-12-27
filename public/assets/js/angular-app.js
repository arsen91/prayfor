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
            '<div class="event-time">'+
              '<p><b>Время проведения:</b></p>'+
              '<ul>'+
                '<li>27.02 - с 18:30 до 21:30</li>'+
                '<li>28.02 - с 10:00 до 21:00</li>'+
              '</ul>'+
            '</div>'+
              '<div class="panel panel-default">'+
                '<div class="panel-heading">'+
                  '<h4 class="panel-title">'+
                          '<a data-toggle="collapse" data-parent="#accordion" href="#aboutConf">'+
                            'видение конференции'+
                          '</a>'+
                        '</h4>'+
                '</div>'+
                '<div id="aboutConf" class="panel-collapse collapse">'+
                  '<div class="panel-body">'+
                    '<p class="knowmore-section-text">Шалом, Хаверим! Мир Вам, Друзья! Благодарим Бога за возможность пригласить вас на молитвенную конференцию "За Пробуждение и Единство".</p>'+
                    '<b>Видение:</b>'+
                    '<p class="knowmore-section-text">Мы знаем, что в это время Дух Святой побуждает многих молиться за единство, молиться за пробуждение, и за сердце Отца в нас! Каждая церковь и каждая община совершает свой вклад в Божье Царство.</p>'+
                    '<p>И мы верим, что вместе, в ЕДИНСТВЕ <b>(Ин.17:21-23)</b> нам будет легче разделить сердце и боль Отца по потерянным <b>(Ин.3:16; Лк.19:10)</b> и Его путь благовестия <b>(Рим.1:16)</b>, чтобы мощное излияние и действие Духа Святого <b>(Деян.1:8, 15:16-17)</b>, несущее ПРОБУЖДЕНИЕ и "жизнь из мертвых" <b>(Рим. 11:11-15)</b> еще в большей полноте раскрывалось в наших церквях, общинах и в нашем городе.</p>'+
                    '<p class="knowmore-section-text">И мы верим, что вместе, в ЕДИНСТВЕ <b>(Ин.17:21-23)</b> нам будет легче разделить сердце и боль Отца по потерянным <b>(Ин.3:16; Лк.19:10)</b> и Его путь благовестия <b>(Рим.1:16)</b>, чтобы мощное излияние и действие Духа Святого <b>(Деян.1:8, 15:16-17)</b>, несущее ПРОБУЖДЕНИЕ и "жизнь из мертвых" <b>(Рим. 11:11-15)</b> еще в большей полноте раскрывалось в наших церквях, общинах и в нашем городе.</p>'+
                    '<p class="knowmore-section-text">Это хорошая возможность прославить Бога, воодушевить друг друга и поделиться Божьей радостью.</p>'+
                    '<p class="knowmore-section-text">Мы чем-то можем отличаться друг от друга, но мы все Одно Тело, мы можем по разному выражать свое поклонение Богу, но у всех нас Один Господь, Одно Слово и мы все держимся на Одном корне!</p>'+
                    '<hr>'+
                    '<p><i>Вместе мы можем больше!</i></p>'+
                    '<b>С уважением организаторы молитвенной конференции за пробуждение и единство</b>'+
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
                    '<p><b>Описание программы:</b></p>'+
                    '<p class="knowmore-section-text">Вся программа направлена на достижение видения конференции и состоит из блоков. В каждом из них прославление и поклонение с участием команд из разных церквей, тематическое Слово и серьезная, глубокая молитва.</p>'+
                    '<p class="knowmore-section-text">Все вместе в субботу мы отпразднуем Шабат, с еврейским прославлением и хороводами, самый первый Божий праздник, который Господь заповедал Своему народу через Моисея (Левит 23:1-3). Мы верим, Господь повел нас, после шабата сделать специальный молодежный блок, с фокусом не просто на единство среди молодежи разных церквей, но также на единство ПОКОЛЕНИЙ в поместных церквях и общинах!</p>'+
                    '<hr>'+
                    '<p><i>Мы верим, Бог приготовил, что-то особенное для всех нас!</i></p>'+
                    '<p><b>С любовью, организаторы молитвенной конференции. Шалом!</b></p>'+
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
                            '<p class="speacker-name"><b>Александр Патлис</b></p>'+
                        '</li>'+

                        '<li>'+
                            '<div class="speacker-img-wrapp">'+
                                '<img src="../images/old_gorelik.jpg">'+
                            '</div>'+
                            '<p class="speacker-name"><b>Игорь Горелик</b> - пастор Церкви Христианская Надежда г. Минск.</p>'+
                        '</li>'+

                        '<li>'+
                            '<div class="speacker-img-wrapp">'+
                                '<img src="../images/stasilevich.jpg">'+
                            '</div>'+
                            '<p class="speacker-name"><b>Николай Стасилевич</b> - епископ Объединения ХВЕ в г. Минске и Минской области.</p>'+
                        '</li>'+

                        '<li>'+
                            '<div class="speacker-img-wrapp">'+
                                '<img src="../images/voronenko.jpg">'+
                            '</div>'+
                            '<p class="speacker-name"><b>Леонид Вороненко</b> - епископ Объединения общин христиан полного Евангелия в Беларуси.</p>'+
                        '</li>'+

                        '<li>'+
                            '<div class="speacker-img-wrapp">'+
                                '<img src="../images/kondrat.jpg">'+
                            '</div>'+
                            '<p class="speacker-name"><b>Виталий Кондрат</b> - старейшина Еврейской Мессианской общины "Брит Хадаша" г. Минска.</p>'+
                        '</li>'+

                        '<li>'+
                            '<div class="speacker-img-wrapp">'+
                                '<img src="../images/zenkovich.jpg">'+
                            '</div>'+
                            '<p class="speacker-name"><b>Роман Зенькович</b> - старейшина Еврейской Мессианской общины "Брит Хадаша" г. Минска.</p>'+
                        '</li>'+
                        
                        '<li>'+
                            '<div class="speacker-img-wrapp">'+
                                '<img src="../images/voinilovich.jpg">'+
                            '</div>'+
                            '<p class="speacker-name"><b>Войнилович Михаил Владимирович</b> - 1-й заместитель епископа Объединения ХВЕ в Минске и Минской области</p>'+
                        '</li>'+

                        '<li>'+
                            '<div class="speacker-img-wrapp">'+
                                '<img src="../images/vavilov.jpg">'+
                            '</div>'+
                            '<p class="speacker-name"><b>Александр Александрович Вавилов</b> - "церковь исцеления" председатель совета церкви г. Светлогорск </p>'+
                        '</li>'+
                    '</ul>'+
                  '</div>'+
                '</div>'+
              '</div>'+

              '<div class="panel panel-default">'+
                '<div class="panel-heading">'+
                  '<h4 class="panel-title">'+
                          '<a data-toggle="collapse" data-parent="#accordion" href="#youth-speakers">'+
                            'молодежные спикеры'+
                          '</a>'+
                        '</h4>'+
                '</div>'+
                '<div id="youth-speakers" class="panel-collapse collapse">'+
                  '<div class="panel-body">'+

                    '<ul class="speackers-content">'+
                        '<li>'+
                            '<div class="speacker-img-wrapp">'+
                                '<img src="../images/berezkin.jpg">'+
                            '</div>'+
                            '<p class="speacker-name"><b>Алексей Берёзкин</b> - молодёжный служитель</p>'+
                        '</li>'+

                        '<li>'+
                            '<div class="speacker-img-wrapp">'+
                                '<img src="../images/gorelik.jpg">'+
                            '</div>'+
                            '<p class="speacker-name"><b>Евгений Горелик</b> - молодёжный пастор</p>'+
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
                    '<p><b>Конференция пройдет по адресу:</b></p>'+
                    '<p>г. Минск, проспект Партизанский, 146а(здание церкви Вефиль)</p>'+
                    '<iframe class="map-of-event"  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3122.027317597624!2d27.66657809861371!3d53.86172062300236!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbcdf3e6bb919b%3A0xc9e4fe95f5275b47!2z0J_QsNGA0YLQuNC30LDQvdGB0LrQuNC5INC_0YDQvtGB0L8uIDE0NtCwLCDQnNC40L3RgdC6!5e0!3m2!1sru!2sby!4v1482774281189" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>'+
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
                        '<li>церкви ХВЕ "Христианская Надежда", молодёжный пастор Евгений Горелик</li>'+
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
