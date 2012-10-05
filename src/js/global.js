// GLOBAL SINGLETON

var global = new function() {

    this.VIEWS = {
        CHAT_LIST:    'CHAT_LIST',
        MESSAGE_LIST: 'MESSAGE_LIST',
        LOGIN:        'LOGIN',
        CREATE_CHAT:  'CREATE_CHAT'
    };

    // DATA

    this.viewModel = null;

    // FUNCTIONS

    this.initNativeUI = function (viewModel) {

        this.viewModel = viewModel;

        this.registerPushCallback();

        // ASYNC (nothing can be after this lines)

        this.initTopbar(viewModel.activeView());
        this.initTabbar(viewModel.activeView());

    };

    // INIT

    this.initTopbar = function (viewName) {

        forge.logging.info("INIT TOPBAR OF : " + viewName);

        var next = null;

        switch (viewName) {
            case global.VIEWS.CHAT_LIST:
                next = this.initChatListTopbar;
                break;
            default:
                forge.logging.error("UNKNOWN VIEWNAME: " + viewName);
                return;
        }

        forge.tabbar.removeButtons(
            $.proxy(next, this),
            $.proxy(this.showError, this)
        );

    };

    this.initTabbar = function (viewName) {

        forge.logging.info("INIT TABBAR OF : " + viewName);

        var next = null;

        switch (viewName) {
            case global.VIEWS.CHAT_LIST:
                next = this.initChatListTabbar;
                break;
            default:
                forge.logging.error("UNKNOWN VIEWNAME: " + viewName);
                return;
        }

        forge.tabbar.removeButtons(
            $.proxy(next, this),
            $.proxy(this.showError, this)
        );

    };

    // TOPBAR HANDLERS

    this.initChatListTopbar = function () {

        // Already cleaned topbar

        forge.logging.info("CREATING CHATLIST TOPBAR");

        forge.topbar.addButton({
                text: "Search",
                position: "left"
            }, function () {
                alert("CHAT_LIST")
            }
        );

    };

    // TABBAR HANDLERS

    this.initChatListTabbar = function () {

        // Already cleaned tabbar

        var self = this;

        forge.logging.debug("CREATING TABBAR BUTTONS FOR CHAT_LIST!!!!");

        if (this.viewModel.loggedIn() == true) {

            forge.tabbar.addButton({
                    icon: "img/pizza.png",
                    text: "Create chatroom",
                    index: 0
                }, function (button) {

                    button.onPressed.addListener(function () {
                        button.setActive();
                        self.viewModel.showCreateChat();
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
                        self.viewModel.showLogOut();
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

    this.registerPushCallback = function () {
        forge.event.messagePushed.addListener(function (msg) {
            alert(msg.alert);
        });
    };

    this.showError = function () {
        alert("ERROR!");
    };

};