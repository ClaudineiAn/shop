<template>
  <div>
    <div class="overlay">
      <div class="popup">
        <h2>MetaMask Required</h2>
        <p>You need to register a MetaMask wallet to access this feature.</p>
        <button @click="redirectToMetaMask">Install MetaMask</button>
        <button @click="closePopup">Close</button>
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
/* Styles same as before */
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
  background-color: #fff;
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
  color: #333;
}

.popup p {
  margin-bottom: 20px;
  font-size: 18px;
  color: #666;
}

.popup button {
  padding: 10px 20px;
  font-size: 16px;
  margin: 5px;
  color: #fff;
  background-color: #f6851b;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.popup button:hover {
  background-color: #e2761b;
}

.popup button:nth-child(3) {
  background-color: #ccc;
  color: #333;
}

.popup button:nth-child(3):hover {
  background-color: #bbb;
}
</style>