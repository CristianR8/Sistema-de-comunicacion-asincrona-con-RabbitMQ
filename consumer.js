const amqp = require('amqplib');

async function connect() {
    const connection = await amqp.connect('amqp://user:password@localhost:5672');
    const channel = await connection.createChannel();
    return { connection, channel };
}

async function receiveMessage(queue, callback) {
    const { channel } = await connect();
    await channel.assertQueue(queue);
    channel.consume(queue, (message) => {
        if (message !== null) {
            callback(message.content.toString());
            channel.ack(message);
        }
    });
}

// Ejemplo de uso:
const queue = 'mi_cola';

receiveMessage(queue, (message) => {
    console.log(`Mensaje recibido: ${message}`);
});
