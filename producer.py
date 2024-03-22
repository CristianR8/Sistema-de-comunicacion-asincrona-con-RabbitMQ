import pika

credentials = pika.PlainCredentials('user', 'password')
connection = pika.BlockingConnection(pika.ConnectionParameters(
    'localhost', 
    5672, 
    '/', 
    credentials))
channel = connection.channel()

channel.queue_declare(queue='hello')

body = 'Hello World POO!'

channel.basic_publish(exchange='', routing_key='hello', body=body)
print(f" [x] Sent {body}")

connection.close()
