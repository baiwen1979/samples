angular.module('app', ['ionic'])
.controller('Page1Ctrl', function($scope, $state, formData) {
	$scope.user = {};
	$scope.submitForm = function(user) {
		if (user.firstName && user.lastName) {
		    console.log('Submitting form', user);
		    formData.updateForm(user);
		    console.log('Retrieving form from service', formData.getForm());
		}else {
			alert('Please fill out the field before submitting!');
		}
	};
})

.controller('Page2Ctrl', function($scope, formData) {
	$scope.user = formData.getForm();
})

.service('formData', function() {
	return {
		form: {},
		getForm: function() {
			return this.form;
		},
		updateForm: function(form) {
			this.form = form;
		}
	};
});