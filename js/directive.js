/**
 * Created by Administrator on 2018/1/8.
 */
(function(){
    angular.module('app.directive',[])
        .directive('lwhCur',function(){
            return{
                replace:true,
                restrict:'EA',
                templateUrl:'template/Cur.html',
                scope:{
                    section:'='
                },
                controller:function($scope,$location){
                    $scope.goDetail = function(book){
                        //console.log(book);
                        $location.url('/detail/'+book.bookId);
                    };
                    $scope.goLibList = function(item){
                        console.log(item);
                        $location.url('/libList?sectionId='+item.Id);
                    }
                }
            };
        })

        .directive('lwhLiblist' , function(){
            return {
                replace:true,
                restrict:'EA',
                templateUrl:'template/libList1.html',
                scope:{
                    list:'='
                }
            }
        })
        .directive('lwhAlert',function(){
            return{
                replace:true,
                restrict:'EA',
                templateUrl:'template/alert.html',
                scope:{
                    content:'@',
                    state:'=',
                    confirm:'&onconfirm',
                    cancel:'&oncancel'
                },
                controller:function($scope){
                    $scope.alert_onconfim = function(){
                        if($scope.confirm){
                            $scope.confirm();
                        }
                        $scope.state = false;
                    };
                    $scope.alert_oncancel = function(){
                        if($scope.cancel){
                            $scope.cancel();
                        }
                        $scope.state = false;
                    };

                }
            }
        })
        .directive('lwhAlertDel',function(){
            return{
                replace:true,
                restrict:'EA',
                templateUrl:'template/alertDel.html',
                scope:{
                    content:'@',
                    state1:'=',
                    confirm:'&onconfirm',
                    cancel:'&oncancel'
                },
                controller:function($scope){
                    $scope.alertDel_onconfim = function(){
                        if($scope.confirm){
                            $scope.confirm();
                        }
                        $scope.state1 = false;
                    };
                    $scope.alertDel_oncancel = function(){
                        if($scope.cancel){
                            $scope.cancel();
                        }
                        $scope.state1 = false;
                    };
                }
            }
        });

})();