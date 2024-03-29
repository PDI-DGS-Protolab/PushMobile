function ViewModel(global) {

    this.global = global;

    // VIEW NAMES
    this.VIEWS = global.VIEWS;

    // AVAILABLE PLATFORMS
    this.PLATFORMS = global.PLATFORMS;

    // OBSERVABLE DATA

    this.activeView = ko.observable(this.VIEWS.CHANNEL_LIST);

    this.platform = ko.observable(this.PLATFORMS.ANDROID);

    this.loggedIn = ko.observable(false);

    this.newChannelName = ko.observable();

    this.channels = ko.observableArray([
        new Channel('sport', 1, 0),
        new Channel('tv', 3, 0)
    ]);

    this.selectedChannel = ko.observable();

    this.messages = ko.observableArray([
        new Message('Text from 1', 1, "24/Dev"),
        new Message('Text from 2', 2, "31/Dec")
    ]);

    this.login = ko.observable();

    this.pwd = ko.observable();

    // VIEW TRANSITIONS

    this.showMessages = function () {
        this.activeView(this.VIEWS.MESSAGE_LIST);
    };

    this.showChannels = function () {
        this.activeView(this.VIEWS.CHANNEL_LIST);
    };

    this.showLogIn = function () {
        this.activeView(this.VIEWS.LOGIN);
    };

    this.logOut = function () {
        this.activeView(this.VIEWS.CHANNEL_LIST);
        this.loggedIn(false);

        // Async call
        this.init();
    };

    this.showCreateChannel = function () {
        this.activeView(this.VIEWS.CREATE_CHANNEL);
    };

    this.createChannel = function () {

        var newChannel = new Channel(this.newChannelName(), 3, 4);

        this.channels.push(newChannel);
        this.showChannels();
    };

    this.logIn = function () {

        this.loggedIn(true);
        this.showChannels();

        // Async call (no code allowed after this point)
        this.init();

    };

    this.test = function () {

        var db = openDatabase('mydb', '1.0', 'example database', 2 * 1024 * 1024);
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS foo (id unique, text)');
            tx.executeSql('INSERT INTO foo (id, text) VALUES (1, "foobar")');

            alert("hola");
        });

    }

    // Async
    this.init = function () {
        this.global.initNativeUI(this);
    }

    // INIT

    this.init();

}