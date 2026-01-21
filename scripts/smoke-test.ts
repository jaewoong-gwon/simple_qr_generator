/**
 * Supabase 연결 및 repository 스모크 테스트
 *
 * 실행 방법:
 *   npm run smoke-test
 *
 * 전제 조건:
 *
 *   - qr_metadata 테이블 마이그레이션 완료
 */

import { qrMetadataRepository } from '../lib/qr-metadata/repository';

const SMOKE_MARKER = '__smoke__';

async function runSmokeTest() {
  console.log('🧪 Starting smoke test...\n');

  const testData = {
    original_url: `https://drive.google.com/${SMOKE_MARKER}/test`,
    normalized_url: `https://drive.google.com/${SMOKE_MARKER}/normalized`,
    qr_key: `${SMOKE_MARKER}_${Date.now()}`,
  };

  let insertedId: number | null = null;

  try {
    // 1. INSERT
    console.log('📝 Step 1: Inserting test data...');
    const inserted = await qrMetadataRepository.create(testData);
    insertedId = inserted.id;
    console.log(`✅ Inserted row with id: ${inserted.id}`);
    console.log(`   - qr_key: ${inserted.qr_key}`);
    console.log(`   - created_at: ${inserted.created_at}\n`);

    // 2. SELECT by qr_key
    console.log('🔍 Step 2: Selecting by qr_key...');
    const selected = await qrMetadataRepository.findByQrKey(testData.qr_key);

    if (!selected) {
      throw new Error('Failed to retrieve inserted row');
    }

    console.log(`✅ Retrieved row with id: ${selected.id}`);
    console.log(`   - original_url: ${selected.original_url}`);
    console.log(`   - normalized_url: ${selected.normalized_url}`);
    console.log(`   - qr_key: ${selected.qr_key}\n`);

    // 3. Verify data integrity
    if (
      selected.original_url !== testData.original_url ||
      selected.normalized_url !== testData.normalized_url ||
      selected.qr_key !== testData.qr_key
    ) {
      throw new Error('Data mismatch between inserted and selected row');
    }

    console.log('✅ Data integrity verified\n');

    // 4. CLEANUP
    console.log('🧹 Step 3: Cleaning up test data...');
    await cleanupSmokeTestRows();
    console.log('✅ Cleanup completed\n');

    console.log('🎉 Smoke test passed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Smoke test failed:', error);

    // Attempt cleanup on failure
    if (insertedId) {
      try {
        await cleanupSmokeTestRows();
        console.log('🧹 Cleanup completed after failure');
      } catch (cleanupError) {
        console.error('⚠️  Cleanup failed:', cleanupError);
      }
    }

    process.exit(1);
  }
}

async function cleanupSmokeTestRows() {
  const { supabase } = await import('../lib/supabase/client');

  const { error } = await supabase
    .from('qr_metadata')
    .delete()
    .like('original_url', `%${SMOKE_MARKER}%`);

  if (error) {
    throw new Error(`Cleanup failed: ${error.message}`);
  }
}

runSmokeTest();
