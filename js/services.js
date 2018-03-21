/**
 * Created by Administrator on 2018/1/9.
 */
(function(){
    angular.module('app.services',[])
        .constant('ROOT_URL','http://127.0.0.1:12346/interface/ajax/')
        .service('adService',function($http,ROOT_URL){
            this.getAdvert = function(){
                return $http.get(ROOT_URL+'advert.php');
            }
        })
        .service('curBooks',function($http,ROOT_URL){
            this.getCurBooks = function(){
                return $http.get(ROOT_URL+'sectionApp.php');
            }
        })
        .service('bookService',function($http,ROOT_URL){
            //console.log($routeParams);
            this.getSingle = function(bookId){
                return $http.get(ROOT_URL+'detailBookMessage.php',{params:{id:bookId}});
            };
            this.getList = function(categoryId){
                return $http.get(ROOT_URL+'listByCategoryIdApp.php',{params:{id:categoryId}});
            };
            this.getKeyword = function(keyword){
                return $http.get(ROOT_URL+'listByKeywordApp.php',{params:{keyword:keyword}});
            };
            this.getSection = function(sectionId){
                return $http.get(ROOT_URL+'sectionSingle.php',{params:{id:sectionId}});
            }
        })
        .service('categoryService',function($http,ROOT_URL){
            this.getSort = function(){
                return $http.get(ROOT_URL+'bookCategory.php');
            }
        })
        .service('readerService' , function($http , ROOT_URL){
            this.login = function(data){
                return $http({
                    method:'post',
                    url: ROOT_URL + 'memberLogin.php',
                    data:data,
                    headers: { 'Content-Type': undefined },
                    transformRequest:function(data){
                        var formData = new FormData();
                        for(var key in data){
                            formData.append( key , data[key]);
                        }
                        return formData;
                    }
                });
            }
        })
        .service('verificationService' , function($http ,ROOT_URL){
            this.getVerification = function(phone){
                return $http.get(ROOT_URL+'sendCode.php',{params:{phone:phone}});
            }
        })
        .service('verificationRegisterService' , function($http ,ROOT_URL){
            this.getVerificationRegister = function(phone){
                return $http.get(ROOT_URL+'sendCodeRegister.php',{params:{phone:phone}});
            }
        })
        .service('VerifyCodeService' , function($http ,ROOT_URL){
            this.getVerifyCode = function(data){
                return $http({
                    method:'post',
                    url:ROOT_URL+'memberVerifyCodeForReset.php',
                    data:data,
                    headers: { 'Content-Type': undefined },
                    transformRequest:function(data){
                        var formData = new FormData();
                        for(var key in data){
                            formData.append( key , data[key]);
                        }
                        return formData;
                    }
                });
            }
        })
        .service('VerifyCodeRegisterService' , function($http ,ROOT_URL){
            this.getVerifyRegisterCode = function(data){
                return $http({
                    method:'post',
                    url:ROOT_URL+'memberVerifyCodeForResetRegister.php',
                    data:data,
                    headers: { 'Content-Type': undefined },
                    transformRequest:function(data){
                        var formData = new FormData();
                        for(var key in data){
                            formData.append( key , data[key]);
                        }
                        return formData;
                    }
                });
            }
        })
        .service('revisePasswordService' , function($http ,ROOT_URL){
            this.getReset = function(data){
                return $http({
                    method:'post',
                    url:ROOT_URL+'memberReset.php',
                    data:data,
                    headers: { 'Content-Type': undefined },
                    transformRequest:function(data){
                        var formData = new FormData();
                        for(var key in data){
                            formData.append( key , data[key]);
                        }
                        return formData;
                    }
                });
            }
        })
        .service('registerPasswordService' , function($http ,ROOT_URL){
            this.getRegisterPwd = function(data){
                return $http({
                    method:'post',
                    url:ROOT_URL+'memberRegister.php',
                    data:data,
                    headers: { 'Content-Type': undefined },
                    transformRequest:function(data){
                        var formData = new FormData();
                        for(var key in data){
                            formData.append( key , data[key]);
                        }
                        return formData;
                    }
                });
            }
        })
        .service('addBookShelfService' , function($http , ROOT_URL){
            this.addBookShelf = function(readerId,bookId){
                return $http.get(ROOT_URL+'TransactionAddBookShelf.php',{params:{readerId:readerId,bookId:bookId}});
            }
        })
        .service('getMyshelfService' , function($http , ROOT_URL){
            this.getMyshelf = function(readerId){
                return $http.get(ROOT_URL+'TransactionGetMyShelf.php',{params:{readerId:readerId}});
            }
        })
        .service('removeBookOneService' , function($http , ROOT_URL){
            this.getRemoveBookOne = function(readerId,bookId){
                return $http.get(ROOT_URL+'TransactionRemoveBookFromShelf.php',{params:{readerId:readerId,bookId:bookId}});
            }
        })
        .service('removeBookAllService' , function($http , ROOT_URL){
            this.getRemoveBookAll = function(readerId){
                return $http.get(ROOT_URL+'TransactionRemoveMyShelf.php',{params:{readerId:readerId}});
            }
        })
        .service('SubmitOrderService' , function($http ,ROOT_URL){
            this.getSubmitOrder = function(data){
                return $http({
                    method:'post',
                    url:ROOT_URL+'TransactionSubmitOrder.php',
                    data:data,
                    headers: { 'Content-Type': undefined },
                    transformRequest:function(data){
                        var formData = new FormData();
                        for(var key in data){
                            formData.append( key , data[key]);
                        }
                        return formData;
                    }
                });
            }
        })
        .service('GetBorrowRecordsService' , function($http , ROOT_URL){
            this.GetBorrowRecords = function(readerId){
                return $http.get(ROOT_URL+'TransactionGetBorrowRecords.php',{params:{readerId:readerId}});
            }
        })
        .service('CancelOrderService' , function($http ,ROOT_URL){
            this.CancelOrder = function(data){
                return $http({
                    method:'post',
                    url:ROOT_URL+'TransactionCancelOrder.php',
                    data:data,
                    headers: { 'Content-Type': undefined },
                    transformRequest:function(data){
                        var formData = new FormData();
                        for(var key in data){
                            formData.append( key , data[key]);
                        }
                        return formData;
                    }
                });
            }
        })
        .service('ConfirmOrderService' , function($http ,ROOT_URL){
            this.getConfirmOrder = function(data){
                return $http({
                    method:'post',
                    url:ROOT_URL+'TransactionConfirmOrder.php',
                    data:data,
                    headers: { 'Content-Type': undefined },
                    transformRequest:function(data){
                        var formData = new FormData();
                        for(var key in data){
                            formData.append( key , data[key]);
                        }
                        return formData;
                    }
                });
            }
        })
        .service('DeleteOrderService' , function($http ,ROOT_URL){
            this.getDeleteOrder = function(data){
                return $http({
                    method:'post',
                    url:ROOT_URL+'TransactionDeleteOrder.php',
                    data:data,
                    headers: { 'Content-Type': undefined },
                    transformRequest:function(data){
                        var formData = new FormData();
                        for(var key in data){
                            formData.append( key , data[key]);
                        }
                        return formData;
                    }
                });
            }
        });


})();