<template>
  <div>
    <div class="overlay">
      <div class="popup">
        <div class="metamask-popup">
          <img src="../assets/metamask-logo.png" alt="MetaMask Logo" class="metamask-logo">
        </div>
        <h2 data-title="MetaMask Required">MetaMask Required</h2>
        <p>You need to register a MetaMask wallet to access this feature.</p>
        <v-btn
@click="redirectToMetaMask"
        :rounded="0"
        color="primary"
        >
        Install MetaMask
        </v-btn>
        <v-btn
@click="closePopup"
        :rounded="0"
        color="primary"
        >
        Close
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    redirectToMetaMask() {
      window.open('https://metamask.io/download.html', '_blank');
    },closePopup() {
      document.querySelector(".overlay").style.display="none"
    }
  }
};
</script>

<style scoped>

.metamask-popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
}

.metamask-logo {
  width: 50px;
  height: 50px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: none;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup {
  background-color: black;
  border: 1px solid gold;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 90%;
}

.popup h2 {
  margin-bottom: 20px;
  font-size: 24px;
}

.popup p {
  margin-bottom: 20px;
  font-size: 18px;
  color: #f8eb6b;
}

.popup button {
    background: transparent !important;
    color: #F8EB6B !important;
    border: 1px solid;
    margin-right: 10px;
}

.popup button:last-child {
    border: none;
}

button:hover {
    background: #453100 !important;
}
</style>