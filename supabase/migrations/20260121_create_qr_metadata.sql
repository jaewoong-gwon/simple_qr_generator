-- QR 메타데이터 테이블
CREATE TABLE qr_metadata (
  id BIGSERIAL PRIMARY KEY,
  original_url TEXT NOT NULL,
  normalized_url TEXT NOT NULL,
  qr_key VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_accessed_at TIMESTAMPTZ
);

-- normalized_url 기준 유니크 제약 (동일한 정규화 URL은 하나의 QR만 생성)
CREATE UNIQUE INDEX idx_qr_metadata_normalized_url ON qr_metadata(normalized_url);

-- qr_key 기준 유니크 제약 및 인덱스 (빠른 조회)
CREATE UNIQUE INDEX idx_qr_metadata_qr_key ON qr_metadata(qr_key);

-- last_accessed_at 인덱스 (추후 통계/정리 작업에 활용 가능)
CREATE INDEX idx_qr_metadata_last_accessed_at ON qr_metadata(last_accessed_at);

COMMENT ON TABLE qr_metadata IS 'QR 코드 생성을 위한 최소 메타데이터 저장';
COMMENT ON COLUMN qr_metadata.original_url IS '관리자가 입력한 원본 Google Drive 이미지 공유 링크';
COMMENT ON COLUMN qr_metadata.normalized_url IS 'QR 생성 기준이 되는 정규화된 URL (중복 방지 키)';
COMMENT ON COLUMN qr_metadata.qr_key IS 'QR 코드에 인코딩되는 고유 키 (/qr/{key} 경로에 사용)';
COMMENT ON COLUMN qr_metadata.created_at IS '최초 생성 시각';
COMMENT ON COLUMN qr_metadata.last_accessed_at IS '최근 QR 접근 시각 (NULL 가능)';
