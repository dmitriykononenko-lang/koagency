import React from 'react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Info, ExternalLink } from 'lucide-react';

export function AmoCrmSetupGuide() {
  return (
    <Alert className="bg-blue-50 border-blue-200">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertTitle className="text-blue-900">Настройка интеграции с amoCRM</AlertTitle>
      <AlertDescription className="text-blue-700 text-sm space-y-2 mt-2">
        <div>
          <strong>Шаг 1:</strong> Создайте интеграцию в amoCRM
          <br />
          <span className="text-blue-600">Настройки → Интеграции → Создать интеграцию</span>
        </div>
        
        <div>
          <strong>Шаг 2:</strong> Заполните переменные окружения:
          <ul className="list-disc list-inside ml-2 mt-1 space-y-1">
            <li><code className="bg-blue-100 px-1 rounded">AMO_DOMAIN</code> - ваш поддомен (например: koagency.amocrm.ru)</li>
            <li><code className="bg-blue-100 px-1 rounded">AMO_ACCESS_TOKEN</code> - долгосрочный токен доступа</li>
          </ul>
        </div>

        <a 
          href="https://www.amocrm.ru/developers/content/oauth/step-by-step" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
        >
          Подробная инструкция
          <ExternalLink className="w-3 h-3" />
        </a>
      </AlertDescription>
    </Alert>
  );
}
