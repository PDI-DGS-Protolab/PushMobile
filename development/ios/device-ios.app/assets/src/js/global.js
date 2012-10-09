// GLOBAL SINGLETON

var global = new function() {

    var self = this;

    self.VIEWS = {
        CHANNEL_LIST: 'CHANNEL_LIST',
        MESSAGE_LIST: 'MESSAGE_LIST',
        LOGIN:        'LOGIN',
        CREATE_CHAT:  'CREATE_CHAT'
    };

    self.PLATFORMS = {
        WEB:     'WEB',
        IOS:     'IOS',
        ANDROID: 'ANDROID'
    };

    // DATA

    self.viewModel = null;

    // Used for initializing async topbar and tabbat removal!
    self.next      = null;

    // FUNCTIONS

    self.initNativeUI = function (viewModel) {

        self.viewModel = viewModel;

        // Skiping native initialization if using web platform (in order to ease development and debugging)

        if (self.viewModel.platform() != self.PLATFORMS.WEB) {

            // INITIALIZATIION FOR NATIVE COMPONENTS FOR MOBILE APPS

            self.registerPushCallback();

            // ASYNC (nothing can be after this lines)

            self.initTopbar(self.viewModel.activeView());
            self.initTabbar(self.viewModel.activeView());
        }

    };

    // INIT

    self.initTopbar = function (viewName) {

        forge.logging.info("INIT TOPBAR OF : " + viewName);

        switch (viewName) {
            case global.VIEWS.CHANNEL_LIST:
                self.next = self.initChannelListTopbar;
                break;
            default:
                forge.logging.error("UNKNOWN VIEWNAME: " + viewName);
                return;
        }

        // Async
        forge.tabbar.removeButtons(self.next, self.showError);

    };

    self.initTabbar = function (viewName) {

        forge.logging.info("INIT TABBAR OF : " + viewName);

        switch (viewName) {
            case global.VIEWS.CHANNEL_LIST:
                self.next = self.initChannelListTabbar;
                break;
            default:
                forge.logging.error("UNKNOWN VIEWNAME: " + viewName);
                return;
        }

        // Async
        forge.tabbar.removeButtons(self.next, self.showError);

    };

    // TOPBAR HANDLERS

    self.initChannelListTopbar = function () {

        // Already cleaned topbar

        forge.logging.info("CREATING CHATLIST TOPBAR");

        forge.topbar.addButton({
                text: "Channels",
                position: "left"
            }, function () {
                self.viewModel.showChannels();
            }
        );

    };

    // TABBAR HANDLERS

    self.initChannelListTabbar = function () {

        // Already cleaned tabbar

        forge.logging.debug("CREATING TABBAR BUTTONS FOR CHAT_LIST!!!!");

        if (self.viewModel.loggedIn() == true) {

            forge.tabbar.addButton({
                    icon: "img/pizza.png",
                    text: "Create chatroom",
                    index: 0
                }, function (button) {

                    button.onPressed.addListener(function () {
                        button.setActive();
                        self.viewModel.showCreateChannel();
                    });
                }
            );

            forge.tabbar.addButton({
                    icon: "img/pizza.png",
                    text: "Log out",
                    index: 1
                }, function (button) {

                    button.onPressed.addListener(function () {
                        button.setActive();
                        self.viewModel.logOut();
                    });
                }
            );

        } else {

            forge.tabbar.addButton({
                icon: "img/pizza.png",
                text: "Login",
                index: 0
            }, function (button) {

                button.onPressed.addListener(function () {
                    button.setActive();
                    self.viewModel.showLogIn();
                });

            });
        }
    };

    self.registerPushCallback = function () {
        forge.event.messagePushed.addListener(function (msg) {
            alert(msg.alert);
        });
    };

    self.showError = function () {
        alert("ERROR!");
    };

};