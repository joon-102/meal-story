import { config } from '../config';
import axios from 'axios';
import format from 'date-fns';

interface MealData {
    lunch: string[];
    dinner: string[];
    date: string;
}

export async function fetchTodayMeal(): Promise<MealData> {
    const today = format.format(new Date(), 'yyyyMMdd');

    console.log(`📅 ${today} 데이터 불러오는중...`);

    try {
        const response = await axios.get(`https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&ATPT_OFCDC_SC_CODE=${config.ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${config.SD_SCHUL_CODE}&MLSV_YMD=${today}`);
        if (response.data.mealServiceDietInfo == undefined) return { lunch: [], dinner: [], date: today };

        // 중식
        const lunchData = response.data.mealServiceDietInfo[1].row[0]?.DDISH_NM || "";
        const lunch = lunchData.split(/<br\s*\/?>/i).flat().map((dish: string) => dish.replace(/\*/g, '').replace('(', '').replace(')', '').trim()).filter(Boolean);
        console.log(`🍱 중식 아이템: ${lunch.length}`);

        // 석식
        const dinnerData = response.data.mealServiceDietInfo[1].row[1]?.DDISH_NM || "";
        const dinner = dinnerData.split(/<br\s*\/?>/i).flat().map((dish: string) => dish.replace(/\*/g, '').replace('(', '').replace(')', '').trim()).filter(Boolean);
        console.log(`🍽️ 석식 아이템: ${dinner.length}`);

        return { lunch: lunch, dinner: dinner, date: today };
    } catch (error) {
        console.error('Error fetching meal data:', error);
        return { lunch: [], dinner: [], date: today };
    }
}