const { Kafka, logLevel } = require("kafkajs");

console.log("Starting consumer");

async function consumeMessage() {
  const kafka = new Kafka({
    clientId: "ServiceB",
    groupId: "ServiceB",
    brokers: ["kafka:9092"],
    retry: {
      retries: 200,
    },
    logLevel: logLevel.DEBUG,
  });

  const consumer = kafka.consumer({ groupId: "test-group" });
  console.log("Connecting to Kafka from consumer");
  // Conectar el consumidor
  await consumer.connect();

  // Suscribirse al topic
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

  let receivedMessageCount = 0;

  // Procesar mensajes
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      receivedMessageCount++;
      console.log(
        `Received message ${receivedMessageCount}: ${message.value.toString()}`
      );
    },
  });
}

consumeMessage().catch(console.error);
// (async () => {
//   await Promise.race([
//     consumeMessage(),
//     new Promise((resolve) => process.on("SIGTERM", resolve)),
//   ]);
//   process.exit(0);
// })().catch(console.error);
setInterval(() => {
  console.log("La aplicación sigue en ejecución");
}, 1000 * 60); // Cada minuto
