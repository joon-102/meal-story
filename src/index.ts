import cron from 'node-cron';
import { setTimeout } from 'node:timers/promises';

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
    cron.schedule(`${config.UPLOAD_TIME} * * *`, async () => {
        await setTimeout((Math.floor(Math.random() * (600 - 10 + 1)) + 10) * 1000)
        console.log('🌅 작업 실행!');
        await processAndUploadMealStory();
    });
})()
