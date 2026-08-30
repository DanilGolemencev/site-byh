/** @type {import('next').NextConfig} */

// GitHub Pages для проектного сайта (не user.github.io) отдаёт файлы из
// подпапки /<repo>/, поэтому все ссылки на статику нужно сдвинуть на этот
// префикс. Переменную задаёт workflow деплоя — при обычной сборке (свой
// хостинг, корень домена) она не установлена, префикс пустой.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;
