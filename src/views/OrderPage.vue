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
                  Liste des commandes
                </strong>
              </h4>
            </ion-text>
          </ion-col>
          <ion-col size="10"></ion-col>
        </ion-row>
        <div v-for="(order, orderKey) in orders" :key="orderKey">
          <ion-row>
            <ion-col>
              <ion-text color="dark">
                <h4>
                  {{order.restaurantName}}
                </h4>
              </ion-text>
            </ion-col>
            <ion-col size="7"></ion-col>
          </ion-row>
          <ion-row style="">
            <ion-col>
              <ion-text color="dark">
                  Xavier Labarbe
              </ion-text>
            </ion-col>
            <ion-col>
              <ion-button color="success" @click="acceptOrder(order.id, order.restaurantId)">
                <ion-text color="dark">
                  <h4>
                    Accepter
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
import { useRouter } from 'vue-router';
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
      orders: [],
      socket: io('http://localhost:3010')
    }
  },
  methods:{
    getOrders: async function(){
      const orders = await axios.get("http://localhost:3000/getOrdersToDeliver");
      this.orders = orders.data
      this.getOrdersRestaurantName()
    },
    getOrdersRestaurantName: function (){
      this.orders.forEach(async (order: any) => {
        const response = await axios.get("http://localhost:3000/getOrdersToDeliverName", order.restaurantId);
        order.restaurantName = response.data.name
      })
    },
    acceptOrder: async function (orderId: string, restaurantId: string) {
      this.socket.emit('orderAcceptedByDelivery', {orderId: orderId, restaurantId: restaurantId});
      this.socket.on("loadTakePage", () => {
        router.push("/order/"+orderId)
      })
    },
  },
  mounted() {
    this.getOrders();
    this.socket.on("refreshOrders", () => {
      this.getOrders();
    })
  },
  setup() {
    const router = useRouter();
    return { router };
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
