$(document).ready(function() {

    //forge.enableDebug();

    var vm = new ViewModel(global);

    ko.applyBindings(vm);

});