/**
 * next/image с images.unoptimized (обязателен для статического экспорта)
 * не добавляет basePath к src — префикс приходится подставлять вручную.
 * Значение задаёт workflow деплоя через NEXT_PUBLIC_BASE_PATH; Next.js
 * инлайнит переменные с этим префиксом в клиентский бандл на этапе сборки.
 */
export function withBasePath(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
