function ViewModel(global) {

    // VIEW NAMES
    this.VIEWS = global.VIEWS;

    // AVAILABLE PLATFORMS
    this.PLATFORMS = global.PLATFORMS;

    // OBSERVABLE DATA

    this.activeView = ko.observable(this.VIEWS.CHANNEL_LIST);

    this.platform = ko.observable(this.PLATFORMS.ANDROID);

    this.loggedIn = ko.observable(true);

    this.newChannelName = ko.observable();

    this.channels = ko.observableArray([
        new Channel('sport', 1, 4),
        new Channel('tv', 3, 6)
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

    this.showLogOut = function () {
        this.activeView(this.VIEWS.CHANNEL_LIST);
    };

    this.showCreateChannel = function () {
        this.activeView(this.VIEWS.CREATE_CHANNEL);
    };

    this.createChannel = function () {

        var newChannel = new Channel(this.newChannelName(), 3, 4);

        this.channels.push(newChannel);
        this.showChannels();
    };

    // INIT

    global.initNativeUI(this);

}