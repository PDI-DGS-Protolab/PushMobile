function ViewModel(global) {

    // VIEW NAMES

    this.VIEWS = global.VIEWS;

    // OBSERVABLE DATA

    this.activeView = ko.observable(this.VIEWS.CHAT_LIST);

    this.loggedIn = ko.observable(true);

    this.chats = ko.observableArray([
        new Channel('sport', 1, 4),
        new Channel('tv', 3, 6)
    ]);

    this.messages = ko.observableArray([
        new Message('Text from 1', 1, "24/Dev"),
        new Message('Text from 2', 2, "31/Dec")
    ]);

    this.login = ko.observable();

    this.pwd = ko.observable();

    // VIEW TRANSITIONS

    this.showMessages = function () {
        alert("MESSAGES");
        this.activeView(this.VIEWS.MESSAGE_LIST);
    };

    this.showChats = function () {
        alert("CHAT");
        this.activeView(this.VIEWS.CHAT_LIST);
    };

    this.showLogIn = function () {
        alert("LOGIN");
        this.activeView(this.VIEWS.LOGIN);
    };

    this.showLogOut = function () {
        alert("MESSAGES LOGOUT");
        this.activeView(this.VIEWS.CHAT_LIST);
    };

    this.showCreateChat = function () {
        alert("CREATE CHAT");
        this.activeView(this.VIEWS.CREATE_CHAT);
    };

    // INIT

    global.initNativeUI(this);

}