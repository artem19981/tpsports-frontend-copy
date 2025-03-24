const minHours = 0;
const maxHours = 23;
export const timeWheels = Array.from(
  { length: ((maxHours - minHours + 1) * 60) / 5 },
  (_, i) => {
    const minutes = i * 5;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return {
      label: `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`,
      value: `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`,
    };
  }
);

export const alcoholOptions = ['Регулярно', 'Нерегулярно', 'Не употребляю'];
