export default async function QRRedirectPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>QR 코드 접근</h1>
      <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
        Key: <strong>{key}</strong>
      </p>
      <p style={{ marginTop: '2rem', color: '#666' }}>
        ※ 리다이렉트 로직은 아직 구현되지 않았습니다.
      </p>
    </div>
  );
}
