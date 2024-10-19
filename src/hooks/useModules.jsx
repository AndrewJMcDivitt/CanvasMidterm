
import { useState, useEffect, useCallback } from 'react';

const useModules = () => {
  const [modules, setModules] = useState([]);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    // Load modules and pages from localStorage
    const storedModules = JSON.parse(localStorage.getItem('modules')) || [];
    const storedPages = JSON.parse(localStorage.getItem('pages')) || [];
    setModules(storedModules);
    setPages(storedPages);
  }, []);

  const saveModules = useCallback((updatedModules) => {
    setModules(updatedModules);
    localStorage.setItem('modules', JSON.stringify(updatedModules));
  }, []);

  const saveModule = useCallback((moduleData) => {
    const updatedModules = moduleData.id
      ? modules.map(m => m.id === moduleData.id ? moduleData : m)
      : [...modules, { ...moduleData, id: Date.now() }];
    saveModules(updatedModules);
  }, [modules, saveModules]);

  const deleteModule = useCallback((id) => {
    const updatedModules = modules.filter(m => m.id !== id);
    saveModules(updatedModules);
  }, [modules, saveModules]);

  const togglePublish = useCallback((id) => {
    const updatedModules = modules.map(m => 
      m.id === id ? { ...m, published: !m.published } : m
    );
    saveModules(updatedModules);
  }, [modules, saveModules]);

  const assignPageToModule = useCallback((moduleId, pageId) => {
    const updatedModules = modules.map(m => 
      m.id === moduleId 
        ? { ...m, pageIds: [...new Set([...m.pageIds, pageId])] } 
        : m
    );
    saveModules(updatedModules);
  }, [modules, saveModules]);

  const removePageFromModule = useCallback((moduleId, pageId) => {
    const updatedModules = modules.map(m => 
      m.id === moduleId 
        ? { ...m, pageIds: m.pageIds.filter(id => id !== pageId) } 
        : m
    );
    saveModules(updatedModules);
  }, [modules, saveModules]);

  return {
    modules,
    pages,
    saveModule,
    deleteModule,
    togglePublish,
    assignPageToModule,
    removePageFromModule,
    setPages
  };
};

export default useModules;