module.exports = async function (context, req) {
    context.log('Processing incoming LORA message ...');

    if(req.body.device && req.body.device.deviceId) {
        context.bindings.outputEventHubMessage = req.body;
        context.bindings.res = {
            status: 200,
            body: "LORA message processed successfully!"
        };
        context.log('LORA message processed successfully!');
    } else {
        context.bindings.res = {
            status: 400,
            body: "Please provide device property inside message body with nested deviceId property"
        };
        context.log('LORA message processing failed ' + req.body);
    }
    context.done();
};