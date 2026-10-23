import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
    agentUpgrade: 'security',
  },
  reactCompiler: true,
};

export default nextConfig;
