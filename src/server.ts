import HelloWorldServer from './server/helloWorldServer'
import StoreFrontServer from './server/storefrontServer'

// usage:
// http://localhost:5000/hello_world
const HelloWorldApi = new HelloWorldServer(5000);
HelloWorldApi.startListening();

// usage:
// http://localhost:5000/store_front
const StoreFrontApi = new StoreFrontServer(5000);
StoreFrontApi.startListening();