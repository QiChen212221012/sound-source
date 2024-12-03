# 使用 Node.js 基础镜像
FROM node:18

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件
COPY . .

# 设置默认环境
ENV NODE_ENV=development

# 暴露端口
EXPOSE 5173

# 启动应用
CMD ["npm", "run", "dev"]
