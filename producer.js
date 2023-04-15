const { Kafka, logLevel } = require("kafkajs");

console.log("Starting producer");

async function produceMessage() {
  const kafka = new Kafka({
    clientId: "ServiceA",
    brokers: ["kafka:9092"],
    retry: {
      retries: 200,
    },
    logLevel: logLevel.DEBUG,
  });

  const producer = kafka.producer();
  console.log("Connecting to Kafka from producer");
  // Conectar el productor
  await producer.connect();

  let messageCount = 0;

  // Enviar mensajes de forma infinita cada 10 segundos
  setInterval(async () => {
    messageCount++;

    try {
      await producer.send({
        topic: "test-topic",
        acks: 1,
        messages: [
          { value: `Hello from ServiceA! Message count: ${messageCount}` },
        ],
      });

      console.log(`Message ${messageCount} sent!`);
    } catch (error) {
      console.error(`Failed to send message ${messageCount}: ${error.message}`);
    }
  }, 10000);
}

produceMessage().catch(console.error);
// (async () => {
//   await Promise.race([
//     produceMessage(),
//     new Promise((resolve) => process.on("SIGTERM", resolve)),
//   ]);
//   process.exit(0);
// })().catch(console.error);
setInterval(() => {
  console.log("La aplicación sigue en ejecución");
}, 1000 * 60); // Cada minuto
