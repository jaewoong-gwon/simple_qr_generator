export default function AdminQRPage() {
  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>관리자 QR 생성</h1>
      <p style={{ marginTop: '1rem', color: '#666' }}>
        Google Drive 제품 설명서 이미지 공유 링크를 입력하세요.
      </p>

      <div style={{ marginTop: '2rem' }}>
        <label htmlFor="url-input" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Google Drive 이미지 링크
        </label>
        <input
          id="url-input"
          type="text"
          placeholder="https://drive.google.com/..."
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '1rem',
          }}
        />
      </div>

      <button
        style={{
          marginTop: '1.5rem',
          padding: '0.75rem 2rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '1rem',
          cursor: 'pointer',
        }}
      >
        QR 코드 생성
      </button>

      <p style={{ marginTop: '2rem', color: '#999', fontSize: '0.9rem' }}>
        ※ QR 생성 로직은 아직 구현되지 않았습니다.
      </p>
    </div>
  );
}
