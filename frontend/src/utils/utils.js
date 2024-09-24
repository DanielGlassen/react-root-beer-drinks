
export const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  
  export const loadDrinks = async (fetchDrinks, setDrinks, setLoading, setError, setSnackOpen) => {
    setLoading(true);
    try {
      const data = await fetchDrinks({ offset: 0, length: 10 });
      setDrinks(data.items);
    } catch (err) {
      setError('Failed to load drinks');
      setSnackOpen(true);
    } finally {
      setLoading(false);
    }
  };
  
  export const handleSearch = async (term, searchDrinks, loadDrinks, setDrinks, setLoading, setError, setSnackOpen) => {
    setLoading(true);
    try {
      if (term) {
        const data = await searchDrinks(term);
        setDrinks(data.items);
      } else {
        await loadDrinks();
      }
    } catch (err) {
      setError('Failed to search drinks');
      setSnackOpen(true);
    } finally {
      setLoading(false);
    }
  };
  