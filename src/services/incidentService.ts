import { Incident, SeverityLevel, ESGCategory, CategoryKey } from '@/types/incidents';

// 获取事件数据
export async function getIncidents(): Promise<{ incidents: Incident[] }> {
  try {
    const response = await fetch('/api/incidents');
    if (!response.ok) {
      throw new Error('Failed to fetch incidents data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching incidents:', error);
    // 如果API请求失败，可以从本地JSON文件加载
    const data = await import('@/data/incidents.json');

    // 转换数据以匹配 Incident 类型
    const transformedData = {
      incidents: data.default.incidents.map((incident: any) => ({
        ...incident,
        // 确保 category 是 CategoryKey 类型
        category: incident.category as CategoryKey,
        // 确保 severity 是 SeverityLevel 类型
        severity: incident.severity as SeverityLevel
      }))
    };

    return transformedData;
  }
}

// 获取严重程度级别数据
export async function getSeverityLevels(): Promise<{ severityLevels: SeverityLevel[] }> {
  try {
    const response = await fetch('/api/severity-levels');
    if (!response.ok) {
      throw new Error('Failed to fetch severity levels data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching severity levels:', error);
    // 如果API请求失败，可以从本地JSON文件加载
    const data = await import('@/data/severity-levels.json');

    // 转换数据以匹配 SeverityLevel 类型
    const transformedData = {
      severityLevels: data.default.severityLevels.map((level: any) => ({
        ...level,
        // 确保 id 是 SeverityLevel 类型
        id: level.id as SeverityLevel
      }))
    };

    return transformedData;
  }
}

// 获取ESG类别数据
export async function getESGCategories(): Promise<{ categories: ESGCategory[] }> {
  try {
    const response = await fetch('/api/esg-categories');
    if (!response.ok) {
      throw new Error('Failed to fetch ESG categories data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching ESG categories:', error);
    // 如果API请求失败，可以从本地JSON文件加载
    const data = await import('@/data/esg-categories.json');
    return data.default;
  }
}
