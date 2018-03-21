/**
 * Created by Administrator on 2018/1/8.
 */
(function(){
    angular.module('app.controllers' , ['app.services'])
        .controller('homepageController' , function($scope,adService,curBooks,$location){
            $scope.list = [];
            adService.getAdvert().then(function(response){
                if(response.data.Code == 100){
                    $scope.list = response.data.Data;
                    ad.src = $scope.list[0].Image;
                    //console.log($scope.list);
                }
            });

            curBooks.getCurBooks().then(function(response){
                $scope.section = [];
                console.log(response);

                if(response.data.Code == 100){
                    $scope.section = response.data.Data;
                    //console.log( $scope.section.Books);
                   // $scope.books = $scope.section[0].Books;
                    //console.log($scope.books);
                }
            });

            $scope.goSearch = function(){
                $location.url('/search');
            };

            var ad = document.querySelector('#ad');
            var i = 1;

            setInterval(function(){
                if(i < $scope.list.length){
                    ad.src = $scope.list[i].Image;
                    i++;
                }
                else{
                    i = 0;
                }
            },2000);




        })
        .controller('categoryController' , function($scope,categoryService,$location){
            categoryService.getSort().then(function(response){
                $scope.sort = [];
                console.log(response);
                if(response.data.Code == 100){
                    $scope.sort = response.data.Data;
                }
            });
            $scope.goList = function(item){
                console.log(item);
                $location.url('/libList?categoryId='+item.Id);
            }
        })
        .controller('discoverController' , function($scope){

        })
        .controller('mineController' , function($scope,$location,$window){
            $scope.goLogin = function(){
                $location.url('/login');
            };
            //个人中心：我的借书架
            $scope.goMyCart = function(){
                if($window.localStorage.getItem('Current')){
                    $scope.reader = JSON.parse($window.localStorage.getItem('Current'));
                    $location.url('/myCart');
                }
                else{
                    $location.url('/login');
                }
            };
            $scope.goMyOrder = function(){
                if($window.localStorage.getItem('Current')){
                    $scope.reader = JSON.parse($window.localStorage.getItem('Current'));
                    $location.url('/myOrder');
                }
                else{
                    $location.url('/login');
                }
            };



            $scope.isLogin = false;
            $scope.reader = {};
            if($window.localStorage.getItem('Current')){
                $scope.reader = JSON.parse($window.localStorage.getItem('Current'));
                $scope.isLogin = true;
            }
            //去注销
            $scope.goLogout = function(){
                $location.url('/goLogout');
            };

            //去软件反馈
            $scope.goMyBack = function(){
                if($window.localStorage.getItem('Current')){
                    $scope.reader = JSON.parse($window.localStorage.getItem('Current'));
                    $location.url('/myBack');
                }
                else{
                    $location.url('/login');
                }
            }
            //去关于我们
            $scope.goAboutUs = function(){
                $location.url('/aboutUs');
            }
            //去常见问题
            $scope.goQuestion = function(){
                $location.url('question');
            }

        })
        .controller('detailController' , function($scope,$routeParams,bookService,$location,$window,addBookShelfService){
            var id = $routeParams.bookId;
            console.log(id);
            $scope.detail = [];
            bookService.getSingle(id).then(function(response){
            console.log(response);
                if(response.data.Code == 100){
                    $scope.detail = response.data.Data[0];
                    //console.log($scope.detail);
                }
            });
           // 我的借书架
            $scope.goCart = function(){
                if($window.localStorage.getItem('Current')){

                    $scope.reader = JSON.parse($window.localStorage.getItem('Current'));
                    console.log($scope.reader.Id);
                    $location.url('/myCart');
                }
                else{
                    $location.url('/login');
                }
            };
            //加入借书架
            $scope.addBookShelf = function(){
                if($window.localStorage.getItem('Current')){
                    $scope.reader = JSON.parse($window.localStorage.getItem('Current'));
                    //console.log($scope.reader);
                    //console.log(id);
                    addBookShelfService.addBookShelf($scope.reader.Id,id)
                        .then(function(response){
                            console.log(response);
                            if(response.status == 200 && response.data.Code == 100){
                                //alert('加入成功!');
                                    $scope.deleteState = true;
                            }
                            if(response.data.Code == 102){
                                    $scope.onlyState = true;
                            }
                            if(response.data.Code == 103){
                                    $scope.logoutState = true;
                            }
                        })
                }
                else{
                    $location.url('/login');
                }
            }

        })
        .controller('libListController' , function($scope,$routeParams,bookService){
            $scope.books = [];
            if($routeParams.sectionId){
                // 按首页的栏目查询图书信息
                bookService.getSection($routeParams.sectionId).then(function(response){
                    if(response.status == 200 && response.data.Code == 100){
                        $scope.books = response.data.Data;
                        console.log($scope.books);
                        if($scope.books.length == 0){
                            document.querySelector('#noMessage').style.display = 'block';
                        }
                        else{
                            document.querySelector('#noMessage').style.display = 'none';
                        }
                    }
                });
            }
            var categoryId = $routeParams.categoryId || '';
            var keyword = $routeParams.keyword ;
            if(categoryId) {
                //var parameter = {
                //    categoryId : categoryId,
                //    keyword:keyword
                //};
                //console.log(parameter);
                bookService.getList(categoryId).then(function (response) {
                    if (response.status == 200 && response.data.Code == 100) {
                        $scope.books = response.data.Data;
                        console.log($scope.books);
                        console.log($scope.books.length);
                        if ($scope.books.length == 0) {
                            document.querySelector('#noMessage').style.display = 'block';
                        }
                        else {
                            document.querySelector('#noMessage').style.display = 'none';
                        }
                    }
                });
            }
            if(keyword){
                bookService.getKeyword(keyword).then(function(response){
                    if(response.status == 200 && response.data.Code == 100){
                        $scope.books = response.data.Data;
                        console.log($scope.books);
                        console.log($scope.books.length);
                        if($scope.books.length == 0){
                            document.querySelector('#noMessage').style.display = 'block';
                        }
                        else{
                            document.querySelector('#noMessage').style.display = 'none';
                        }
                    }
                });
            }



        })

        .controller('goSearchController' , function($scope,$location,$window){
            $scope.keyword = '';
            $scope.keywordArray = [];


            if($window.localStorage.getItem('History')){
                $scope.keywordArray = JSON.parse($window.localStorage.getItem('History'));
            }

            $scope.searchList = function(){
                // 保存查询记录
                if($scope.keywordArray.indexOf($scope.keyword)<0){
                    $scope.keywordArray.push($scope.keyword);
                    $window.localStorage.setItem('History' , JSON.stringify($scope.keywordArray));
                }
                console.log($scope.keywordArray);

                $location.url('/libList?keyword=' + $scope.keyword);
            };

            $scope.clear = function(){

                $scope.keywordArray = [];
                //$window.localStorage.setItem('History' , JSON.stringify($scope.keywordArray));
                $window.localStorage.removeItem('History');
            }
        })
        .controller('loginController' , function($scope,$location,readerService,$window){
            $scope.goRevise = function(){
                $location.url('/revise');
            };

            $scope.account = {
                password:'',
                phone:''
            };

            $scope.reader = {
                phone:'',
                password:''
            };
            $scope.login = function(){
                readerService.login($scope.reader)
                    .then(function(response){
                        console.log(response);
                        if(response.status == 200 && response.data.Code == 100){
                            // 保存用户
                            $window.localStorage.setItem('Current' , JSON.stringify(response.data.Data[0]));
                            //dataCacheService.save('Current' , respnos.data.Data);
                            //
                            $location.url('/mine');

                        }
                        else{
                            document.querySelector('#loginTishi').style.display = 'block';
                        }
                    });
            };
            $scope.goRegister = function(){
                $location.url('/register');
            }
        })
        //注册新用户
        .controller('registerController' , function($scope,$location,verificationRegisterService,VerifyCodeService,VerifyCodeRegisterService){

            $scope.userMessageReg = {
                phone:'',
                ewm:''
            };

            var duration = 10;
            var getYZ = document.querySelector('#getYZRegister');
            getYZ.onclick = function() {
                var self = this;
                self.disabled = true;
                var timer = window.setInterval(function () {
                    duration--;
                    if (duration == 0) {
                        self.disabled = false;
                        self.innerText = '重新发送';
                        clearInterval(timer);
                    }
                    else if (duration > 0) {
                        self.innerText = duration + '秒';
                    }
                    else {
                        self.disabled = true;
                        duration = 10;
                    }
                }, 1000);


                $scope.user = {
                    phone: $scope.userMessageReg.phone
                }
                verificationRegisterService.getVerificationRegister($scope.user.phone).then(function (response) {
                    console.log(response);
                    if (response.status == 200 && response.data.Code == 100) {

                    }
                    if (response.status == 200 && response.data.Code == 103) {
                        document.querySelector('#registerTisi2').style.display = 'block';
                        document.querySelector('#registerTisi1').style.display = 'none';
                        document.querySelector('#registerTisi').style.display = 'none';
                    }
                    if (response.status == 200 && response.data.Code == 101) {
                        document.querySelector('#registerTisi2').style.display = 'none';
                        document.querySelector('#registerTisi1').style.display = 'none';
                        document.querySelector('#registerTisi').style.display = 'block';
                    }
                    //else{
                    //    document.querySelector('#registerTisi').style.display = 'block';
                    //}
                });
            }
                $scope.goRegisterSuccess = function(){
                    $scope.userCode = {
                        phone:$scope.userMessageReg.phone,
                        code:$scope.userMessageReg.ewm
                    };

                    VerifyCodeRegisterService.getVerifyRegisterCode($scope.userCode).then(function(response){
                        if(response.status == 200 && response.data.Code == 100){
                            console.log(response);
                            $location.url('/registerSuccess?phone='+$scope.userCode.phone);
                        }
                        else{
                            document.querySelector('#registerTisi').style.display = 'block';
                            document.querySelector('#registerTisi1').style.display = 'none';
                            document.querySelector('#registerTisi2').style.display = 'none';
                        }
                    })
                };



        })
        .controller('registerSuccessController',function($routeParams,$scope,$location,registerPasswordService){
            $scope.registerReader = {
                phone:$routeParams.phone,
                name:'',
                password:'',
                confrim:''
            };
            $scope.confirmRegister = function(){
                registerPasswordService.getRegisterPwd($scope.registerReader)
                    .then(function(response){
                        console.log(response);
                        if(response.status == 200 && response.data.Code == 100){
                            $location.url('/login');
                        }
                    })
            }
        })
        //重置密码
        .controller('reviseController' , function($scope,$location,verificationService,VerifyCodeService){


            $scope.userMessage = {
                phone:'',
                ewm:''
            };


            var duration = 10;
            var getYZ = document.querySelector('#getYZ');
            getYZ.onclick = function() {
                var self = this;
                self.disabled = true;
                var timer = window.setInterval(function () {
                    duration--;
                    if (duration == 0) {
                        self.disabled = false;
                        self.innerText = '重新发送';
                        clearInterval(timer);
                    }
                    else if (duration>0) {
                        self.innerText = duration + '秒';
                    }
                    else{
                        self.disabled = true;
                        duration = 10;
                    }
                }, 1000);

                $scope.user={
                    phone:$scope.userMessage.phone
                }
                verificationService.getVerification($scope.user.phone).then(function(response){
                    console.log(response);
                    if(response.status == 200 && response.data.Code == 100){

                    }
                    else{
                        document.querySelector('#revisetisi1').style.display = 'block';
                        document.querySelector('#reviseTisi').style.display = 'none';
                    }
                })


            };
            $scope.goConfirmRevise = function(){
                $scope.user = {
                    phone:$scope.userMessage.phone,
                    code:$scope.userMessage.ewm
                };
                VerifyCodeService.getVerifyCode($scope.user).then(function(response){
                    if(response.status == 200 && response.data.Code == 100){
                        console.log(response);
                        $location.url('/confirmRevise?Id='+response.data.Data[0].Id);
                    }
                    else{
                        document.querySelector('#reviseTisi').style.display = 'block';
                        document.querySelector('#revisetisi1').style.display = 'none';
                    }
                })
            }


        })
        .controller('confirmReviseController' , function($routeParams,$scope,$location,revisePasswordService){
            $scope.reviseReader = {
                readerId:$routeParams.Id,
                password:'',
                confrim:''
            };
            console.log($routeParams.Id);
            $scope.confirmRevise = function(){
                revisePasswordService.getReset($scope.reviseReader)
                    .then(function(response){
                        console.log(response);
                        if(response.status == 200 && response.data.Code == 100){
                            $location.url('/login');
                        }
                    })
            }



        })
        .controller('goLogoutController' , function($scope,$location,$window){
            $scope.logout = function(){
                $scope.logoutName = true;

            };


            $scope.confirmLogout = function(){
                //console.log('111');
                $window.localStorage.removeItem('Current');
                $scope.isLogin = false;
                $location.url('/mine');

                //$window.location.reload();
            };

            $scope.cancelLogout = function(){
                $scope.state1 = false;
            }
        })
        .controller('myCartController' , function(SubmitOrderService,removeBookAllService,$window,$scope,$location,getMyshelfService,removeBookOneService){
            $scope.myBooks = [];
            $scope.confirmState=false;
            $scope.length={
                length:'0'
            };
            $scope.reader = JSON.parse($window.localStorage.getItem('Current'));
            console.log($scope.reader);

            function lwhDelete() {
                getMyshelfService.getMyshelf($scope.reader.Id)
                    .then(function (response) {
                        if (response.status == 200 && response.data.Code == 100) {
                            console.log(response);
                            $scope.myBooks = response.data.Data;
                            $scope.length.length = response.data.Data.length;
                            console.log($scope.myBooks);
                        }else{
                            $scope.myBooks = response.data.Data;
                            $scope.length.length = 0;
                        }
                    });
            };
            lwhDelete();
            //移除借书架中的图书项(单项)
            $scope.removeOne = function(item){
                console.log(item);
                $scope.confirmState = true;
                $scope.state1={
                    name:item.bookName,
                    bookId:item
                };

            };

                $scope.afterConfirm= function(item){
                    console.log(item);
                    removeBookOneService.getRemoveBookOne($scope.reader.Id,item.bookId).then(function(response){
                        if(response.status == 200 && response.data.Code == 100){
                            console.log(response);
                            //$window.location.reload();
                            lwhDelete();
                            $scope.state1 = false;
                            //$scope.confirmState = true;

                        }
                    })
            };


            $scope.afterCancel= function(){
                //$window.location.reload();
            };


            $scope.removeAll = function(){
                $scope.confirmStateAll = true;

            };

            $scope.afterConfirmAll = function(){
                removeBookAllService.getRemoveBookAll($scope.reader.Id)
                    .then(function(response){
                        if(response.status == 200 && response.data.Code == 100){
                            console.log(response);
                            $scope.state1 = false;
                            lwhDelete();
                           //document.querySelector('.myCartCon').remove();
                        }
                    })
            };


            $scope.goMyOrder1 = function(){
                SubmitOrderService.getSubmitOrder($scope.reader)
                    .then(function(response){
                        if(response.status == 200 && response.data.Code == 100){
                            console.log(response);
                            $location.url('myOrder');
                        }
                        else{
                            $scope.orderDefault = true;
                        }
                    });

            }


        })
        .controller('myOrderController' , function($interval,DeleteOrderService,ConfirmOrderService,CancelOrderService,$scope,$location,$window,GetBorrowRecordsService){
            $scope.myOrderConfirm = '确认';
            $scope.myOrderCancel = '取消订单';
            $scope.myOrderDelete = '删除订单';
            $scope.myOrder = [];
            $scope.reader = JSON.parse($window.localStorage.getItem('Current'));



            $scope.timer = $interval(function(){
                $scope.orderMessage();
            },500);
            $scope.orderMessage = function(){
                GetBorrowRecordsService.GetBorrowRecords($scope.reader.Id)
                    .then(function(response){
                        //console.log(response);
                        if(response.status == 200 && response.data.Code == 100){
                            $scope.myOrder = response.data.Data;
                        }


                    });
            };
            $scope.orderMessage();

            $scope.$on('destroy',function(){
                $interval.cancel($scope.timer);
            });


            //$scope.isConfirm = true;
            //$scope.isCancel = true;
            //$scope.isDelete = false;
            $scope.stateName = function(state){
                if(state == 0){
                    $scope.isDelete = true;
                    $scope.isConfirm = false;
                    $scope.isCancel = false;
                    return '已取消';
                }

                if(state == 1)
                {
                    $scope.isDelete = false;
                    $scope.isConfirm = false;
                    $scope.isCancel = true;
                    return '待配送';
                }

                if(state == 2){
                    $scope.isDelete = false;
                    $scope.isConfirm = true;
                    $scope.isCancel = false;
                    return '配送中';
                }

                if(state == 3){
                    $scope.isDelete = false;
                    $scope.isConfirm = false;
                    $scope.isCancel = false;
                    return '已确认';
                }

                if(state == 4){
                    $scope.isDelete = true;
                    $scope.isConfirm = false;
                    $scope.isCancel = false;
                    return '已归还';
                }

            };


                $scope.CancelOrder = function(item){
                    //console.log(item);
                    $scope.CanOrder={
                        orderId:item.BorrowNumber,
                        readerId:$scope.reader.Id
                    };

                    CancelOrderService.CancelOrder($scope.CanOrder)
                        .then(function(response){
                            console.log(response);
                            if(response.status == 200 && response.data.Code == 100){
                                $scope.isConfirm = false;
                                $scope.isCancel = false;
                                $scope.isDelete = true;
                                $window.location.reload();
                            }

                        })
                };



            $scope.ConfrimOrder = function(item){
                console.log($scope.reader.Id);
                $scope.ConOrder={
                    orderId:item.BorrowNumber,
                    readerId:$scope.reader.Id
                };
                ConfirmOrderService.getConfirmOrder( $scope.ConOrder)
                    .then(function(response){
                        console.log(response);
                        if(response.status == 200 && response.data.Code == 100){
                            $scope.isConfirm = false;
                            $scope.isCancel = false;
                            $scope.isDelete = false;
                            $window.location.reload();
                        }
                    })
            };


            $scope.DeleteOrder = function (item) {
                $scope.DelOrder = {
                    orderId:item.BorrowNumber,
                    readerId:$scope.reader.Id
                };
                DeleteOrderService.getDeleteOrder( $scope.DelOrder)
                    .then(function(response){
                        console.log(response);
                        if(response.status == 200 && response.data.Code == 100){
                            //$scope.isConfirm = false;
                            //$scope.isCancel = false;
                            //$scope.isDelete = false;
                            $window.location.reload();
                        }
                    })
            };

            $scope.allOrder1 = true;
            $scope.daipeisong1 = false;
            $scope.yiqueren1 = false;
            $scope.yiguihuan1 = false;
            $scope.isActive1 = true;
            $scope.isActive2 = false;
            $scope.isActive3 = false;
            $scope.isActive4 = false;


            $scope.allOrder = function(){
                $scope.isActive1 = true;
                $scope.isActive2 = false;
                $scope.isActive3 = false;
                $scope.isActive4 = false;
                $scope.allOrder1 = true;
                $scope.daipeisong1 = false;
                $scope.yiqueren1 = false;
                $scope.yiguihuan1 = false;
            }
            $scope.daipeisong = function(){
                $scope.newOrder=Array.from($scope.myOrder);
                $scope.newOrder=$scope.newOrder.filter(function(item){
                    return item.State==1;
                })
                console.log($scope.newOrder);
                $scope.isActive1 = false;
                $scope.isActive2 = true;
                $scope.isActive3 = false;
                $scope.isActive4 = false;
                $scope.daipeisong1 = true;
                $scope.allOrder1 = false;
                $scope.yiqueren1 = false;
                $scope.yiguihuan1 = false;
            }
            $scope.yiqueren = function(){
                $scope.newConfrim=Array.from($scope.myOrder);
                $scope.newConfrim=$scope.newConfrim.filter(function(item){
                    return item.State==2;
                })
                console.log($scope.newOrder);
                $scope.isActive1 = false;
                $scope.isActive2 = false;
                $scope.isActive3 = true;
                $scope.isActive4 = false;
                $scope.daipeisong1 = false;
                $scope.allOrder1 = false;
                $scope.yiqueren1 = true;
                $scope.yiguihuan1 = false;
            }

            $scope.yiguihuan = function(){
                $scope.newGui=Array.from($scope.myOrder);
                $scope.newGui=$scope.newGui.filter(function(item){
                    return item.State==4;
                })
                console.log($scope.newOrder);
                $scope.isActive1 = false;
                $scope.isActive2 = false;
                $scope.isActive3 = false;
                $scope.isActive4 = true;
                $scope.daipeisong1 = false;
                $scope.allOrder1 = false;
                $scope.yiqueren1 = false;
                $scope.yiguihuan1 = true;
            }

        })
        .controller('myBackController' , function($scope){

        })
        .controller('aboutUsController' , function($scope){

        })
        .controller('questionController' , function($scope){

        })

})();