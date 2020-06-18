/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function() {

	var app = angular.module('je-transaction-paket-controller', [
			'je-transaction-paket-service',
                        'je-master-jenis-pengiriman-service',
                        'je-master-pengirim-service',
                        'je-master-track-service',
			'ui.bootstrap', 'dialogs' ]);

	app.controller('PaketListController', [ '$scope', '$location',
			'$dialogs', 'PaketListFactory',
			function($scope, $location, $dialogs, PaketListFactory) {

				$scope.currentPage = 1;
				$scope.totalPaket = 0;
				$scope.pageSize = 10;

				$scope.pagination = {
					current : 1
				};

				//ordering
				$scope.predicate='name';
                                $scope.reverse=false;
	            
				$scope.pageChanged = function(newPage) {
					$scope.gridPromise = PaketListFactory.query({
						activePage : newPage,
						order : $scope.predicate + "-" + ($scope.reverse ? "desc" : "asc")
					}, function(data) {
						$scope.paketList = data.list;
						$scope.totalPaket = data.total;
					});
				};
				$scope.pageChanged(1);

				$scope.search = function() {
					$scope.currentPage = 1;
					$scope.pageChanged(1);
				};

				$scope.create = function() {
					$location.path('/transaction/paket/new');
				};
			
		        
			    $scope.edit = function (paket) {
		            $location.path('/transaction/paket/' + paket.id_paket313339 + '/edit');
                            };
		        
                            $scope.detail = function (paket) {
                                $location.path('/transaction/paket/' + paket.id_paket313339 + '/detail');
                            };

			} ]);

	app.controller('PaketCreateController', [
			'$scope',
			'$routeParams',
			'$location',
			'$dialogs',
			'PaketListFactory',
                        'PengirimListFactory',
                        'JenisPengirimanListFactory',
			function($scope, $routeParams, $location,$dialogs,PaketListFactory,PengirimListFactory,JenisPengirimanListFactory) {

				$scope.title = "Buat Baru Paket";
				$scope.isEdit = false;
                                
                                $scope.statusList = [
                                        {"name":"Active"},
                                        {"name":"In Active"}
                                ];
                                
                                PengirimListFactory.query({},function(data) {
                                                    $scope.pengirimList = data.list;
                                            });
                                JenisPengirimanListFactory.query({},function(data) {
                                                    $scope.jenisPengirimanList = data.list;
                                            });
		    			

				$scope.paket = {
                                        
				};
                                
                                
                                 
				$scope.save = function() {
					PaketListFactory.create({
						paket : $scope.paket
					}, function(data) {
						//notif($dialogs, data.status, 'Simpan');
                                                if(data.status == "OK"){
                                                    dlg = $dialogs.notify('Informasi', 'Data Sukses Disimpan');
                                                }else{
                                                    dlg = $dialogs.error('Data Gagal Disimpan :'+data.status);
                                                }
						$location.path('/transaction/paket');
					});

				};

				$scope.cancel = function() {
					$location.path('/transaction/paket');
				};

			} ]);
	
        app.controller('PaketDetailController', [
	'$scope',
	'$routeParams',
	'$location',
	'PaketEditFactory',
	function($scope, $routeParams, $location, PaketEditFactory) {

		$scope.title = "Info Detail Paket";

		PaketEditFactory.show({
			id : $routeParams.id
		}, function(data) {
			$scope.paket = data.paket;
		});


		$scope.cancel = function() {
			$location.path('/transaction/paket');
		};

	} ]);
	
	app.controller('PaketEditController', [
			'$scope',
			'$routeParams',
			'$location',
			'$dialogs',
			'PaketEditFactory',
			'PengirimListFactory',
                        'JenisPengirimanListFactory',
			function($scope, $routeParams, $location, $dialogs,PaketEditFactory,
					PengirimListFactory,JenisPengirimanListFactory) {

				$scope.title = "Edit Data Paket";
				$scope.isEdit = true;
                                
                                $scope.statusList = [
                                        {"name":"Active"},
                                        {"name":"In Active"}
                                ];
                                
                                PengirimListFactory.query({},function(data) {
                                                    $scope.pengirimList = data.list;
                                            });
                                JenisPengirimanListFactory.query({},function(data) {
                                                    $scope.jenisPengirimanList = data.list;
                                            });
                                

				PaketEditFactory.show({
					id : $routeParams.id
				}, function(data) {
					$scope.paket = data.paket;
				});

				$scope.save = function() {
					PaketEditFactory.update({
						id : $scope.paket.id_paket313339,
						paket : $scope.paket
					}, function(data) {
						 if(data.status == "OK"){
                                                    dlg = $dialogs.notify('Informasi', 'Data Sukses Disimpan');
                                                }else{
                                                    dlg = $dialogs.error('Data Gagal Disimpan :'+data.status);
                                                }
						$location.path('/transaction/paket');
					});

				};

				$scope.cancel = function() {
					$location.path('/transaction/paket');
				};

			} ]);
	
	

	
	
	
	
})();
