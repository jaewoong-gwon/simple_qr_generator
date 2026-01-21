import { supabase } from '../supabase/client';
import type { Database } from '../supabase/types';

type QRMetadata = Database['public']['Tables']['qr_metadata']['Row'];
type QRMetadataInsert = Database['public']['Tables']['qr_metadata']['Insert'];

/**
 * QR 메타데이터 CRUD 접근 레이어 (스텁)
 *
 * 주의: URL 정규화 및 qr_key 생성 로직은 포함하지 않음
 */
export const qrMetadataRepository = {
  /**
   * normalized_url로 기존 메타데이터 조회
   */
  async findByNormalizedUrl(normalizedUrl: string): Promise<QRMetadata | null> {
    const { data, error } = await supabase
      .from('qr_metadata')
      .select('*')
      .eq('normalized_url', normalizedUrl)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // No rows found
      throw error;
    }

    return data;
  },

  /**
   * qr_key로 메타데이터 조회
   */
  async findByQrKey(qrKey: string): Promise<QRMetadata | null> {
    const { data, error } = await supabase
      .from('qr_metadata')
      .select('*')
      .eq('qr_key', qrKey)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data;
  },

  /**
   * 새 메타데이터 생성
   */
  async create(payload: QRMetadataInsert): Promise<QRMetadata> {
    const { data, error } = await supabase
      .from('qr_metadata')
      .insert(payload as never)
      .select()
      .single();

    if (error) throw error;

    return data;
  },

  /**
   * last_accessed_at 업데이트
   */
  async updateLastAccessed(qrKey: string): Promise<void> {
    const { error } = await supabase
      .from('qr_metadata')
      .update({ last_accessed_at: new Date().toISOString() } as never)
      .eq('qr_key', qrKey);

    if (error) throw error;
  },
};
