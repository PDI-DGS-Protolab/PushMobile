function Storage() {

    this.CHANNELS_KEY = "channels";

    ////////////////////////////////
    // CHANNELS
    ///////////////////////////////

    this.getChannels = function () {
        var channels = JSON.parse(localStorage.getItem(this.CHANNELS_KEY));

        if (! channels)
            return [];

        return channels;
    }

    this.storeChannels = function (channels) {
        localStorage.setItem(this.CHANNELS_KEY, JSON.stringify(channels));
    }

    this.createChannel = function (channelName) {

        var json = {
            name: channelName,
            id: -1,
            num: 0,
            messages: []
        };

        var channel = new Channel(json);

        var channels = this.getChannels();

        channels.push(channel);

        this.storeChannels(channels);

        return channel;
    };

    ////////////////////////////////
    // MESSAGES
    ///////////////////////////////

    this.createMessage = function (channel, text) {

        var json = {
            text: text,
            id: -1,
            time: new Date().getTime()
        };

        var message = new Message(json);

        this.storeMessage(channel, message);

        return message;
    }

    this.storeMessage = function (channel, message) {
        var channels = this.getChannels();

        for (var i=0; i<channels.length; i++) {

            if (channels[i].name == channel.name) {
                channels[i].messages.push(message);
                break;
            }
        }

        this.storeChannels(channels);
    }

}
