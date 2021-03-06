/* global angular, console, require */

(function () {
	'use strict';

	class ReceiveController {

		constructor($location, Horizon, Modal, Wallet) {

			this.$location = $location;
			this.Horizon = Horizon;
			this.Modal = Modal;
			this.Wallet = Wallet;

			this.accountId		= Wallet.current.id;
			this.hasFederation	= (Wallet.current.federation !== undefined);
			this.minHeight		= this.getMinHeight();
			this.qrtext			= '';

			if (this.hasFederation) {
				this.federation = `${this.Wallet.current.federation}*getstargazer.com`;
			}

			this.showAddress();
		}

		getMinHeight() {
			const headerHeight = 2 * 40;
			const numButtons = 1 + (this.Wallet.current.federation === undefined);
			const buttonGroupHeight = 48 * numButtons + 8 * (numButtons - 1) + 24;
			return `${window.innerHeight - (buttonGroupHeight + headerHeight)}px`;
		}

		request() {
			this.Modal.show('app/account/modals/payment-request.html');
		}

		setFederation() {
			this.$location.path('/account-settings/federation');
		}

		showAddress() {
			const account = {
				id: this.Wallet.current.id
			};

			if (this.Wallet.current.network !== this.Horizon.public) {
				account.network = this.Wallet.current.network;
			}

			this.qrtext = JSON.stringify({
				stellar: {
					account: account
				}
			});
		}
	}

	angular.module('app')
	.component('receive', {
		controller: ReceiveController,
		controllerAs: 'vm',
		require: {
			index: '^index'
		},
		templateUrl: 'app/account/components/receive.html'
	});
}());
