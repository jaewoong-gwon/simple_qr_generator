export const metadata = {
  title: 'Simple QR Generator',
  description: 'Google Drive 제품 설명서 이미지를 위한 QR 코드 생성 서비스',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
