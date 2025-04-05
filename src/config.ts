import dotenv from 'dotenv';
dotenv.config()

function getEnv(key: string, required = true): string {
    const value = process.env[key];
    if (required && (value === undefined || value === '')) {
        throw new Error(`환경변수 "${key}"가 설정되지 않았습니다.`);
    }
    return value!;
}

export const config = {
    ATPT_OFCDC_SC_CODE: getEnv('ATPT_OFCDC_SC_CODE'),
    SD_SCHUL_CODE: getEnv('SD_SCHUL_CODE'),
    IG_USERNAME: getEnv('IG_USERNAME'),
    IG_PASSWORD: getEnv('IG_PASSWORD'),
    UPLOAD_TIME: getEnv('UPLOAD_TIME'),
};
