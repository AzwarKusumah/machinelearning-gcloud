import tf from '@tensorflow/tfjs-node'
import InputError from '../exceptions/InputError'

async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat();

        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;

        const label = confidenceScore >= 0.5 ? "Cancer" : "Non-cancer";

        const suggestion =
            label === "Cancer" ? "Segera periksa ke dokter!" : "Anda sehat!";

        return { label, suggestion };
    } catch (error) {
        throw new InputError(`Terjadi kesalahan input: ${error.message}`);
    }
}

export default predictClassification;