/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildPath: "build/index.js",
  typescript: true,
  future: {
    v3_routeConvention: true, // 使用新路由规则
    v3_meta: true, // 使用新的 meta API
    unstable_dev: true, // 开启 Remix 开发模式增强功能
  },
};