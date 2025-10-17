

export const getArrowHeadsCoordinates = (x1, y1, x2, y2, arrow_length) => {
  const slope = Math.atan2(y2 - y1 ,x2 - x1);
  const x3 = x2 - arrow_length * Math.cos(slope - Math.PI / 6);
  const y3 = y2 - arrow_length * Math.sin(slope - Math.PI / 6);
  const x4 = x2 - arrow_length * Math.cos(slope + Math.PI / 6);
  const y4 = y2 - arrow_length * Math.sin(slope + Math.PI / 6);

  return {
    x3,
    y3,
    x4,
    y4,
  };
};
