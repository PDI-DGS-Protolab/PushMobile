function Channel(json) {

    this.name     = json.name;
    this.id       = json.id;
    this.num      = json.num;
    this.messages = json.messages;

    this.showMessages = function (viewModel) {

        viewModel.selectedChannel(this);
        viewModel.showMessages(this);
    }

}

function Message(json) {

    this.text = json.text
    this.id = json.id;
    this.time = json.time;

}