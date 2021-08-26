import { replaceStyleVariables } from 'vite-plugin-theme/es/client';

export function useToggleTheme(color: string) {
  const toggleTheme = async () => {
    await replaceStyleVariables({
      colorVariables: ['#007acc']
    })
  }

  return {
    toggleTheme
  }
}