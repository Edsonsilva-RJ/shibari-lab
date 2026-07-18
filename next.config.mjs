/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuração correta exigida pelo Next.js 16 para liberar o túnel do ngrok
  allowedDevOrigins: [
    'localhost:3000',
    '54.232.189.113:3000',
    'doctrine-graveness-aged.ngrok-free.dev'
  ]
};

export default nextConfig;