const amqp = require('amqplib');

async function connect() {
    const connection = await amqp.connect('amqp://user:password@localhost:5672');
    const channel = await connection.createChannel();
    return { connection, channel };
}

async function sendMessage(queue, message) {
    const { channel } = await connect();
    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(message));
    console.log(`Mensaje enviado: ${message}`);
}

// Ejemplo de uso:
const queue = 'mi_cola';
const message = 'Hola desde el productor';

sendMessage(queue, message);
