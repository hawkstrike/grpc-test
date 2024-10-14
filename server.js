const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, 'greeter.proto')
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const greeterProto = grpc.loadPackageDefinition(packageDefinition).greeter;

const sayHello = (call, callback) => {
  callback(null, { message: `Hello ${call.request.name}` });
}

const main = () => {
  const server = new grpc.Server();
  const port = '50051';

  server.addService(greeterProto.Greeter.service, { sayHello: sayHello });
  server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`Server running at http://localhost:${port}`);

    // server.start();
  })

}

main()