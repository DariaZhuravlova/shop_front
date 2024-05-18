import { defineStore } from "pinia";

export const useTestStore = defineStore("test", {
  state: () => ({
    message: "Hello",
  }),
  actions: {
    setMessage(newMessage: string) {
      this.message = newMessage;
    },
  },
  getters: {
    upper(): string {
      return this.message.toUpperCase();
    },
  }
})