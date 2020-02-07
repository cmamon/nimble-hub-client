<template>
  <section>
    <div class="columns is-mobile is-centered">
      <div class="column is-7">
        <div id="home" class="container content">
          <div id="messages">
            <article v-for="(message, index) in messages" :key="index"  class="message is-fullwidth">
              <div class="message-body">
                <p class="has-text-weight-medium">{{ message.content }}</p>
                <p class="is-italic is-family-code is-size-7">{{ message.dateTime }}</p>
              </div>
            </article>
          </div>
        </div>
        <br>
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
      let sendingTime = sendingDateTime.toLocaleTimeString(
        'en-GB',
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
    let messages = document.getElementById('messages');

    this.socket.on('message', (message) => {
      // let messageHeight = document.getElementsByClassName('message')[0].clientHeight;
      let shouldScroll = (messages.scrollTop + messages.clientHeight) > messages.scrollHeight;
      this.messages.push(message);
      console.log(messages.scrollTop);
      console.log(messages.clientHeight);
      console.log(messages.scrollHeight);

      if (!shouldScroll) {
      // messages.scrollTop(messages.prop('scrollHeight'));
        let offset = 4 * document.getElementsByClassName('message')[0].clientHeight;
        // offset = 2 * parseInt(offset);

        console.log('offset :', offset);
        messages.scrollTop = messages.scrollHeight + offset;
      }
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  font: 13px Helvetica, Arial;
}

#messages {
  height: 400px;
  /* overflow: hidden; */
  overflow-y: auto;
}

.content {
  flex: 1 0 auto;
}

footer {
  flex-shrink: 0;
}

</style>
