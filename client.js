const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, 'greeter.proto')
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const greeterProto = grpc.loadPackageDefinition(packageDefinition).greeter;

const client = new greeterProto.Greeter('localhost:50051', grpc.credentials.createInsecure());

client.sayHello({ name: 'World' }, (error, response) => {
  if (!error) {
    console.log('Greeting :', response.message);
  } else {
    console.error(error)
  }
})