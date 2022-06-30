<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>VEAT Deliver App</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <div id="container">
        <ion-row style="padding-left: 280px">
          <ion-col>
            <ion-text color="dark">
              <h4>
                <strong>
                  Xavier Labarbe
                </strong>
              </h4>
            </ion-text>
          </ion-col>
          <ion-col size="10"></ion-col>
        </ion-row>
        <div>
          <ion-row>
            <ion-col>
              <ion-text color="dark">

              </ion-text>
            </ion-col>
            <ion-col size="7"></ion-col>
          </ion-row>
          <ion-row style="">
            <ion-col>
              <ion-text color="dark">
                <h4>
                  6 Sente des Morutiers :
                </h4>
              </ion-text>
            </ion-col>
            <ion-col>
              <ion-button color="success" @click="giveOrder(order.id)">
                <ion-text color="dark">
                  <h4>
                    Donner
                  </h4>
                </ion-text>
              </ion-button>
            </ion-col>
            <ion-col size="7"></ion-col>
          </ion-row>
          <ion-row>
          </ion-row>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonText, IonButton} from '@ionic/vue';
import { defineComponent } from 'vue';
import axios from 'axios';
import { io } from "socket.io-client";
import { useRouter, useRoute } from 'vue-router';
import router from "@/router";

export default defineComponent({
  name: 'OrderPage',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonRow, IonCol, IonText,
    IonButton,
  },
  data(){
    return{
      order: null,
      socket: io('http://localhost:3010')
    }
  },
  props:["id"],
  methods:{
    getOrder: async function(){
      console.log(this.id)
      const order = await axios.get("http://localhost:3000/getOrderToTake", this.id);
      this.order = order.data
    },
    giveOrder: async function (orderId: string) {
      this.socket.emit('orderGivenByDelivery', {orderId: orderId});
      this.socket.on("loadOrderPage", () => {
        router.push("/orders")
      })
    },
  },
  mounted() {
    this.getOrder();
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    return { router, route };
  },
});
</script>

<style scoped>
#container {
  text-align: center;

  position: relative;
  left: 30%;
  right: 0;
  top: 35%;
  transform: translateY(-50%);
}
</style>
