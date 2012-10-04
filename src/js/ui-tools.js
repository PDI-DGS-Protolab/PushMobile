function initUI (viewModel) {

    createTopBar(viewModel);
    createTabBar(viewModel);
    registerPushCallback(viewModel);

}

function createTopBar(viewModel) {

    var topbar = forge.topbar.addButton({
        text: "Search",
        position: "left"
    }, function () {
        alert("Search pressed");
    });

};

function createTabBar(viewModel) {

    var tabbar = forge.tabbar.addButton({
        icon: "img/pizza.png",
        text: "Login",
        index: 0
    }, function (button) {

        button.setActive();
        button.onPressed.addListener(function () {
            viewModel.showMessages();
        });

    });

};

function registerPushCallback(viewModel) {

    forge.event.messagePushed.addListener(function (msg) {
        alert(msg.alert);
    });

}
