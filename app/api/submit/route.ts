/**
 * Алиас /api/submit → /api/lead.
 * Нейтральное имя, чтобы AdBlock/uBlock/EasyPrivacy не блокировали endpoint
 * по слову "lead" в URL. Старый /api/lead сохранён для обратной совместимости.
 */
export { POST, runtime } from '../lead/route';
