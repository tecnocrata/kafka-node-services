const { Kafka } = require("kafkajs");

async function consumeMessage() {
  const kafka = new Kafka({
    clientId: "ServiceB",
    brokers: ["localhost:9092"],
  });

  const consumer = kafka.consumer({ groupId: "test-group" });

  // Conectar el consumidor
  await consumer.connect();

  // Suscribirse al topic
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

  // Procesar mensajes
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message: ${message.value.toString()}`);
    },
  });
}

consumeMessage().catch(console.error);
