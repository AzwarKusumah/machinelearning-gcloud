import predictClassification from '../services/inferenceService.js';
import crypto from 'crypto';
import { storeData, getData } from '../services/storeData.js';

async function postPredictHandler(request, h) {
    const { image } = request.payload;
    const { model } = request.server.app;

    const { label, suggestion, confidenceScore } = await predictClassification(
        model,
        image
    );
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
        id: id,
        result: label,
        suggestion: suggestion,
        createdAt: createdAt,
    };

    await storeData(id, data);

    const response = h.response({
        status: "success",
        message:
            confidenceScore > 50
                ? "Model is predicted successfully"
                : "Model is predicted successfully but under threshold. Please use the correct picture",
        data,
    });
    response.code(201);
    return response;
}

async function getHistoryHandler(request, h) {
    const response = h.response({
        status: "success",
        data: await getData(),
    });
    response.code(200);
    return response;
}

async function defaultDarling(request, h) {
    return "API IS RUNNING DARLING";
}

export default { postPredictHandler, getHistoryHandler, helloWorld };