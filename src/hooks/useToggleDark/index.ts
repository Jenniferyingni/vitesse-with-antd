import { useDark, useToggle } from '@vueuse/core';
import { loadDarkThemeCss } from 'vite-plugin-theme/es/client';

export function useToggleDark() {
  const isDark = useDark()
  const toggleDarkDefault = useToggle(isDark);
  
  const toggleAntd = async () => {
    if(isDark.value) {
      await loadDarkThemeCss();
      document.body.setAttribute('data-theme','dark')
    } else {
      document.body.setAttribute('data-theme','light')
    }
  }
  
  toggleAntd()
  
  const toggleDark = async () => {
    toggleDarkDefault();
    // 修改antd为暗黑模式
    toggleAntd()
  };

  
  return { isDark, toggleDark }
}