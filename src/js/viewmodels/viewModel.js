function ViewModel(global, storage) {

    this.global  = global;
    this.storage = storage;

    // VIEW NAMES
    this.VIEWS = global.VIEWS;

    // AVAILABLE PLATFORMS
    this.PLATFORMS = global.PLATFORMS;

    ///////////////////////////////////////////////////
    // OBSERVABLE DATA
    ///////////////////////////////////////////////////

    this.activeView = ko.observable(this.VIEWS.CHANNEL_LIST);

    this.platform = ko.observable(this.PLATFORMS.WEB);

    this.loggedIn = ko.observable(true);

    this.newChannelName = ko.observable();

    this.newMessage = ko.observable();

    this.channels = ko.observableArray([]);

    this.selectedChannel = ko.observable();

    this.messages = ko.observableArray([]);

    this.login = ko.observable();

    this.pwd = ko.observable();

    ///////////////////////////////////////////////////
    // VIEW TRANSITIONS
    ///////////////////////////////////////////////////

    this.showMessages = function (channel) {
        this.loadMessages(channel);

        this.activeView(this.VIEWS.MESSAGE_LIST);
    };

    this.showChannels = function () {
        this.activeView(this.VIEWS.CHANNEL_LIST);
    };

    this.showLogIn = function () {
        this.activeView(this.VIEWS.LOGIN);
    };

    this.showCreateChannel = function () {
        this.activeView(this.VIEWS.CREATE_CHANNEL);
    };

    ///////////////////////////////////////////////////
    // OPERATIONS
    ///////////////////////////////////////////////////

    this.logOut = function () {
        this.activeView(this.VIEWS.CHANNEL_LIST);
        this.loggedIn(false);

        // Async call
        this.initUI();
    };

    this.createChannel = function () {

        var channel = this.storage.createChannel(this.newChannelName());

        this.channels.push(channel);

        this.showChannels();
    };

    this.logIn = function () {

        this.loggedIn(true);
        this.showChannels();

        // Async call (no code allowed after this point)
        this.initUI();

    };

    this.storeChannel = function (channel) {
        var channels = this.storage.getChannels();

        channels.push(channel);

        this.storage.storeChannels(channels);

        this.channels.push(channel);
    }

    this.postMessage = function () {

        var channel = this.selectedChannel();

        var message = this.storage.createMessage(channel, this.newMessage());

        channel.messages.push(message);

        this.messages.push(message);
    }

    ///////////////////////////////////////////////////
    // INIT
    ///////////////////////////////////////////////////

    this.loadChannels = function () {

        var channels = this.storage.getChannels();

        for (var i=0; i<channels.length; i++) {
            var channelData = channels[i];

            this.channels.push(new Channel(channelData));
        }
    }

    this.loadMessages = function (channel) {

        // Cleaning messages from older channel!
        this.messages.removeAll();

        var messages = channel.messages;

        for (var i=0; i<messages.length; i++) {
            var messageData = messages[i];

            this.messages.push(new Message(messageData));
        }
    }

    // Async
    this.initUI = function () {
        this.global.initNativeUI(this);
    }

    this.loadChannels();
    this.initUI();

}