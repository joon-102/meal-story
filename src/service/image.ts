
import { createCanvas, loadImage, registerFont } from 'canvas';
import path from 'path';

interface MealData {
  lunch: string[];
  dinner: string[];
  date: string;
}

registerFont(path.join(__dirname, '../../assets/Pretendard-Bold.ttf'), {
  family: 'Pretendard',
});

export async function generateImage(meal: MealData): Promise<Buffer> {
  console.info("🔠 글꼴을 등록하고 기본 이미지를 로딩하는 중...")

  const image = await loadImage(path.join(__dirname, '../../assets/Basic.png'));

  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');

  console.log('🖼️ 캔버스에 기본 이미지를 그리는 중...');
  ctx.drawImage(image, 0, 0);

  const lunchMenu = meal.lunch.length > 0 ? meal.lunch : ['급식 정보가 없습니다.'];
  const dinnerMenu = meal.dinner.length > 0 ? meal.dinner : ['급식 정보가 없습니다.'];

  ctx.fillStyle = '#000000';
  ctx.font = '45px Pretendard';
  ctx.fillText(`${meal.date.slice(0, 4)}.${meal.date.slice(4, 6)}.${meal.date.slice(6, 8)}`, 418, 133);

  ctx.font = '44px Pretendard';
  lunchMenu.forEach((dish, index) => {
    ctx.fillText(dish, 390, 580 + index * 50);
  });

  dinnerMenu.forEach((dish, index) => {
    ctx.fillText(dish, 135, 1315 + index * 50);
  });

  console.log('✅ 이미지 생성 완료.');
  return canvas.toBuffer('image/png');
}