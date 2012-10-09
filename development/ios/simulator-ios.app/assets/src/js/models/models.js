function Channel(name, id, num) {

    this.name = name;
    this.id = id;
    this.num = num;

    this.showMessages = function (viewModel) {
        viewModel.selectedChannel(this);
        viewModel.showMessages();
    }

}

function Message(text, id, time) {

    this.text = text;
    this.id = id;
    this.time = time;

}