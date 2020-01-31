<template>
    <section>
        <div class="columns is-mobile is-centered">
            <div class="column is-7">
                <div id="home" class="container">
                    <div id="messages">
                        <article v-for="(message, index) in messages" :key="index"  class="message is-fullwidth">
                            <div class="message-body">
                                <p class="has-text-weight-medium">{{ message.content }}</p>
                                <p class="is-italic is-family-code is-size-7">{{ message.dateTime }}</p>
                            </div>
                        </article>
                    </div>
                </div>
                <footer>
                    <form action="" @submit.prevent="sendMessage">
                        <div class="field is-grouped">
                            <p class="control is-expanded">
                                <input id="message-input" class="input" type="text" placeholder="Enter message" autocomplete="off" />
                            </p>
                            <p class="control">
                                <button class="button is-link">Send</button>
                            </p>
                        </div>
                    </form>
                </footer>
            </div>
        </div>
    </section>
</template>

<script>
import io from 'socket.io-client';

export default {
    name: 'home',
    props: {
        msg: String
    },
    methods: {
        sendMessage(e) {
            e.preventDefault(); // prevents page reloading
            let messageInput =  document.getElementById('message-input');
            let sendingDateTime = new Date();
            let sendingTime = sendingDateTime.toLocaleTimeString('en-GB',
                { hour: "numeric",  minute: "numeric"}
            );

            this.socket.emit('message', {
                dateTime : sendingTime,
                content: messageInput.value
            });

            // clear input field
            messageInput.value = '';

            return false;
        }
    },
    data () {
        return {
            messages: [],
            socket: io('http://localhost:8008')
        }
    },
    mounted() {
        this.socket.on('message', (message) => {
            /* eslint-disable no-console */
            /* eslint-enable no-console */
            this.messages.push(message);
        });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
    font: 13px Helvetica, Arial;
}

form {
    padding: 30px;
    position: fixed;
    bottom: 0;
    width: 60%;
}

#messages {
    height:500px;
    overflow:hidden;
    overflow-y:scroll;
    overflow: 50px;
}

</style>
