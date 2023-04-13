const { Kafka } = require("kafkajs");

async function produceMessage() {
  const kafka = new Kafka({
    clientId: "ServiceA",
    brokers: ["localhost:9092"],
  });

  const producer = kafka.producer();

  // Conectar el productor
  await producer.connect();

  // Enviar un mensaje
  await producer.send({
    topic: "test-topic",
    messages: [{ value: "Hello from ServiceA!" }],
  });

  console.log("Message sent!");

  // Desconectar el productor
  await producer.disconnect();
}

produceMessage().catch(console.error);
