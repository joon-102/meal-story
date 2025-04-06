import { config } from '../config';
import { IgApiClient } from 'instagram-private-api';
import fs from 'fs/promises';
import path from 'path';

const ig = new IgApiClient();
const stateFile = path.join(__dirname, '../../ig-session.json');

async function loadSession(): Promise<void> {
    ig.state.generateDevice(config.IG_USERNAME);

    try {
        const sessionData = await fs.readFile(stateFile, 'utf-8');
        await ig.state.deserialize(JSON.parse(sessionData));
        console.log('✅ 인스타그램 세션 불러오기 성공');
    } catch {
        console.log('🔐 저장된 세션 없음. 로그인 시도 중...');
        await ig.account.login(config.IG_USERNAME, config.IG_PASSWORD);
        const serialized = await ig.state.serialize();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (serialized as any).constants;
        await fs.writeFile(stateFile, JSON.stringify(serialized));
        console.log('✅ 세션 저장 완료');
    }
}

export async function uploadStory(imageBuffer: Buffer): Promise<void> {
    try {
        console.log('🚀 인스타그램 스토리 업로드 시작');
        await loadSession();

        const result = await ig.publish.story({
            file: imageBuffer,
        });

        console.log('🎉 스토리 업로드 완료! 📷 코드:', result.media.code);
        return result.media.code;
    } catch (error) {
        console.error('❌ 스토리 업로드 실패:', error);
    }
}
