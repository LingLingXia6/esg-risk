import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 重定向到 dashboard 页面
    router.replace('/dashboard');
  }, [router]);

  return (
    <>
      <Head>
        <title>ESG Risk - 重定向中</title>
        <meta name="description" content="ESG风险评估系统" />
      </Head>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          color: '#666'
        }}
      >
        正在跳转到仪表盘...
      </div>
    </>
  );
}
