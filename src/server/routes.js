const h = require("../server/handler");

const routes = [
    {
        path: '/predict',
        method: 'POST',
        handler: h.postPredictHandler,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true,
            },
        },
    },
    {
        path: '/predict/histories',
        method: 'GET',
        handler: h.getHistoryHandler,
    },
    {
        path: '/',
        method: 'GET',
        handler: h.defaultDarlin,
    },
];

module.exports = routes;