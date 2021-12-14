<template>
  <div class="message-input">
    <textarea
      ref="messageInput"
      placeholder="message..."
      maxlength="20000"
      @keydown.enter="submitMessage"
      v-model="text"
    ></textarea>
          <button  @click="submitMessage" type="submit" class="chat-submit" id="chat-submit" style="float: right;border: unset; margin-left: 100px;"><i class="fa fa-paper-plane fa-2x"></i></button>

  </div>
</template>

<script>
export default {
  name: 'message-input',
  data() {
    return {text:""};
  },
  methods: {
    submitMessage(event) {
      if (!event.shiftKey) {
        event.preventDefault();
      } else {
        return;
      }
      // If the message body is empty, do not submit
      if (this.text === '') {
        return;
      }
      const userUUID = 1;
      // console.log(even.target.value);
      // Publish to PubNub the text and user's uuid
      this.$pnPublish({ 
        channel: 'vueChat', 
        message: {
          text: this.text,
          uuid: userUUID,
         },
        })
      // Reset the text input
      this.text = '';
      }
  },
};
</script>

<style scoped>
.message-input {
  display: table-row;
  width: 100%;
  height: 26px;
}
textarea {
  width: 98%;
  height: 30px;
  padding: 0 5px;
  margin: 0;
  box-sizing: border-box;
  line-height: 20pt;
  resize: none;
  outline: none;
  font-size: 14px;
  border: solid 1px #AAAAAA;
  border-radius: 3px;
  font-family: Helvetica;
}
</style>