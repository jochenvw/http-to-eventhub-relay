module.exports = async function (context, req) {
    const { EventHubProducerClient } = require("@azure/event-hubs");

    const eventHubbConnectionString = process.env.EVENTHUB_CONNECTION_STRING;
    const eventHub = process.env.EVENTHUB;

    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.name || (req.body && req.body.name)) {
        const producerClient = new EventHubProducerClient(eventHubbConnectionString, eventHub);
        const eventDataBatch = await producerClient.createBatch();
        let wasAdded = eventDataBatch.tryAdd({ body: req.body });
        if (!wasAdded) {
            throw "Error trying to add event to batch";
        }

        await producerClient.sendBatch(eventDataBatch);
        await producerClient.close();

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Message posted to queue !"
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a valid body in the request"
        };
    }
};