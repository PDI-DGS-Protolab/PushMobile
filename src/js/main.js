$(document).ready(function() {

    //forge.enableDebug();

    var storage = new Storage();

    var vm = new ViewModel(global, storage);

    ko.applyBindings(vm);

});