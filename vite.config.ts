import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    // 添加 Remix 插件，确保 future 配置符合需求
    remix({
      future: {
        v3_fetcherPersist: true, // 新版 fetcher 持久化支持
        v3_relativeSplatPath: true, // 支持相对路径 Splat
        v3_throwAbortReason: true, // 优化 fetch 请求中断时的错误处理
        v3_singleFetch: true, // 单一 fetch 支持，提高性能
        v3_lazyRouteDiscovery: true, // 路由懒加载支持
      },
    }),
    // 自动解析 tsconfig 路径
    tsconfigPaths(),
  ],
  // 添加开发服务器配置
  server: {
    port: 5173, // 设置默认端口
    open: true, // 启动后自动打开浏览器
    watch: {
      usePolling: true, // 解决某些系统的文件更新检测问题（如 Docker 内）
    },
  },
  resolve: {
    alias: {
      // 如果需要自定义别名，可以在这里添加
      "@": "/src", // 将 @ 映射到 src 目录
    },
  },
  build: {
    target: "esnext", // 指定目标环境
    sourcemap: true, // 生成 source map，便于调试
  },
});
