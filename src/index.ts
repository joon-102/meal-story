import cron from 'node-cron';

import { config } from './config';
import { fetchTodayMeal } from './service/meal';
import { generateImage } from './service/image';
import { uploadStory } from './service/upload';

async function processAndUploadMealStory() {
    const todayMeal = await fetchTodayMeal();
    const imageBuffer = await generateImage(todayMeal);
    await uploadStory(imageBuffer);
}

(async () => {
    cron.schedule(`${config.UPLOAD_TIME} * * *`, () => {
        console.log('🌅 작업 실행!');
        processAndUploadMealStory();
    });
})()
