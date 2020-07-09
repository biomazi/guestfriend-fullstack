const useListBodyHandlers = (ref, onDrop) => {
  const handleDragEnter = () => {
    ref.current.style.border = '2px dashed black';
  };
  const handleDragLeave = () => {
    ref.current.style.border = 'none';
  };
  const handleDrop = e => {
    ref.current.style.border = 'none';
    onDrop(e);
  };

  return {
    handleDragEnter,
    handleDragLeave,
    handleDrop,
  };
};

export default useListBodyHandlers;
