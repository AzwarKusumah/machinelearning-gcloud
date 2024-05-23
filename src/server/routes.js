import { postPredictHandler, getHistoryHandler, defaultDarling } from '../server/handler'

const routes = [
    {
        path: '/predict',
        method: 'POST',
        handler: postPredictHandler,
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
        handler: getHistoryHandler,
    },
    {
        path: '/',
        method: 'GET',
        handler: defaultDarling,
    },
];

export default routes;